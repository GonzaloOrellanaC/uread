import { Document, ObjectId } from 'mongoose';
declare const nivelesModel: import("mongoose").Model<{
    _id: ObjectId;
    name: string;
    number: number;
} & Document<any, any, any>, {}, {}>;
export default nivelesModel;
