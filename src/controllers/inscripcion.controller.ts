import { User } from "@/interfaces/users.interface";
import alumnoProvisorioModel from "@/models/alumnos-provisorios.model";
import nivelesModel from "@/models/niveles.model";
import roleModel from "@/models/roles.model";
import userModel from "@/models/users.model";
import { logger } from "@/utils/logger";
import { Request, Response } from "express";

export const validarDatos = async (req: Request, res: Response) => {
    
}

export const postDatosFormulario = async (req: Request, res: Response) => {
    const data = req.body
    console.log(data)
    const {alumnos, apoderado} = data
    console.log(apoderado)

    if (apoderado.name && apoderado.lastName && apoderado.email) {
        try {
            const findRole = await roleModel.findOne({name: 'studentRepresentative'})
            apoderado.roles = [findRole._id]
            let apoderadoBD: any
            let exist: boolean = false
            let alumnosSave: any[] = []
            const findApoderado: User = await userModel.findOne({email: apoderado.email})
            if (findApoderado) {
                apoderadoBD = findApoderado
                exist = true
                alumnosSave = [...findApoderado.alumnos]
            } else {
                const newApoderado = await userModel.create(apoderado)
                apoderadoBD = newApoderado
            }

            const alumnosGuardados = await Promise.all(alumnos.map(async (alumno: any) => {
                const encontrarNivel = await nivelesModel.findOne({number: Number(alumno.year)})
                const newAlumno = {
                    ...alumno,
                    levelUser: encontrarNivel._id
                }
                const alumnoGuardado = await alumnoProvisorioModel.create(newAlumno)
                return alumnoGuardado._id
            }))

            const apoderadoDatos = await userModel.findByIdAndUpdate(apoderadoBD._id, {alumnos: [...alumnosSave, ...alumnosGuardados]}, {new: true}).populate('roles').populate('alumnos')
    
            res.status(200).json({msg: 'ok', apoderado: apoderadoDatos, exist})
        } catch ({name, message}) {
            console.log(name)
            console.log(message)
    
            let msg: string = ''

            if (message.includes('duplicate key error collection')) {
                msg = `Email ${apoderado.email} ya se encuentra en plataforma.`
            }
            logger.error(msg)
            res.status(400).json({msg})
        }
    }
}