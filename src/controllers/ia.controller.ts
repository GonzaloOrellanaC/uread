import { createAudio, transcript } from "@/services/ia.service";
import { Request, Response } from "express";
import contenidoController from "./contenido.controller";
import { Contenido } from "@/interfaces/contenido.interface";
import contenidoModel from "@/models/contenido.model";

export const createNewContent = async (req: Request, res: Response) => {
    const {title, description} = req.body
    try {
        const response = await contenidoModel.create({
            nombreTexto: title,
            descripcion: description
        })
        res.status(200).json({state: true, contenido: response})
    } catch (error) {
        res.status(400).json({state: false, error})
    }
}

export const editContent = async (req: Request, res: Response) => {
    const {idContent, content, nameVoice, language} = req.body
    const contentFound = await contenidoController.buscarContenidoPorId(idContent)
    const contenidoCache: any = {...contentFound}
    try {
        const id = Date.now()
        const audio : any = await createAudio(content, id, nameVoice)
        if (audio.state) {
            const transcription: any = await transcript(audio.fileName)
            const filterLenguaje = contenidoCache.lenguajes.filter(leng => (leng.lenguaje === language))

            if (filterLenguaje.length > 0) {
                contenidoCache.lenguajes[0].contenido = content
            } else {
                const newLangage = {
                    contenido: transcription,
                    lenguaje: language,
                    urlAudio: audio.url
                }
                contenidoCache.lenguajes.push(newLangage)
            }
            if (language==='es') {
                contenidoCache.audioEsUrl = audio.url
            } else {
                contenidoCache.audioEnUrl = audio.url
            }
            const contenidoEditado = await contenidoModel.findByIdAndUpdate(idContent, contenidoCache, {new: true})
            res.status(200).json({state: true, contenido: contenidoEditado})
        }
    } catch (error) {
        res.status(400).json({state: false, error})
    }
}