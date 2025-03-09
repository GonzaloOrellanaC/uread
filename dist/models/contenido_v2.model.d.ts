import { Contenido } from '../interfaces/contenido.interface';
import { Document } from 'mongoose';
declare const contenidoV2Model: import("mongoose").Model<Contenido & Document<any, any, any>, {}, {}>;
export default contenidoV2Model;
