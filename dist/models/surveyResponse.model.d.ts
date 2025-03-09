import { SurveyResponse } from '../interfaces/survey.interface';
import { Document } from 'mongoose';
declare const surveyResponseModel: import("mongoose").Model<SurveyResponse & Document<any, any, any>, {}, {}>;
export default surveyResponseModel;
