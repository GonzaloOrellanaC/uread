import { Project } from '../interfaces/project.interface';
import { Document } from 'mongoose';
declare const projectModel: import("mongoose").Model<Project & Document<any, any, any>, {}, {}>;
export default projectModel;
