import { Router } from 'express'

/* import authMiddleware from '@/middlewares/auth.middleware' */
import surveysResponseController from '@/controllers/surveysResponse.controller'

const router = Router()

router.post(`/saveSurveyResponse`, /* authMiddleware, */ surveysResponseController.createSurveysResponse)
router.post(`/getSurveyResponseBySurveyId`, /* authMiddleware, */ surveysResponseController.getSurveyResponseBySurveyId)
router.post(`/getSurveyDataBySurveyId`, /* authMiddleware, */ surveysResponseController.getSurveyDataBySurveyId)

export default router
