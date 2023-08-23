import { createContext, useContext, useEffect, useState } from "react";
import { Contenido } from "../interfaces/Contenido.interface";
import contenidoRouter from "../router/contenido.router";
import userRouter from "../router/user.router";
import { AuthContext } from "./Auth.context";

interface ContenidoContextValues {
    contenido: Contenido[],
    getContenido: (premium: boolean) => void
}

export const ContenidoContext = createContext<ContenidoContextValues>({} as ContenidoContextValues)

export const ContenidoProvider = (props: any) => {
    const {userData} = useContext(AuthContext)
    const [ contenido, setContenido ] = useState<Contenido[]>([])
    useEffect(() => {
        if (userData) {
            console.log(userData)
            if (userData.emailVerifiedAt) {
                getContenido(userData.premium)
            }
        }
    }, [userData])
    
    const getContenido = async (premium: boolean) => {
        const response = await contenidoRouter.getContenido(premium)
        setContenido(response.data)
    }
    const provider = {
        contenido,
        getContenido
    }
    return (
        <ContenidoContext.Provider value={provider}>
            {props.children}
        </ContenidoContext.Provider>
    )
}

export const useContenidoContext = () => useContext(ContenidoContext)