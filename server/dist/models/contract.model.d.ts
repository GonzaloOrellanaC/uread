import { Contract } from '../interfaces/roles.interface';
import { Document } from 'mongoose';
declare const contractModel: import("mongoose").Model<Contract & Document<any, any, any>, {}, {}>;
export default contractModel;
