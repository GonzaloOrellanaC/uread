import { guardarClassroom, getClassrooms, leerClassroomsPorNivelPlan } from '@/controllers/classroom.controller'
import { Router } from 'express'

const router = Router()

router.post(`/guardar-classrooms`, guardarClassroom)
router.get(`/get-classrooms`, getClassrooms) 

router.get(`/leer-classrooms-por-nivel-plan`, leerClassroomsPorNivelPlan)

export default router
