/// <reference types="mongoose" />
import { Contenido } from '../interfaces/contenido.interface';
declare const _default: {
    guardarContenido: (contenidoData: Contenido) => Promise<Contenido>;
    editarContenido: (contenidoData: Contenido) => Promise<Contenido>;
    borrarContenido: (_id: import("mongoose").Schema.Types.ObjectId) => Promise<Contenido>;
    leerContenidos: () => Promise<Contenido[]>;
    leerContenidosBasicos: () => Promise<Contenido[]>;
};
export default _default;
