import { createContext, useContext, useEffect, useState } from "react";
import calendarRouter from "../router/calendar.router";

export const CalendarContext = createContext<any>({} as any)

export const CalendarProvider = (props: any) => {
    const [ meetings, setMeetings ] = useState<any[]>([])

    useEffect(() => {

    }, [])

    const createNewMeeting = async (data: any) => {
        const response = await calendarRouter.createMeeting(data)
        if (response.state) {
            console.log(response.data)
        }
    }
    
    const provider = {
        meetings,
        setMeetings,
        createNewMeeting
    }
    return (
        <CalendarContext.Provider value={provider}>
            {props.children}
        </CalendarContext.Provider>
    )
}

export const useCalendarContext = () => useContext(CalendarContext)