import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./Auth.context";
import notificacionesRouter from "../router/notificaciones.router";
import { NotificacionModal } from "../components/Modals/NotificacionModal/Notificacion.modal";

interface NotificacionesContextValues {
    setNotificaciones: React.Dispatch<React.SetStateAction<any[]>>
    notificaciones: any[]
    totalNuevasNotificaciones: number
    setNotificacionSeleccionada: React.Dispatch<any>
}

export const NotificacionesContext = createContext<NotificacionesContextValues>({} as NotificacionesContextValues)

export const NotificacionesProvider = (props: any) => {
    const {userData} = useAuthContext()

    const [notificaciones, setNotificaciones] = useState<any[]>([])
    const [totalNuevasNotificaciones, setTotalNuevasNotificaciones] = useState(0)

    const [openNotificacion, setOpenNotificacion] = useState(false)

    const [notificacionSeleccionada, setNotificacionSeleccionada] = useState<any>()

    useEffect(() => {
        if (userData) {
            readNotificaciones()
        }
    }, [userData])

    useEffect(() => {
        if (notificaciones.length > 0) {
            let num = 0
            notificaciones.forEach((n) => {
                if (n.viwed === null) {
                    num++
                }
            })
            setTotalNuevasNotificaciones(num)
        }
    }, [notificaciones])

    useEffect(() => {
        if (notificacionSeleccionada) {
            setOpenNotificacion(true)
            const nuevaNotificacion = {
                ...notificacionSeleccionada,
                viwed: Date.now()
            }
            actualizaNotificacion(nuevaNotificacion)
        }
    }, [notificacionSeleccionada])

    useEffect(() => {
        if (!openNotificacion) {
            setNotificacionSeleccionada(undefined)
        }
    }, [openNotificacion])

    const actualizaNotificacion = async (notificacion: any) => {
        const response = await notificacionesRouter.editNotificacion(notificacion)
        console.log(response)
        readNotificaciones()
    }
    
    const readNotificaciones = async () => {
        const response = await notificacionesRouter.getNotificacionesPorUsuario(userData!._id, 0, 10)
        setNotificaciones(response.response)
    }

    const provider = {
        setNotificaciones,
        notificaciones,
        totalNuevasNotificaciones,
        setNotificacionSeleccionada
    }

    return (
        <NotificacionesContext.Provider value={provider}>
            {openNotificacion && <NotificacionModal
                open={openNotificacion}
                handleClose={() => {setOpenNotificacion(false)}}
                notificacion={notificacionSeleccionada}
            />}
            {props.children}
        </NotificacionesContext.Provider>
    )
}

export const useNotificacionesContext = () => useContext(NotificacionesContext)