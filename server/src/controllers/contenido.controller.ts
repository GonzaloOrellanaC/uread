import { NextFunction, Request, Response } from 'express'
import contenidoService from '@/services/contenido.service'
import { Contenido } from '@/interfaces/contenido.interface'

const guardarContenido = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    try {
        const contenido: Contenido = await contenidoService.guardarContenido(req.body)
        res.status(200).json({ data: contenido, message: 'contenido creado' })
    } catch (error) {
        next(error)
    }
}

const editarContenido = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    try {
        const contenido: Contenido = await contenidoService.editarContenido(req.body)
        res.status(200).json({ data: contenido, message: 'contenido editado' })
    } catch (error) {
        next(error)
    }
}

const borrarContenido = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    try {
        await contenidoService.borrarContenido(req.body._id)
        res.status(200).json({ message: 'contenido borrado' })
    } catch (error) {
        next(error)
    }
}

const leerContenidos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contenidos: Contenido[] = await contenidoService.leerContenidos()
        res.status(200).json({ data: contenidos, message: 'lista de contenidos' })
    } catch (error) {
        next(error)
    }
}

const leerContenidosBasicos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contenidos: Contenido[] = await contenidoService.leerContenidosBasicos()
        res.status(200).json({ data: contenidos, message: 'lista de contenidos' })
    } catch (error) {
        next(error)
    }
}

export default {
    guardarContenido,
    editarContenido,
    borrarContenido,
    leerContenidos,
    leerContenidosBasicos
}