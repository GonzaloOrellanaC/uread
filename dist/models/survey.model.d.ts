import { Survey } from '../interfaces/survey.interface';
import { Document } from 'mongoose';
declare const surveyModel: import("mongoose").Model<Survey & Document<any, any, any>, {}, {}>;
export default surveyModel;
