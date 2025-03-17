import classroomModel from "@/models/classroom.model";
import { Request, Response } from "express";

export const guardarClassroom = async (req: Request, res: Response) => {
    const {classRoomList} = req.body
    /* classRoomList.forEach(c=> {
        console.log(c)
    }) */
    const classRoomListEdited = await Promise.all(classRoomList.map(async (c: any) => {
        if (c._id) {
            const classRoom = await classroomModel.findByIdAndUpdate(c._id, c)
            return classRoom
        } else {
            const classRoom = await classroomModel.create(c)
            return classRoom
        }
    }))
    res.status(200).json({list: classRoomListEdited})
}

export const getClassrooms = async (req: Request, res: Response) => {
    const list = await classroomModel.find()
    res.status(200).json({list})
}

export const leerClassroomsPorNivelPlan = async (req: Request, res: Response) => {
    const {nivel, plan} = req.query

    try {
        const list = await classroomModel.find()
        const listToSend1 : any[] = []
        list.forEach((item: any) => {
            item.planes.forEach((p: any) =>{
                if (p.name === plan && p.checked) {
                    listToSend1.push(item)
                }
            })
        })
        const listToSend2 : any[] = []
        listToSend1.forEach((item: any) => {
            item.niveles.forEach((n: any) =>{
                if (Number(n.number) === Number(nivel) && n.checked) {
                    listToSend2.push(item)
                }
            })
        })
        res.status(200).json({list: listToSend2})
    } catch ({name, message}) {
        res.status(400).json({name, message})
    }
}