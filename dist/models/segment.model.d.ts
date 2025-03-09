import { Segment } from '../interfaces/project.interface';
import { Document } from 'mongoose';
declare const segmentModel: import("mongoose").Model<Segment & Document<any, any, any>, {}, {}>;
export default segmentModel;
