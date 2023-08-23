import { env } from '@/configs'
import { Contenido } from '@/interfaces/contenido.interface'
import { Organization } from '@/interfaces/roles.interface'
import contenidoModel from '@/models/contenido.model'
import nivelesModel from '@/models/niveles.model'
import { HttpException } from '@exceptions/HttpException'
import { User } from '@interfaces/users.interface'
import userModel from '@models/users.model'
import { isEmpty } from '@utils/util'
import bcrypt from 'bcrypt'
import { __ } from 'i18n'
import { ObjectId } from 'mongoose'

const contenido = contenidoModel
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

const leerContenidos = async () => {
    const contenidoResponse: Contenido[] = await contenido.find()
    return contenidoResponse
}

const leerContenidosBasicos = async () => {
    const resNiveles: any[] = await niveles.find()
    const contenidoBasicoResponse: Contenido[] = await contenido.find({nivel: resNiveles[0]._id}).populate('nivel')
    return contenidoBasicoResponse
}

export default {
    guardarContenido,
    editarContenido,
    borrarContenido,
    leerContenidos,
    leerContenidosBasicos
}