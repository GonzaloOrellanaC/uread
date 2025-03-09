"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editContent = exports.createNewContent = void 0;
const tslib_1 = require("tslib");
const ia_service_1 = require("../services/ia.service");
const contenido_controller_1 = (0, tslib_1.__importDefault)(require("./contenido.controller"));
const contenido_model_1 = (0, tslib_1.__importDefault)(require("../models/contenido.model"));
const createNewContent = async (req, res) => {
    const { title, description } = req.body;
    try {
        const response = await contenido_model_1.default.create({
            nombreTexto: title,
            descripcion: description
        });
        res.status(200).json({ state: true, contenido: response });
    }
    catch (error) {
        res.status(400).json({ state: false, error });
    }
};
exports.createNewContent = createNewContent;
const editContent = async (req, res) => {
    const { idContent, content, nameVoice, language } = req.body;
    const contentFound = await contenido_controller_1.default.buscarContenidoPorId(idContent);
    const contenidoCache = Object.assign({}, contentFound);
    try {
        const id = Date.now();
        const audio = await (0, ia_service_1.createAudio)(content, id, nameVoice);
        if (audio.state) {
            const transcription = await (0, ia_service_1.transcript)(audio.fileName);
            const filterLenguaje = contenidoCache.lenguajes.filter(leng => (leng.lenguaje === language));
            if (filterLenguaje.length > 0) {
                contenidoCache.lenguajes[0].contenido = content;
            }
            else {
                const newLangage = {
                    contenido: transcription,
                    lenguaje: language,
                    urlAudio: audio.url
                };
                contenidoCache.lenguajes.push(newLangage);
            }
            if (language === 'es') {
                contenidoCache.audioEsUrl = audio.url;
            }
            else {
                contenidoCache.audioEnUrl = audio.url;
            }
            const contenidoEditado = await contenido_model_1.default.findByIdAndUpdate(idContent, contenidoCache, { new: true });
            res.status(200).json({ state: true, contenido: contenidoEditado });
        }
    }
    catch (error) {
        res.status(400).json({ state: false, error });
    }
};
exports.editContent = editContent;
//# sourceMappingURL=ia.controller.js.map