import { ProjectAlert } from '../interfaces/project.interface';
import { Document } from 'mongoose';
declare const projectAlertModel: import("mongoose").Model<ProjectAlert & Document<any, any, any>, {}, {}>;
export default projectAlertModel;
