import { PreUser } from '@/interfaces/pre-users.interface'
import { User } from '@/interfaces/users.interface'
import preUserModel from '@/models/pre-users.model'
import userModel from '@/models/users.model'
import excelToJson from 'convert-excel-to-json'
import { NextFunction, Request, Response } from 'express'
import {validate, format, getCheckDigit} from 'rut.js'

const preUserData = preUserModel
const userData = userModel

interface Doc {
    A: number,
    B: string,
    C: string,
    D: string,
    E: string
}

const loadPreUserExcel = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.files)
    console.log(req.files[0].buffer)
    const buffer = Buffer.from(req.files[0].buffer, 'base64')
    console.log(buffer.toString('base64'))
    if (req.files) {
        const result: any = excelToJson({
            source: buffer,
            header: {
                rows: 1
            }
        })
        const doc : Doc[] = result.Hoja1
        doc.forEach(async (el, i) => {
            try {
                const run: string = format(el.A.toString() + getCheckDigit(el.A.toString()))
                const preUser: PreUser = {
                    run: run
                }
                const findUser = await preUserData.findOne({run: preUser.run})
                if (!findUser) {
                    try {
                        await preUserData.create({...preUser})
                    } catch (error) {
                        
                    }
                }
            } catch (error) {
                
            }
            if (i === (doc.length - 1)) {
                res.json({
                    state: true,
                    data: 'Users added'
                })
            }
        })
    }
}

const getPreUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allPreUsers = await preUserData.find()
        console.log(allPreUsers.length)
        res.json(allPreUsers)
    } catch (error) {
        
    }
}

const findPreUserByRun = async (req: Request, res: Response, next: NextFunction) => {
    const { run } = req.body
    try {
        const user: PreUser = await preUserData.findOne({run: run})
        if (!user) {
            res.json({data: null, state: false, message: 'user not found'})
        } else {
            const userRegistered: User = await userData.findOne({run: run})
            if (userRegistered) {
                res.json({data: user, state: false, message: 'user ir registered'})
            } else {
                res.json({data: user, state: true, message: 'user found'})
            }
        }
    } catch (error) {
        
    }
}

export default {
    loadPreUserExcel,
    getPreUsers,
    findPreUserByRun
}
