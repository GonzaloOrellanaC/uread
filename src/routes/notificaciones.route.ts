import { putNotification, getNotifications } from '@/controllers/notificaciones.controller'
import { Router } from 'express'

const router = Router()

router.put(`/`, putNotification)
router.get(`/getNotifications`, getNotifications)


export default router