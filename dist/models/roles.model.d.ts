import { Role } from '../interfaces/roles.interface';
import { Document } from 'mongoose';
declare const roleModel: import("mongoose").Model<Role & Document<any, any, any>, {}, {}>;
export default roleModel;
