/// <reference types="mongoose" />
import { Contenido } from '../interfaces/contenido.interface';
declare const _default: {
    guardarContenido: (contenidoData: Contenido) => Promise<Contenido>;
    editarContenido: (contenidoData: Contenido) => Promise<Contenido>;
    borrarContenido: (_id: import("mongoose").Schema.Types.ObjectId) => Promise<Contenido>;
    leerContenidos: () => Promise<Contenido[]>;
    leerContenidosV2: () => Promise<Contenido[]>;
    leerContenidosBasicos: () => Promise<Contenido[]>;
    crearContenidoV2: (contenido: Contenido) => Promise<{
        state: boolean;
        contenido: Contenido & import("mongoose").Document<any, any, any>;
        error?: undefined;
    } | {
        state: boolean;
        error: any;
        contenido?: undefined;
    }>;
    editarContenidoV2: (contenido: Contenido) => Promise<{
        state: boolean;
        contenido: Contenido & import("mongoose").Document<any, any, any>;
        error?: undefined;
    } | {
        state: boolean;
        error: any;
        contenido?: undefined;
    }>;
};
export default _default;
