import { createContext, useContext, useEffect, useState } from "react";
import { Contenido } from "../interfaces/Contenido.interface";
import contenidoRouter from "../router/contenido.router";
import { AuthContext } from "./Auth.context";

interface ContenidoContextValues {
    contenido: Contenido[],
    contenidoV2: Contenido[],
    getContenido: (premium: boolean) => void
    niveles: any[]
    crearContenido: (contenido: Contenido) => Promise<any>
    editarContenido: (contenido: Contenido) => Promise<any>
}

export const ContenidoContext = createContext<ContenidoContextValues>({} as ContenidoContextValues)

export const ContenidoProvider = (props: any) => {
    const {userData} = useContext(AuthContext)
    const [ contenido, setContenido ] = useState<Contenido[]>([])
    const [ contenidoV2, setContenidoV2 ] = useState<Contenido[]>([])
    const [niveles, setNiveles] = useState<any[]>([])
    useEffect(() => {
        if (userData) {
            console.log(userData)
            const premium = (userData.roles[0].name === 'SuperAdmin' || userData.roles[0].name === 'admin') ? true : userData.premium
            getContenido(premium)
            leerNiveles()
        }
    }, [userData])
    
    const getContenido = async (premium: boolean) => {
        const response = await contenidoRouter.getContenido(premium)
        console.log(response)
        const res = await contenidoRouter.getContenidoV2()
        console.log(res)
        setContenido(response.data)
        setContenidoV2(res.data)
    }

    const leerNiveles = async () => {
        const response = await contenidoRouter.getNiveles()
        console.log(response)
        setNiveles(response.data)
    }

    const crearContenido = async (contenido: Contenido) => {
        const response = await contenidoRouter.crearContenido(contenido)
        return response.data
    }

    const editarContenido = async (contenido: Contenido) => {
        const response = await contenidoRouter.editarContenido(contenido)
        const res = await contenidoRouter.getContenidoV2()
        console.log(res)
        setContenidoV2(res.data)
        return response.data
    }

    const provider = {
        contenido,
        contenidoV2,
        getContenido,
        niveles,
        crearContenido,
        editarContenido
    }
    return (
        <ContenidoContext.Provider value={provider}>
            {props.children}
        </ContenidoContext.Provider>
    )
}

export const useContenidoContext = () => useContext(ContenidoContext)