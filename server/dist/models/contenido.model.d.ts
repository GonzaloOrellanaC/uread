import { Contenido } from '../interfaces/contenido.interface';
import { Document } from 'mongoose';
declare const contenidoModel: import("mongoose").Model<Contenido & Document<any, any, any>, {}, {}>;
export default contenidoModel;
