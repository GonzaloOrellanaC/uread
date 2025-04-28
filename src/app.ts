import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import config from './configs'
import express from 'express'
import helmet from 'helmet'
import hpp from 'hpp'
import morgan from 'morgan'
import { connect, set } from 'mongoose'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { dbConnection } from '@databases'
import errorMiddleware from '@middlewares/error.middleware'
import { logger, stream } from '@utils/logger'
import i18n from 'i18n'
import path from 'path'
import { Request, Response } from 'express'
import multer from 'multer'
import router from './routes/index.route'
import AccessControlServices from '@services/accessControl.service'
import SocketController from './controllers/socket.controller'
import { checkEmails } from './services/imap.service'
import { imap_email, imap_host, imap_password } from './configs/imap'

import { CronJob } from 'cron';
import usersService from './services/users.service'
import { crearNotificacion, leerUltimaNotificacionPagoPendiente } from './services/notificaciones.service'
import { dateTranslate } from './utils/date'

const unDia = (60000 * 60) * 24

const iniciaJob = () => {
    const job = new CronJob(
        '*/5 * * * *',
        function () {
            checkEmails(
                {
                    user: imap_email,
                    password: imap_password,
                    host: imap_host,
                    port: 993,
                    tls: true
                }
            )
        },
        () => {
            console.log('Terminado')
        }
    );
    return job
}

const revisionPayment = async () => {
    const alumnos = await usersService.findAllStudents()
    const currentDate = new Date().getTime()
    const proximos5Dias = new Date(currentDate + (unDia * 5)).getTime()
    const alumnosPorPagar: any[] = []

    console.log(alumnos.length)
    alumnos.forEach((alumno) => {
        console.log(alumno.name, alumno.lastName)
        if (alumno.alumnoFechaPago !== null) {
            const fechaPago = new Date(alumno.alumnoFechaPago.fechasPago[alumno.alumnoFechaPago.fechasPago.length - 1]).getTime()
            if ((currentDate + proximos5Dias) > fechaPago) {
                alumnosPorPagar.push(alumno)
            }
        }
    })

    alumnosPorPagar.forEach(async (alumno, index) => {
        const currentDate = new Date(alumno.alumnoFechaPago.fechasPago[alumno.alumnoFechaPago.fechasPago.length - 1]).getTime()
        const quinceDias = unDia * 15
        if (alumno.apoderado) {
            
            const newNotificationApoderado = {
                title: `Recordatorio próximo pago`,
                detail: `La cuenta de alumno ${alumno.name} ${alumno.lastName} está por vencer.`,
                longText: `Hola ${alumno.apoderado.name} ${alumno.apoderado.lastName}. Saludos desde UREAD. Informamos que el la cuenta de ${alumno.name} vence el próximo ${dateTranslate(new Date(currentDate + quinceDias), 'Nombre Día, Fecha ["Día" de "Mes"]')}. Pague con transferencia electrónica bancaria, envíe su comprobante  a recepcion.pagos@uread.cl o Pague con transbank en el siguiente link`,
                links: ['https://www.webpay.cl/form-pay/192335'],
                user: alumno.apoderado,
                idType: 'recordatorio_pago',
                metadata: {
                    alumno: alumno._id
                }
            }
            
            try {
                const ultimaNotificacion: any = await leerUltimaNotificacionPagoPendiente(alumno.apoderado._id, alumno._id)
                if (ultimaNotificacion !== null) {
                    const cincoDias = unDia * 5
                    const dosDias = unDia * 2
                    const fechaUltimaNotificacion = new Date(ultimaNotificacion.createdAt).getTime()
                    if (fechaUltimaNotificacion + cincoDias < Date.now()) {
                        /* console.log(newNotificationApoderado) */
                        const notificacion = await crearNotificacion(newNotificationApoderado)
                        console.log(notificacion)
                    } else {
                        console.log('No han pasado más de 5 días desde última notificación.')
                    }
                } else {
                    const notificacion = await crearNotificacion(newNotificationApoderado)
                    console.log(notificacion)
                }
            } catch ({name, message}) {
                console.log(name, message)
            }
        } else {
            console.log(`Alumno name: "${alumno.name}", lastName: "${alumno.lastName}" no tiene apoderado.`)
            
        }
    })
}

const jobsPayment = () => {
    const job = new CronJob(
        '00 12 * * *',
        () => {
            revisionPayment()
        },
        () => {
            console.log('Terminado')
        }
    );
    return job
}


process.env.SUPPRESS_NO_CONFIG_WARNING = 'true'
const app: express.Application = express()
const port: number = config.env.port
const env: string = config.env.environment
const locale: string = config.env.locale

const connectToDatabase = async () => {
    if (env !== 'production') {
        set('debug', false)
    }
    try {
        await connect(dbConnection.url)
        await AccessControlServices.initAccessControl()
        checkEmails(
            {
                user: imap_email,
                password: imap_password,
                host: imap_host,
                port: 993,
                tls: true
            }
        )
        iniciaJob().start()
        jobsPayment().start()
        revisionPayment()
        

        
    } catch (error) {
        console.log(error)
    }
}

const initializeMiddlewares = () => {
    if (env === 'development') {
        app.use(morgan(config.log.format, { stream }))
    }
    console.log(1)
    app.use(cors({ origin: config.cors.origin, credentials: config.cors.credentials }))
    app.use(hpp())
    app.use(compression())
    app.use(multer().any())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())
    console.log(2)
    configureI18n()
    app.use(i18n.init)
    initializeRoutes()
    console.log(3)
    app.use("/audios", express.static(path.join(__dirname, '../files/audios')))
    app.use("/mp3", express.static(path.join(__dirname, '../files/audios/mp3')))
    app.use("/images", express.static(path.join(__dirname, '../files/images')))
    app.use("/pdf", express.static(path.join(__dirname, '../files/pdf')))
    app.use(express.static(path.resolve(__dirname, "../uread/dist")))
    app.get('/*', (req: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname, "../uread/dist", "index.html"))
    })
    app.use(helmet())
}

const initializeRoutes = () => {
    app.use('/', router)
}

const initializeSwagger = () => {
    const options = {
        swaggerDefinition: {
            info: {
                title: 'REST API',
                version: '1.0.0',
                description: 'Example docs'
            }
        },
        apis: ['swagger.yaml']
    }

    const specs = swaggerJSDoc(options)
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
}

const initializeErrorHandling = () => {
    app.use(errorMiddleware)
}

const configureI18n = () => {
    i18n.configure({
        directory: __dirname + '/locales',
        defaultLocale: locale,
        queryParameter: 'language',
        cookie: 'language',
        register: global
    })
}

const App = () => {
    try {
        connectToDatabase()
        initializeMiddlewares()
        initializeSwagger()
        initializeErrorHandling()
        const server = app.listen(port, () => {
            logger.info(`====================================`)
            logger.info(`============ ENV: ${env} ===========`)
            logger.info(`🚀 App listening on the port ${port}`)
            logger.info(`====================================`)
        })
        SocketController(server)
    } catch (error) {
       console.log(error) 
    }
}

export default App
