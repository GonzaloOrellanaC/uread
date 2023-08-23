import { Question } from '../interfaces/survey.interface';
import { Document } from 'mongoose';
declare const questionModel: import("mongoose").Model<Question & Document<any, any, any>, {}, {}>;
export default questionModel;
