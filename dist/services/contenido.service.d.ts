import { Contenido } from '../interfaces/contenido.interface';
import mongoose from 'mongoose';
declare const _default: {
    guardarContenido: (contenidoData: Contenido) => Promise<Contenido>;
    editarContenido: (contenidoData: Contenido) => Promise<Contenido>;
    borrarContenido: (_id: mongoose.Schema.Types.ObjectId) => Promise<Contenido>;
    leerContenidos: (idGrupos?: string[]) => Promise<any[]>;
    leerContenidosV2: () => Promise<Contenido[]>;
    leerContenidosBasicos: () => Promise<Contenido[]>;
    crearContenidoV2: (contenido: Contenido) => Promise<{
        state: boolean;
        contenido: Contenido & mongoose.Document<any, any, any>;
        error?: undefined;
    } | {
        state: boolean;
        error: any;
        contenido?: undefined;
    }>;
    editarContenidoV2: (contenido: Contenido) => Promise<{
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
