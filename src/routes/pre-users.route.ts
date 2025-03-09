import { Router } from 'express'
import authMiddleware from '@/middlewares/auth.middleware'
import excelToJsonService from '@/services/excelToJson.service'

const router = Router()

router.post(`/loadPreUserExcel`, excelToJsonService.loadPreUserExcel)
router.get(`/getPreUsers`, excelToJsonService.getPreUsers)
router.post(`/findPreUserByRun`, excelToJsonService.findPreUserByRun)

export default router

