import { env, keys } from '@configs/index'
import { HttpException } from '@exceptions/HttpException'
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface'
import { LoginData, User } from '@interfaces/users.interface'
import userModel from '@models/users.model'
import { asset, frontendAsset, isEmpty } from '@utils/util'
import { logger } from '@/utils/logger'
import { generateHTML } from '@/utils/html'
import bcrypt from 'bcrypt'
import { __ } from 'i18n'
import jwt from 'jsonwebtoken'
import { sendHTMLEmail } from './email.service'
import path from 'path'
import { ObjectId } from 'mongoose'
import { environment } from '@/configs/env'

const user = userModel

const signup = async (
    userData: User,
) => {
    if (isEmpty(userData)) throw new HttpException(400, __({ phrase: 'Credentials are required' }))

    const findUser: User = await user.findOne({ email: userData.email }).populate('roles')
    if (findUser)
        throw new HttpException(
            409,
            __({ phrase: 'Email {{email}} already exists' }, { email: userData.email })
        )

    const hashedPassword = await bcrypt.hash(userData.password, 10)
    const createUserData: User = await user.create({ ...userData, password: hashedPassword })
    const loginToken = createToken(createUserData)
    const cookie = createCookie(loginToken)

    const verificationToken = createToken(createUserData, 0)
    const args = {
        fullName: `${createUserData.name} ${createUserData.lastName}` ,
        email: createUserData.email,
        verifyLink: asset(`/validate-password/verify?token=${verificationToken.token}`),
        platformURL: env.url,
        platformName: env.platformName
    }
    console.log(args)
    sendHTMLEmail(
        createUserData.email,
        __({ phrase: 'Verify your email' , locale: 'es'  }),
        generateHTML(path.join(__dirname, `/../emailTemplates/verify.email.template/es.html`), args),
        { attachments: [{ filename: 'logo.png', path: frontendAsset('assets/images/logo.png'), cid: 'logo' }] }
    ).catch(err => {console.log(err); logger.error(__({ phrase: err.message/* , locale */ }))})

    return { cookie, createdUser: createUserData }
}

const resendVerification = async (
    userData: User,
) => {
    const loginToken = createToken(userData)
    const cookie = createCookie(loginToken)
    const verificationToken = createToken(userData, 0)
    const args = {
        fullName: `${userData.name} ${userData.lastName}` ,
        email: userData.email,
        verifyLink: asset(`/validate-password/verify?token=${verificationToken.token}`),
        platformURL: env.url,
        platformName: env.platformName
    }
    sendHTMLEmail(
        userData.email,
        __({ phrase: 'Verify your email' , locale: 'es'  }),
        generateHTML(path.join(__dirname, `/../emailTemplates/verify.email.template/es.html`), args),
        { attachments: [{ filename: 'logo.png', path: frontendAsset('assets/images/logo.png'), cid: 'logo' }] }
    ).catch(err => {console.log(err); logger.error(__({ phrase: err.message }))})
    return { cookie, user: userData }
}

const login = async (
    userData: LoginData,
    locale: string = env.locale
) => {
    console.log(userData)
    if (isEmpty(userData)) throw new HttpException(400, __({ phrase: 'Credentials are required', locale }))

    const findUser: User = await user.findOne({ email: userData.email }).populate('roles').populate('organization')
    if (!findUser)
        throw new HttpException(409, __({ phrase: 'Email {{email}} not found', locale }, { email: userData.email }))

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password)
    if (!isPasswordMatching) throw new HttpException(409, __({ phrase: 'Wrong password', locale }))

    const token = createToken(findUser, 86400)
    const cookie = createCookie(token)

    return { cookie, findUser, token }
}

const logout = async (userData: User, locale: string = env.locale) => {
    if (isEmpty(userData)) throw new HttpException(400, __({ phrase: 'Credentials are required', locale }))
    const findUser: User = await user.findOne({ email: userData.email/* , password: userData.password */ })
    if (!findUser)
        throw new HttpException(409, __({ phrase: 'Email {{email}} not found', locale }, { email: userData.email }))

    return findUser
}

const verifyUserEmail = async (userId: ObjectId /* locale: string = env.locale */) => {
    if (isEmpty(userId)) throw new HttpException(400, __({ phrase: 'An ID is required', locale: 'es' }))

    let findUser = await user.findOne({ _id: userId })
    if (!findUser) throw new HttpException(409, __({ phrase: 'User not found', locale: 'es' }))

    findUser.emailVerifiedAt = new Date()
    findUser = await findUser.save()
    if (!findUser) throw new HttpException(409, __({ phrase: 'Unable to update user', locale: 'es' }))

    return findUser
}

/**
 * Initiates reset password process for a given email
 * @param {*} email Email for which to initiate the reset password process
 * @returns Object, data to generate email to send (reset token, fullname, email)
 */
const forgotPassword = async (email: string) => {
    const findUser: User = await user.findOneAndUpdate(
        { email },
        { updatedAt: new Date() },
        { new: true, timestamps: false }
    )
    if (isEmpty(findUser))
        throw new HttpException(409, __({ phrase: 'Email {{email}} not found', locale: 'es' }, { email }))
    const resetToken = createToken(findUser)
    const args = {
        fullName: `${findUser.name} ${findUser.lastName}`,
        resetLink: (environment === 'development') ? `http://localhost:8100/reset-password/${resetToken.token}` : `${env.url}/reset-password/${resetToken.token}`
    }
    await sendHTMLEmail(
        findUser.email,
        __({ phrase: 'Reset your password', locale: 'es' }),
        generateHTML(path.join(__dirname, `/../emailTemplates/reset.password.template/es.html`), args),
        { attachments: [{ filename: 'logo.png', path: frontendAsset('assets/images/logo.png'), cid: 'logo' }] }
    ).catch(err => logger.error(__({ phrase: err.message, locale: 'es' })))

    return findUser
}

/**
 * Resets password for a given token
 * @param {string} token Token to reset password
 * @param {string} password New password
 * @returns {User} data of the updated user
 */
const resetPassword = async (token: string, password: string) => {
    if (isEmpty(token)) throw new HttpException(400, __({ phrase: 'Token is required', locale: 'es' }))
    if (isEmpty(password)) throw new HttpException(400, __({ phrase: 'Password is required', locale: 'es' }))

    const tokenData: DataStoredInToken = verifyToken(token)
    if (!tokenData) throw new HttpException(409, __({ phrase: 'Invalid token', locale: 'es' }))

    const hashedPassword = await bcrypt.hash(password, 10)

    const findUser: User = await user.findOneAndUpdate(
        { _id: tokenData._id },
        { password: hashedPassword },
        { new: true }
    )
    if (!findUser) throw new HttpException(409, __({ phrase: 'User not found', locale: 'es' }))
    return findUser
}

const createToken = (user: User, expiresIn = 3600) => {
    const dataStoredInToken: DataStoredInToken = { _id: user._id } // user._id, [organizationId, resources]
    const secretKey: string = keys.secretKey

    return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) }
}

const verifyToken = (token: string, ignoreExpiration = false) => {
    const secretKey: string = keys.secretKey

    return jwt.verify(token, secretKey, { ignoreExpiration }) as DataStoredInToken
}

const createCookie = (tokenData: TokenData) => {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`
}

export default {
    signup,
    resendVerification,
    login,
    logout,
    verifyUserEmail,
    forgotPassword,
    resetPassword,
    createToken,
    verifyToken,
    createCookie
}
