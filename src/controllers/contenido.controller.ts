import { NextFunction, Request, Response } from 'express'
import contenidoService from '@/services/contenido.service'
import { Contenido } from '@/interfaces/contenido.interface'
import contenidoModel from '@/models/contenido.model'

const guardarContenido = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    try {
        const contenido: Contenido = await contenidoService.guardarContenido(req.body)
        res.status(200).json({ data: contenido, message: 'contenido creado' })
    } catch (error) {
        next(error)
    }
}

const crearContenidoV2 = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    try {
        const response = await contenidoService.crearContenidoV2(req.body as Contenido)
        res.status(200).json({ data: response.contenido, message: 'contenido v2 creado' })
    } catch (error) {
        next(error)
    }
}

const editarContenidoV2 = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    try {
        const response = await contenidoService.editarContenidoV2(req.body as Contenido)
        res.status(200).json({ data: response.contenido, message: 'contenido v2 creado' })
    } catch (error) {
        next(error)
    }
}

const editarContenido = async (req: Request, res: Response, next: NextFunction) => {
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
    const {idGrupos} = req.body
    console.log(idGrupos)
    try {
        const contenidos: Contenido[] = await contenidoService.leerContenidos(idGrupos)
        res.status(200).json({ data: contenidos, message: 'lista de contenidos' })
    } catch (error) {
        next(error)
    }
}

const getTodoContenido = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contenidos: Contenido[] = await contenidoService.leerContenidos()
        res.status(200).json({ data: contenidos, message: 'lista de contenidos' })
    } catch (error) {
        next(error)
    }
}

const leerContenidosV2 = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contenidos: Contenido[] = await contenidoService.leerContenidosV2()
        res.status(200).json({ data: contenidos, message: 'lista de contenidos v2' })
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

const buscarContenidoPorId = async (_id: string) => {
    const contenido = await contenidoModel.findById(_id)
    return contenido
}

export default {
    guardarContenido,
    crearContenidoV2,
    editarContenidoV2,
    editarContenido,
    borrarContenido,
    leerContenidos,
    getTodoContenido,
    leerContenidosV2,
    leerContenidosBasicos,
    buscarContenidoPorId
}