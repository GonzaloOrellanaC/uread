import { User } from "@/interfaces/users.interface";
import alumnoProvisorioModel from "@/models/alumnos-provisorios.model";
import nivelesModel from "@/models/niveles.model";
import { Request, Response } from "express";

export const validarDatos = async (req: Request, res: Response) => {
    
}

export const postDatosFormulario = async (req: Request, res: Response) => {
    const data = req.body
    const {alumnos} = data
    try {
        const alumnosGuardados = await Promise.all(alumnos.map(async (alumno: any) => {
            const encontrarNivel = await nivelesModel.findOne({number: Number(alumno.year)})
            const newAlumno = {
                ...alumno,
                levelUser: encontrarNivel._id
            }
            const alumnoGuardado = await alumnoProvisorioModel.create(newAlumno)
            return alumnoGuardado
        }))

        res.status(200).json({msg: 'ok', alumnosGuardados})
    } catch ({name, message}) {
        console.log(name)
        console.log(message)

        res.status(400).json({msg: `${name}: ${message}`})
    }
}