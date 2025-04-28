import { editAlumnoPago, getAlumnoFechaPago } from '@/controllers/alumnoFechaPago.controller'
import { Router } from 'express'

const router = Router()

router.get(`/getFechaPagos`, getAlumnoFechaPago)
router.post(`/editAlumnoPago`, editAlumnoPago)

export default router