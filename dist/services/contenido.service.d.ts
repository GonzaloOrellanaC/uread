import { Contenido } from '../interfaces/contenido.interface';
import mongoose from 'mongoose';
declare const _default: {
    guardarContenido: (contenidoData: any) => Promise<any>;
    editarContenido: (contenidoData: any) => Promise<any>;
    borrarContenido: (_id: mongoose.Schema.Types.ObjectId) => Promise<any>;
    leerContenidos: (idGrupos?: string[]) => Promise<any[]>;
    leerContenidosV2: () => Promise<any[]>;
    leerContenidosBasicos: () => Promise<any[]>;
    crearContenidoV2: (contenido: any) => Promise<{
        state: boolean;
        contenido: Contenido & mongoose.Document<any, any, any>;
        error?: undefined;
    } | {
        state: boolean;
        error: any;
        contenido?: undefined;
    }>;
    editarContenidoV2: (contenido: any) => Promise<{
        state: boolean;
        contenido: Contenido & mongoose.Document<any, any, any>;
        error?: undefined;
    } | {
        state: boolean;
        error: any;
        contenido?: undefined;
    }>;
};
export default _default;
