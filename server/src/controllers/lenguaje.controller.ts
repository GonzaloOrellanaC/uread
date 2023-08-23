import lenguajeService from '@/services/lenguaje.service'
import { NextFunction, Request, Response } from 'express'

const leerContenidos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lenguajes: any[] = await lenguajeService.leerContenidos()
        res.status(200).json({ data: lenguajes, message: 'lista de lenguajes' })
    } catch (error) {
        next(error)
    }
}

export default {
    leerContenidos
}