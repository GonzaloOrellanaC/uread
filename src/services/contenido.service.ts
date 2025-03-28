import { env } from '@/configs'
import { Contenido } from '@/interfaces/contenido.interface'
import { Organization } from '@/interfaces/roles.interface'
import contenidoModel from '@/models/contenido.model'
import contenidoV2Model from '@/models/contenido_v2.model'
import nivelesModel from '@/models/niveles.model'
import { HttpException } from '@exceptions/HttpException'
import { User } from '@interfaces/users.interface'
import userModel from '@models/users.model'
import { isEmpty } from '@utils/util'
import bcrypt from 'bcrypt'
import { __ } from 'i18n'
import mongoose, { ObjectId } from 'mongoose'
import { createAudio, transcript, translateText } from './ia.service'
/* import { TranslationServiceClient } from '@google-cloud/translate' */

const contenido = contenidoModel
const contenidoV2 = contenidoV2Model
const niveles = nivelesModel

const guardarContenido = async (contenidoData: Contenido) => {
    const contenidoResponse: Contenido = await contenido.create(contenidoData)
    return contenidoResponse
}

const editarContenido = async (contenidoData: Contenido) => {
    const contenidoResponse: Contenido = await contenido.findByIdAndUpdate(contenidoData._id, contenidoData)
    return contenidoResponse
}

const borrarContenido = async (_id: ObjectId) => {
    const contenidoResponse: Contenido = await contenido.findByIdAndDelete(_id)
    return contenidoResponse
}

const leerContenidos = async (idGrupos: string[]) => {
    return new Promise<any[]>(async resolve => {
        const lista: any[] = []
        const resultados = await Promise.all(idGrupos.map(async (id: any) => {
            const elementos = await contenido.find({nivel: id, state: true}).populate('nivel')
            return elementos
        }))
        organizarContenidos(lista, resultados, 0, (filtrados) => {
            resolve(filtrados)
        })
    })
}

const organizarContenidos = (lista: any[], contenidos: any[][], index: number, callback: (filtrados: any[]) => void) => {
    if (!contenidos[index]) {
        const filtered = Array.from(new Set(lista.map(a => a._id)))
            .map(_id => {
                return lista.find(a => a._id === _id)
            })
        callback(filtered)
    } else {
        const contenido = contenidos[index]
        contenido.forEach((c, n) => {
            lista.push(c)
            if (n === contenido.length - 1) {
                organizarContenidos(lista, contenidos, index + 1, callback)
            }
        })
    }
}

const leerContenidosV2 = async () => {
    const contenidoResponse: Contenido[] = await contenidoV2.find()
    return contenidoResponse
}

const leerContenidosBasicos = async () => {
    const resNiveles: any[] = await niveles.find()
    const contenidoBasicoResponse: Contenido[] = await contenido.find({nivel: resNiveles[0]._id}).populate('nivel')
    return contenidoBasicoResponse
}

const crearContenidoV2 = async (contenido: Contenido) => {
    try {
        const audioEs: any = await createAudio(contenido.lenguajes[0].contenido, Date.now(), 'nova')
        const audioEsUrl = audioEs.url
        const transcriptionEs: any = await transcript(audioEs.fileName)
        const translation = await translateText(contenido.lenguajes[0].contenido, 'inglés')
        contenido.lenguajes[0].transcripcion = transcriptionEs
        const audioEn: any = await createAudio(translation.choices[0].message.content, Date.now(), 'nova')
        const audioEnUrl = audioEn.url
        const transcriptionEn: any = await transcript(audioEn.fileName)
        contenido.lenguajes[1].transcripcion = transcriptionEn
        contenido.lenguajes[1].contenido = translation.choices[0].message.content
        const newContent: Contenido = {
            ...contenido,
            audioEnUrl,
            audioEsUrl
        }
        const response = await contenidoV2.create(newContent)
        return ({state: true, contenido: response})
    } catch (error) {
        return ({state: false, error})
    }
}

const editarContenidoV2 = async (contenido: Contenido) => {
    try {
        const newContent: Contenido = {
            ...contenido
        }
        const response = await contenidoV2.findByIdAndUpdate(newContent._id, newContent)
        return ({state: true, contenido: response})
    } catch (error) {
        return ({state: false, error})
    }
}

export default {
    guardarContenido,
    editarContenido,
    borrarContenido,
    leerContenidos,
    leerContenidosV2,
    leerContenidosBasicos,
    crearContenidoV2,
    editarContenidoV2
}