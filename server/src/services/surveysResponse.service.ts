import { env } from '@/configs'
import { Survey, SurveyResponse } from '@/interfaces/survey.interface'
import surveyResponseModel from '@/models/surveyResponse.model'
import { HttpException } from '@exceptions/HttpException'
import { User } from '@interfaces/users.interface'
import { isEmpty } from '@utils/util'
import bcrypt from 'bcrypt'
import { __ } from 'i18n'
import { ObjectId } from 'mongoose'

const surveysResponse = surveyResponseModel

const createSurveyResponse = async (srvResponse: SurveyResponse) => {
    try {
        const surveyResponse = await surveysResponse.create(srvResponse)
        return surveyResponse
    } catch (error) {
        
    }
}

const getSurveyResponseBySurveyId = async (_id: ObjectId, userId: ObjectId) => {
    console.log(_id, userId)
    try {
        const surveyResponse = await surveysResponse.findOne({survey: _id, createdBy: userId})
        return surveyResponse
    } catch (error) {
        
    }
}

const getSurveyDataBySurveyId = async (_id: ObjectId) => {
    try {
        const surveyResponse = await surveysResponse.find({survey: _id})
        return surveyResponse
    } catch (error) {
        
    }
}

export default {
    createSurveyResponse,
    getSurveyResponseBySurveyId,
    getSurveyDataBySurveyId
}
