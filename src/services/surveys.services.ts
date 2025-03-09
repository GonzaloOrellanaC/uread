import { env } from '@/configs'
import { Organization } from '@/interfaces/roles.interface'
import { Survey } from '@/interfaces/survey.interface'
import surveyModel from '@/models/survey.model'
import { HttpException } from '@exceptions/HttpException'
import { User } from '@interfaces/users.interface'
import { isEmpty } from '@utils/util'
import bcrypt from 'bcrypt'
import { __ } from 'i18n'
import { ObjectId } from 'mongoose'

const surveys = surveyModel

const createSurvey = async (srv: Survey) => {
    const surveysTotal = await surveys.find()
    srv.idSurvey = surveysTotal.length + 1
    try {
        const survey = await surveys.create(srv)
        return survey
    } catch (error) {
        
    }
}

const editSurvey = async (srv: Survey) => {
    try {
        const survey = await surveys.findByIdAndUpdate(srv._id, srv)
        return survey
    } catch (error) {
        
    }
}

const getSurveys = async () => {
    try {
        const survey = await surveys.find().populate('users').populate('organization').populate('createdBy').populate('updatedBy')
        return survey
    } catch (error) {
        
    }
}

const getSurveysByAdmins = async (organizationId:ObjectId) => {
    console.log('Desde un admin por organización')
    try {
        const survey = await surveys.find({organization: { $in: [ {_id: organizationId} as Organization ] }}).populate('users').populate('organization').populate('createdBy').populate('updatedBy')
        return survey
    } catch (error) {
        
    }
}

const getSurveyById = async (_id: ObjectId) => {
    try {
        const survey = await surveys.findById({_id: _id}).populate('users')/* .populate('organization') */.populate('createdBy').populate('updatedBy')
        return survey
    } catch (error) {
        
    }
}

const getSurveyByOrganizationId = async (_id: ObjectId) => {
    try {
        const survey = await surveys.find({organization: {$all: [_id]}}).populate('users')
        return survey
    } catch (error) {
        
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