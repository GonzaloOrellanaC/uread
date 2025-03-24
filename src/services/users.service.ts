import { env } from '@/configs'
import { Organization } from '@/interfaces/roles.interface'
import { HttpException } from '@exceptions/HttpException'
import { User } from '@interfaces/users.interface'
import userModel from '@models/users.model'
import { isEmpty } from '@utils/util'
import bcrypt from 'bcrypt'
import { __ } from 'i18n'
import { ObjectId } from 'mongoose'
import { createToken } from './auth.service'
import { sendHTMLEmail } from './email.service'
import { generateHTML } from '@/utils/html'
import { logger } from '@/utils/logger'
import path from 'path'
import alumnoProvisorioModel from '@/models/alumnos-provisorios.model'
import roleModel from '@/models/roles.model'

const user = userModel

const findAllUser = async () => {
    const users: User[] = await user.find().populate('roles').populate('levelUser').populate({
        path : 'alumnos',
        populate : {
          path : 'levelUser'
        }
    })
    return users
}

const findAllAdminUser = async () => {
    const users: User[] = await user.find().populate('roles')
    return users
}

const findAllSystemUser = async () => {
    const users: User[] = await user.find({ organization: { $in: [ [] ] } }).populate('roles').populate('organization')
    return users
}

const getUsersByOrg = async (orgId: ObjectId) => {
    const users: User[] = await user.find({ organization: {$in : [{_id:orgId} as Organization]} }).populate('roles').populate('organization')
    return users
}

const findSupervisores = async () => {
    const users: User[] = await user.find({ subRoles: {$in: ['Supervisor']} })
    return users
}

const findOperadores = async () => {
    const users: User[] = await user.find({ subRoles: {$in: ['Operador']} })
    return users
}

const findUserById = async (userId: string) => {
    if (isEmpty(userId)) throw new HttpException(400, __({ phrase: 'An ID is required', locale: 'es' }))
    const findUser: User = await user.findOne({ _id: userId }, '-password').populate('roles').populate('organization')
    if (!findUser) throw new HttpException(404, __({ phrase: 'User not found', locale: 'es' }))
    return findUser
}

const editUser = async (usuario: User, locale: string = env.locale) => {
    if (isEmpty(user)) throw new HttpException(400, __({ phrase: 'Datos de usuario no encontrados', locale }))
    const findUser: User = await user.findByIdAndUpdate(usuario._id, usuario, {new: true}).populate('roles').populate('organization').populate({
        path : 'alumnos',
        populate : {
          path : 'levelUser'
        }
      }).populate('levelUser')
    if (!findUser) throw new HttpException(404, __({ phrase: 'User not found', locale }))
    return findUser 
}

const findUsersByRole = (role: string) => {
    return new Promise<User[]>( async resolve => {
        if (isEmpty(role)) throw new HttpException(400, __({ phrase: 'An ROLE is required' }))
        const findUsers: User[] = await user.find({ role: role })
        if (!findUsers) throw new HttpException(404, __({ phrase: 'Users not found' }))
        resolve(findUsers)
    })
}

const createAdminSysUser = async (userData: User, locale: string = env.locale) => {

    if (isEmpty(userData)) throw new HttpException(400, __({ phrase: 'Credentials are required', locale }))
    const findUser: User = await user.findOne({ email: userData.email }, '-password') // .select('-password')
    if (findUser)
        throw new HttpException(
            409,
            __({ phrase: 'Email {{email}} already exists', locale }, { email: userData.email })
        )

    const hashedPassword = await bcrypt.hash(userData.password, 10)
    const users: User[] = await findAllUser()
    userData.idUser = users.length + 1
    const createUserData: User = await user.create({ ...userData, password: hashedPassword })
    return createUserData
}

const createUser = async (userData: User, locale: string = env.locale) => {
    if (isEmpty(userData)) throw new HttpException(400, __({ phrase: 'Credentials are required', locale }))
    const findUser: User = await user.findOne({ email: userData.email }, '-password') // .select('-password')
    if (findUser)
        throw new HttpException(
            409,
            __({ phrase: 'Email {{email}} already exists', locale }, { email: userData.email })
        )

    const lastUser = await userModel.find().sort({_id:-1}).limit(1)
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    userData.idUser = lastUser[0].idUser + 1
    const createUserData: User = await user.create({ ...userData, password: hashedPassword })
    return createUserData
}

const updateUser = async (userId: string, userData: User, locale: string = env.locale) => {
    if (isEmpty(userId)) throw new HttpException(400, __({ phrase: 'An ID is required', locale }))
    if (isEmpty(userData)) throw new HttpException(400, __({ phrase: 'User data is required', locale }))

    if (userData.email) {
        const findUser: User = await user.findOne({ email: userData.email })
        if (findUser && findUser._id.toString() !== userId)
            throw new HttpException(
                409,
                __({ phrase: 'Email {{email}} already exists', locale }, { email: userData.email })
            )
    }

    if (userData.password) {
        const hashedPassword = await bcrypt.hash(userData.password, 10)
        userData = { ...userData, password: hashedPassword }
    }

    const updateUserById: User = await user.findByIdAndUpdate(userId, { userData })
    if (!updateUserById) throw new HttpException(409, __({ phrase: 'User not found', locale }))

    return updateUserById
}

const deleteUser = async (userId: string, locale: string = env.locale) => {
    if (isEmpty(userId)) throw new HttpException(400, __({ phrase: 'An ID is required', locale }))
    const deleteUserById: User = await user.findByIdAndDelete(userId)
    if (!deleteUserById) throw new HttpException(404, __({ phrase: 'User not found', locale }))

    return deleteUserById
}

const validar = async (user: User) => {
    try {
        
        const resetToken = createToken(user)
        const args = {
            fullName: `${user.name} ${user.lastName}`,
            resetLink: `${env.url}bienvenida/${resetToken.token}`
        }
        await sendHTMLEmail(
            user.email,
            'Bienvenid@ a UREAD',
            generateHTML(path.join(__dirname, `/../../emailTemplates/bienvenida/email.html`), args),
            null
        )

        const userEdited = await userModel.findByIdAndUpdate(user._id, {validado: 'Por validar'}, {new: true})

        return userEdited
    } catch (error) {
        logger.error(__({ phrase: error.message, locale: 'es' }))
        return null
    }
}

const habilitarAlumno = async (user: User) => {
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        const createUserData: User = await userModel.create({ ...user, password: hashedPassword })
        const args = {
            fullName: `${createUserData.name} ${createUserData.lastName}`,
        }
        await sendHTMLEmail(
            user.email,
            'Bienvenid@ a UREAD',
            generateHTML(path.join(__dirname, `/../../emailTemplates/bienvenida-alumno/email.html`), args),
            null
        )

        const rolAlumno = await roleModel.findOne({name: 'user'})

        await userModel.findByIdAndUpdate(
            user._id,
            {
                validado: 'Validado',
                roles: [rolAlumno._id]
            }, {new: true})

        const alumnoEditado = await alumnoProvisorioModel.findByIdAndUpdate(user._id, {state: false}, {new: true}).populate('levelUser')

        return alumnoEditado
    } catch (error) {
        logger.error(__({ phrase: error.message, locale: 'es' }))
        return null
    }
}

const camibiarPassword = async (userId: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    const findUser = await userModel.findByIdAndUpdate(userId, {password: hashedPassword})

    return findUser
}

export default {
    findAllUser,
    findAllAdminUser,
    findSupervisores,
    findAllSystemUser,
    getUsersByOrg,
    findOperadores,
    findUserById,
    editUser,
    findUsersByRole,
    createUser,
    createAdminSysUser,
    updateUser,
    deleteUser,
    validar,
    habilitarAlumno,
    camibiarPassword
}
