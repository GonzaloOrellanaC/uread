import { locale } from '@configs/env'
import { User } from '@interfaces/users.interface'
import UserService from '@services/users.service'
import { NextFunction, Request, Response } from 'express'
import { RequestWithUser } from '@interfaces/auth.interface'
import { Organization } from '@/interfaces/roles.interface'
import organizationModel from '@/models/organizations.model'

const getUsers = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const findAllUsersData: User[] = await UserService.findAllUser()
        res.status(200).json({ data: findAllUsersData, message: 'findAll' })
    } catch (error) {
        console.log(error)
    }
}

const getAdminUsers = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const findAllUsersData: User[] = await UserService.findAllAdminUser()
        res.status(200).json({ data: findAllUsersData, message: 'findAll' })
    } catch (error) {
        console.log(error)
    }
}

const getAllSystemUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const findAllSystemUserData: User[] = await UserService.findAllSystemUser()
        res.status(200).json({ data: findAllSystemUserData, message: 'findAll' })
    } catch (error) {
        console.log(error)
    }
}

const getUsersByOrg = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {orgId} = req.body
        const findUsers: User[] = await UserService.getUsersByOrg(orgId)

        res.status(200).json({ data: findUsers, message: 'findOne' })
    } catch (error) {
        console.log(error)
    }
}

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: string = req.body.id
        const findOneUserData: User = await UserService.findUserById(userId)

        res.status(200).json({ data: findOneUserData, message: 'findOne' })
    } catch (error) {
        console.log(error)
    }
}

const createAdminSysUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData: User = req.body
        const userLocale = req.cookies.language || locale
        const createUserData: User = await UserService.createUser(userData, userLocale)
        res.status(201).json({ data: createUserData, message: 'created' })
    } catch (error) {
        console.log(error)
    }
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData: User = req.body
        const userLocale = req.cookies.language || locale
        const createUserData: User = await UserService.createUser(userData, userLocale)
        if (createUserData.organization[0]) {
            await organizationModel.findOneAndUpdate({_id: createUserData.organization[0]._id}, { $push: { users: createUserData._id } })
        }
        res.status(201).json({ data: [createUserData], message: 'created' })
    } catch (error) {
        res.status(401).json({data: error, message: 'error'})
        console.log(error)
    }
}

const editUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData: User = req.body
        const user: User = await UserService.editUser(userData)
        res.status(200).json({ user, message: 'updated' })
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body)
        const userId: string = req.body._id
        const userLocale = req.cookies.language || locale
        const deleteUserData: User = await UserService.deleteUser(userId, userLocale)

        res.status(200).json({ data: deleteUserData, message: 'deleted' })
    } catch (error) {
        console.log(error)
    }
}

const validarUsuario = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const {usuario} = req.body
        const deleteUserData: User = await UserService.validar(usuario)

        res.status(200).json({ data: deleteUserData, message: 'validado' })
    } catch ({name, message}) {
        console.log({name, message})
        res.status(200).json({ data: {name}, message })
    }
}

const habilitarUsuarioDesdeAlumno = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {alumno} = req.body
        const userData: any = await UserService.habilitarAlumno(alumno)

        res.status(200).json({ user: userData, message: 'validado' })
    } catch ({name, message}) {
        console.log({name, message})
        res.status(200).json({ data: {name}, message })
    }
}

const cambiarPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {userId, password} = req.body
        console.log(userId, password)
        const userData: any = await UserService.camibiarPassword(userId, password)

        res.status(200).json({ user: userData, msg: 'Password Cambiada con éxito' })
    } catch ({name, message}) {
        console.log({name, message})
        res.status(200).json({ data: {name}, message })
    }
}

export default {
    getUsers,
    getAdminUsers,
    getUserById,
    getAllSystemUser,
    getUsersByOrg,
    createAdminSysUser,
    createUser,
    editUser,
    deleteUser,
    validarUsuario,
    habilitarUsuarioDesdeAlumno,
    cambiarPassword
}
