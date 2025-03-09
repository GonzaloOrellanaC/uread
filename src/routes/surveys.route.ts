import { Router } from 'express'

/* import authMiddleware from '@/middlewares/auth.middleware' */
import surveysController from '@/controllers/surveys.controller'

const router = Router()

router.post(`/createSurvey`, /* authMiddleware, */ surveysController.createSurvey)
router.post(`/editSurvey`, /* authMiddleware, */ surveysController.editSurvey)
router.get(`/getSurveys`, /* authMiddleware, */ surveysController.getSurveys)
router.post(`/getSurveysByAdmins`, /* authMiddleware, */ surveysController.getSurveysByAdmins)
router.post(`/getSurveyById`, /* authMiddleware, */ surveysController.getSurveyById)
router.post(`/getSurveyByOrganizationId`, /* authMiddleware, */ surveysController.getSurveyByOrganizationId)

export default router
