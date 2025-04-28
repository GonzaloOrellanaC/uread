import { actualizarPago, pagosAlumno } from "@/services/alumnoFechaPago.service";
import { Request, Response } from "express";

export const getAlumnoFechaPago = async (req: Request, res: Response) => {
    const {alumnoId} = req.query
    const pagos = await pagosAlumno(alumnoId as string)
    res.status(200).json({pagos})
}

export const editAlumnoPago = async (req: Request, res: Response) => {
    const data = req.body
    const pagoEditado = await actualizarPago(data.pagosId, new Date(data.fechaValidacion))
    console.log(pagoEditado)
    res.status(200).json({pagoEditado})
}