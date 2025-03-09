import { Document } from 'mongoose';
import { PreUser } from '../interfaces/pre-users.interface';
declare const preUserModel: import("mongoose").Model<PreUser & Document<any, any, any>, {}, {}>;
export default preUserModel;
