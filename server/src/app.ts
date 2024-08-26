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

process.env.SUPPRESS_NO_CONFIG_WARNING = 'true'
const app: express.Application = express()
const port: number = config.env.port
const env: string = config.env.environment
const locale: string = config.env.locale

const connectToDatabase = () => {
    if (env !== 'production') {
        set('debug', true)
    }

    connect(dbConnection.url, dbConnection.options, async () => {
        try{
            await AccessControlServices.initAccessControl()
        } catch (err) {
            console.log(err)
        }
    }) 
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
    app.use(express.static(path.resolve(__dirname, "../../client/build")))
    app.get('/*', (req: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname, "../../client/build", "index.html"))
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
            logger.info(`=================================`)
            logger.info(`======= ENV: ${env} =======`)
            logger.info(`🚀 App listening on the port ${port}`)
            logger.info(`=================================`)
        })
        SocketController(server)
    } catch (error) {
       console.log(error) 
    }
}

export default App
