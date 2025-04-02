import { createContext, useContext, useEffect, useState } from "react";
import { Contenido } from "../interfaces/Contenido.interface";
import contenidoRouter from "../router/contenido.router";
import { AuthContext } from "./Auth.context";
import { IonModal, IonSpinner } from "@ionic/react";

interface ContenidoContextValues {
    contenido: Contenido[],
    contenidoV2: Contenido[],
    getContenido: (premium: boolean) => void
    niveles: any[]
    crearContenido: (contenido: Contenido) => Promise<any>
    editarContenido: (contenido: Contenido) => Promise<any>
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    gruposNiveles: any[]
}

export const ContenidoContext = createContext<ContenidoContextValues>({} as ContenidoContextValues)

export const ContenidoProvider = (props: any) => {
    const {userData, isAdmin, grupos} = useContext(AuthContext)
    const [ contenido, setContenido ] = useState<Contenido[]>([])
    const [ contenidoV2, setContenidoV2 ] = useState<Contenido[]>([])
    const [niveles, setNiveles] = useState<any[]>([])
    const [gruposNiveles, setGruposNiveles] = useState<any[]>([])

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!isAdmin && userData && grupos && grupos.length > 0) {
            getContenido()
        }
        if (isAdmin) {
            getContenidoAdmin()
        }
    }, [userData, grupos])

    useEffect(() => {
        if (userData && isAdmin) {
            leerNiveles()
            leerGruposNiveles()
        }
    }, [userData, isAdmin])
    
    const getContenido = async () => {
        const response = await contenidoRouter.getContenido(grupos.map(g => {return g._id}))
        setContenido(response.data)
    }
    
    const getContenidoAdmin = async () => {
        const response = await contenidoRouter.getTodoContenido()
        console.log(response)
        setContenido(response.data)
    }

    const leerNiveles = async () => {
        const response = await contenidoRouter.getNiveles()
        console.log(response)
        setNiveles(response.data)
    }

    const leerGruposNiveles = async () => {
        const response = await contenidoRouter.getGruposNiveles()
        console.log(response)
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
        editarContenido,
        setLoading,
        gruposNiveles
    }
    return (
        <ContenidoContext.Provider value={provider}>
            {props.children}
            <IonModal 
                className="loading"
                isOpen={loading}
                backdropDismiss={false}
            >
                <IonSpinner className="loading-general" />
            </IonModal>
        </ContenidoContext.Provider>
    )
}

export const useContenidoContext = () => useContext(ContenidoContext)