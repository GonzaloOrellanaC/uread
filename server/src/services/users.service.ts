import { env } from '@/configs'
import { Organization } from '@/interfaces/roles.interface'
import { HttpException } from '@exceptions/HttpException'
import { User } from '@interfaces/users.interface'
import userModel from '@models/users.model'
import { isEmpty } from '@utils/util'
import bcrypt from 'bcrypt'
import { __ } from 'i18n'
import { ObjectId } from 'mongoose'

const user = userModel

const findAllUser = async () => {
    const users: User[] = await user.find().populate('roles')
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
    const findUser: User = await user.findByIdAndUpdate(usuario._id, usuario)
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

    const hashedPassword = await bcrypt.hash(userData.password, 10)
    const users: User[] = await user.find()
    userData.idUser = users.length + 1
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
    deleteUser
}
