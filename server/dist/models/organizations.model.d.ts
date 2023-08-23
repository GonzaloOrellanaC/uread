import { Organization } from '../interfaces/roles.interface';
import { Document } from 'mongoose';
declare const organizationModel: import("mongoose").Model<Organization & Document<any, any, any>, {}, {}>;
export default organizationModel;
