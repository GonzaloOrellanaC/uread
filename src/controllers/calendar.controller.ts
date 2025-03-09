import calendarModel from "@/models/calendar.model";
import { Request, Response } from "express";

export const createMeeting = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const response = await calendarModel.create({...data, state: true})
        res.status(200).json({
            state: true,
            data: response
        })
    } catch (error) {
        res.status(400).json({
            state: false,
            error
        })
    }
}

export const getMeetings = async (req: Request, res: Response) => {
    try {
        const response = await calendarModel.find({state: true})
        res.status(200).json({
            state: true,
            data: response
        })
    } catch (error) {
        res.status(400).json({
            state: false,
            error
        })
    }
}