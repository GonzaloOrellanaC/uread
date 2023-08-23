import { ListaLenguajes } from '../interfaces/contenido.interface';
import { Document } from 'mongoose';
declare const lenguajeModel: import("mongoose").Model<ListaLenguajes & Document<any, any, any>, {}, {}>;
export default lenguajeModel;
