import { logger } from '@/utils/logger'
import { locale } from '@configs/env'
import { LoginData, User } from '@interfaces/users.interface'
import AuthService from '@services/auth.service'
import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongoose'

const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData: User = req.body
        const { cookie, createdUser } = await AuthService.signup(userData)
        res.setHeader('Set-Cookie', [cookie])
        res.status(201).json({ data: createdUser, message: 'Su correo ha sido registrado. Revise su correo para finalizar el proceso. En caso de no encontrarlo en su bandeja de entrada revise el SPAM.' })
    } catch (error) {
        next(error)
    }
}
const resendVerification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData: User = req.body.user
        const { cookie, user } = await AuthService.resendVerification(userData)
        res.setHeader('Set-Cookie', [cookie])
        res.status(201).json({ data: user, message: `${user.name} ${user.lastName} tu correo no ha sido verificado. Revisa tu bandeja de entrada para ejecutar la verificación y vuelve a iniciar sesión` })
    } catch (error) {
        next(error)
    }
}

const logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData: LoginData = req.body
        const userLocale = req.cookies.language || locale
        const { cookie, findUser, token, grupos } = await AuthService.login(userData, userLocale)
        res.setHeader('Set-Cookie', [cookie])
        res.status(200).json({ data: findUser, token: token.token, message: 'login', grupos })
    } catch ({name, message}) {
        res.status(400).json({name, message})
    }
}

const logOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData: User = req.body
        console.log(userData)
        const userLocale = req.cookies.language || locale
        const logOutUserData: User = await AuthService.logout(userData, userLocale)
        res.setHeader('Set-Cookie', ['Authorization=; Max-age=0'])
        res.status(200).json({ data: logOutUserData, message: 'logout' })
    } catch (error) {
        next(error)
    }
}

const verifyUserEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string = req.body?.token.toString()
        const userId: ObjectId = AuthService.verifyToken(token, true)._id
        const verifyUserData: User = await AuthService.verifyUserEmail(userId)
        res.status(200).json({ data: verifyUserData, message: 'verified' })
    } catch (error) {
        next(error)
    }
}

const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email: string = req.body?.email?.toString()
        const resetUserPassword: User = await AuthService.forgotPassword(email)
        res.status(200).json({ data: resetUserPassword, message: 'email sent' })
    } catch (error) {
        next(error)
    }
}

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string = req.body?.token.toString()
        const password: string = req.body?.password?.toString()
        console.log(token, password)
        const resetUserPassword: User = await AuthService.resetPassword(token, password)

        res.status(200).json({ data: resetUserPassword, message: 'password reset' })
    } catch ({name, message}) {
        logger.error(`Errir setting password | ${name}: ${message}`)
        res.status(400).json({ data: {name, message}, message: 'password reset' })
    }
}

export default {
    signUp,
    resendVerification,
    logIn,
    logOut,
    verifyUserEmail,
    forgotPassword,
    resetPassword
}
