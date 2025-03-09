import { createMeeting, getMeetings } from '@/controllers/calendar.controller'
import { Router } from 'express'

const router = Router()

router.post(`/createMeeting`, createMeeting)
router.get(`/getMeetings`, getMeetings)


export default router