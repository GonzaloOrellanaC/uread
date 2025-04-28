"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const contenido_model_1 = tslib_1.__importDefault(require("../models/contenido.model"));
const contenido_v2_model_1 = tslib_1.__importDefault(require("../models/contenido_v2.model"));
const niveles_model_1 = tslib_1.__importDefault(require("../models/niveles.model"));
const ia_service_1 = require("./ia.service");
/* import { TranslationServiceClient } from '@google-cloud/translate' */
const contenido = contenido_model_1.default;
const contenidoV2 = contenido_v2_model_1.default;
const niveles = niveles_model_1.default;
const guardarContenido = async (contenidoData) => {
    const contenidoResponse = await contenido.create(contenidoData);
    return contenidoResponse;
};
const editarContenido = async (contenidoData) => {
    console.log(contenidoData);
    const contenidoResponse = await contenido.findByIdAndUpdate(contenidoData._id, contenidoData, { new: true });
    return contenidoResponse;
    /* return contenidoData */
};
const borrarContenido = async (_id) => {
    const contenidoResponse = await contenido.findByIdAndDelete(_id);
    return contenidoResponse;
};
const leerContenidos = async (idGrupos) => {
    if (idGrupos) {
        return new Promise(async (resolve) => {
            const lista = [];
            const resultados = await Promise.all(idGrupos.map(async (id) => {
                const elementos = await contenido.find({ nivel: id, state: true }).populate('nivel');
                /* return await Promise.all(elementos.map(async e => {
                    e.nivelData = await nivelesModel.findById(e.nivel)
                    return e
                })) */
                return elementos;
            }));
            organizarContenidos(lista, resultados, 0, (filtrados) => {
                resolve(filtrados);
            });
        });
    }
    else {
        const elementos = await contenido.find().populate('nivel');
        /* return await Promise.all(elementos.map(async (e: any) => {
            e.nivelData = await nivelesModel.findById(e.nivel)
            return e
        })) */
        return elementos;
    }
};
const organizarContenidos = (lista, contenidos, index, callback) => {
    if (!contenidos[index]) {
        const filtered = Array.from(new Set(lista.map(a => a._id)))
            .map(_id => {
            return lista.find(a => a._id === _id);
        });
        callback(filtered);
    }
    else {
        const contenido = contenidos[index];
        contenido.forEach((c, n) => {
            lista.push(c);
            if (n === contenido.length - 1) {
                organizarContenidos(lista, contenidos, index + 1, callback);
            }
        });
    }
};
const leerContenidosV2 = async () => {
    const contenidoResponse = await contenidoV2.find();
    return contenidoResponse;
};
const leerContenidosBasicos = async () => {
    const resNiveles = await niveles.find();
    const contenidoBasicoResponse = await contenido.find({ nivel: resNiveles[0]._id }).populate('nivel');
    return contenidoBasicoResponse;
};
const crearContenidoV2 = async (contenido) => {
    try {
        const audioEs = await (0, ia_service_1.createAudio)(contenido.lenguajes[0].contenido, Date.now(), 'nova');
        const audioEsUrl = audioEs.url;
        const transcriptionEs = await (0, ia_service_1.transcript)(audioEs.fileName);
        const translation = await (0, ia_service_1.translateText)(contenido.lenguajes[0].contenido, 'inglés');
        contenido.lenguajes[0].transcripcion = transcriptionEs;
        const audioEn = await (0, ia_service_1.createAudio)(translation.choices[0].message.content, Date.now(), 'nova');
        const audioEnUrl = audioEn.url;
        const transcriptionEn = await (0, ia_service_1.transcript)(audioEn.fileName);
        contenido.lenguajes[1].transcripcion = transcriptionEn;
        contenido.lenguajes[1].contenido = translation.choices[0].message.content;
        const newContent = Object.assign(Object.assign({}, contenido), { audioEnUrl,
            audioEsUrl });
        const response = await contenidoV2.create(newContent);
        return ({ state: true, contenido: response });
    }
    catch (error) {
        return ({ state: false, error });
    }
};
const editarContenidoV2 = async (contenido) => {
    try {
        const newContent = Object.assign({}, contenido);
        const response = await contenidoV2.findByIdAndUpdate(newContent._id, newContent);
        return ({ state: true, contenido: response });
    }
    catch (error) {
        return ({ state: false, error });
    }
};
exports.default = {
    guardarContenido,
    editarContenido,
    borrarContenido,
    leerContenidos,
    leerContenidosV2,
    leerContenidosBasicos,
    crearContenidoV2,
    editarContenidoV2
};
//# sourceMappingURL=contenido.service.js.map