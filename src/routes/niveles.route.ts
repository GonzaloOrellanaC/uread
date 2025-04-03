import gruposNivelesModel from "@/models/gruposNiveles.model"
import nivelesModel from "@/models/niveles.model"
import { Router } from "express"
import { NextFunction, Request, Response } from 'express'
import { ObjectId } from "mongoose"

const niveles = nivelesModel

const router = Router()

interface Level {
    _id: ObjectId
    name: string
    number: number
}

router.get(`/leerNiveles`, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const nivelesToSend: Level[] = await niveles.find()
        res.status(200).json({ data: nivelesToSend, message: 'lista de niveles' })
    } catch (error) {
        console.log(error)
        res.status(400).json({data: error})
    }
})

router.get('/gruposNiveles', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gruposNiveles = await gruposNivelesModel.find().populate('cursos')
        console.log(gruposNiveles)
        res.status(200).json({ gruposNiveles, message: 'lista de niveles' })
    } catch (error) {
        console.log(error)
        res.status(400).json({data: error})
    }
})

export default router