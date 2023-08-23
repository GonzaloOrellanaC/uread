import { NextFunction, Request, Response } from 'express'
import { RequestWithUser } from "@/interfaces/auth.interface"
import { Survey } from '@/interfaces/survey.interface'
import surveysServices from '@/services/surveys.services'

const createSurvey = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    console.log(req.body)
    try {
        const survey: Survey = await surveysServices.createSurvey(req.body)
        res.status(200).json({ data: survey, message: 'survey created' })
    } catch (error) {
        next(error)
    }
}

const editSurvey = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    console.log(req.body)
    try {
        const survey: Survey = await surveysServices.editSurvey(req.body)
        res.status(200).json({ data: survey, message: 'survey edited' })
    } catch (error) {
        next(error)
    }
}

const getSurveys = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const surveys: Survey[] = await surveysServices.getSurveys()
        res.status(200).json({ data: surveys, message: 'surveys list' })
    } catch (error) {
        next(error)
    }
}

const getSurveysByAdmins = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const {organizationId} = req.body
    try {
        const surveys: Survey[] = await surveysServices.getSurveysByAdmins(organizationId)
        res.status(200).json({ data: surveys, message: 'surveys list' })
    } catch (error) {
        next(error)
    }
}

const getSurveyById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const {_id} = req.body
    try {
        const survey: Survey = await surveysServices.getSurveyById(_id)
        res.status(200).json({ data: survey, message: 'survey founded' })
    } catch (error) {
        next(error)
    }
}

const getSurveyByOrganizationId = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const {_id} = req.body
    try {
        const surveys: Survey[] = await surveysServices.getSurveyByOrganizationId(_id)
        res.status(200).json({ data: surveys, message: 'surveys founded' })
    } catch (error) {
        next(error)
    }
}

export default {
    createSurvey,
    editSurvey,
    getSurveys,
    getSurveysByAdmins,
    getSurveyById,
    getSurveyByOrganizationId
}