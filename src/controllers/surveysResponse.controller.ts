import { NextFunction, Request, Response } from 'express'
import { SurveyResponse } from '@/interfaces/survey.interface'
import surveysResponseService from '@/services/surveysResponse.service'

const createSurveysResponse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const surveyResponse: SurveyResponse = req.body.data
        const createSurveyResponse: SurveyResponse = await surveysResponseService.createSurveyResponse(surveyResponse)
        res.status(201).json({ data: createSurveyResponse, state: true, message: 'created' })
    } catch (error) {
        next(error)
    }
}

const getSurveyResponseBySurveyId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {_id, userId} = req.body
        const surveyResponse: SurveyResponse = await surveysResponseService.getSurveyResponseBySurveyId(_id, userId)
        if (surveyResponse) {
            res.status(201).json({ data: surveyResponse, state: true, message: 'found' })
        } else {
            res.status(201).json({ data: surveyResponse, state: false, message: 'found' })
        }
    } catch (error) {
        next(error)
    }
}

const getSurveyDataBySurveyId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {_id} = req.body
        const surveyResponse: SurveyResponse[] = await surveysResponseService.getSurveyDataBySurveyId(_id)
        if (surveyResponse) {
            res.status(201).json({ data: surveyResponse, state: true, message: 'found' })
        } else {
            res.status(201).json({ data: surveyResponse, state: false, message: 'found' })
        }
    } catch (error) {
        next(error)
    }
}


export default {
    createSurveysResponse,
    getSurveyResponseBySurveyId,
    getSurveyDataBySurveyId
}

