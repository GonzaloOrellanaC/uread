import { editNotification, findNotificationsByUser } from "@/services/notificaciones.service";
import { Request, Response } from "express";

export const putNotification = async (req: Request, res: Response) => {
    const not = req.body
    try {
        const response = await editNotification(not)
        res.status(200).json({response})
    } catch ({name, message}) {
        res.status(400).json({name, message})
    }
}

export const getNotifications = async (req: Request, res: Response) => {
    const {userId, skip, limit} = req.query
    try {
        const response = await findNotificationsByUser(userId as string, Number(skip), Number(limit))
        res.status(200).json({response})
    } catch ({name, message}) {
        res.status(400).json({name, message})
    }
}