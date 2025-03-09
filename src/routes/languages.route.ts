import lenguajesController from '@controllers/lenguaje.controller'
import { Router } from "express"

const router = Router()

router.get(`/leerLenguajes`, lenguajesController.leerContenidos)

export default router