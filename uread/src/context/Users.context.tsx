import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../interfaces/User.interface";
import userRouter from "../router/user.router";
import { useAuthContext } from "./Auth.context";

interface UsersContextValues {
    userData?: User,
    getUserById: (id: string) => Promise<User>
    users: User[]
    init: () => Promise<void>
    profesores: any[]
    usuarios: any[]
    editUser: (userData: User) => Promise<any>
    historialPagosAlumno: (alumnoId: string) => Promise<any>
    setAlumnos: React.Dispatch<React.SetStateAction<any[]>>
    alumnos: any[]
}

export const UsersContext = createContext<UsersContextValues>({} as UsersContextValues)

export const UsersProvider = (props: any) => {
    const {isAdmin, userData, setUserData} = useAuthContext()
    const [users, setUsers] = useState<User[]>([])

    const [profesores, setProfesores] = useState<any[]>([])
    const [usuarios, setUsuarios] = useState<any[]>([])
    const [alumnos, setAlumnos] = useState<any[]>([])

    useEffect(() => {
        if (isAdmin) {
            init()
        }
    }, [isAdmin])

    useEffect(() => {
        if (userData)
            obtenerAlumnos()
    },[userData])

    useEffect(() => {
        if (alumnos && alumnos.length > 0)
            console.log('Alumnos: ', alumnos)
    },[alumnos])

    const obtenerAlumnos = async () => {
        const response = await userRouter.alumnosPorApoderado(userData!._id)
        setAlumnos(await Promise.all(response.alumnos.map(async (alumno: any) => {
            const response = await userRouter.alumnoFechaPago(alumno._id)
            console.log(response.pagos.fechasPago)
            alumno.fechaProximoPago = response.pagos.fechasPago[response.pagos.fechasPago.length - 1]
            if (response.pagos !== null) {
                const proximoPago = new Date(response.pagos.fechasPago[response.pagos.fechasPago.length - 1]).getTime()
                const hoy = Date.now()
                alumno.pendientePago = (proximoPago < hoy)
            } else {
                alumno.pendientePago = false
            }
            return alumno
        }))
    )
    }


    useEffect(() => {
        if (users) {
            const profesoresCache: any[] = []
            const usuariosCache: any[] = []
            users.forEach((user: any) => {
                if (user.roles) {
                    user.roles.forEach(async (role: any) => {
                        if (role.name === 'teacher' || role.name === 'admin') {
                            profesoresCache.push(user)
                        }
                        if (role.name === 'user') {
                            const response = await historialPagosAlumno(user._id)
                            if (response.pagos !== null) {
                                const proximoPago = new Date(response.pagos.fechasPago[response.pagos.fechasPago.length - 1]).getTime()
                                const hoy = Date.now()
                                user.pendientePago = (proximoPago < hoy)
                                usuariosCache.push(user)
                            } else {
                                user.pendientePago = false
                                usuariosCache.push(user)
                            }
                        }
                    })
                }
            })
            setProfesores(profesoresCache)
            setUsuarios(usuariosCache)
        }
    }, [users])

    const init = async () => {
        setUsers([])
        const response = await userRouter.getUsers()
        setUsers(response.data)
    }

    const editUser = async (userData: User) => {
        const response = await userRouter.editUser(userData)
        console.log(response)
        setUserData(response.user)
        alert(`Datos cambiados exitosamente.`)
        return response
    }

    const historialPagosAlumno = async (alumnoId: string) => {
        const response = await userRouter.alumnoFechaPago(alumnoId)
        return response
    }


    const getUserById = async (id: string) => {
        const response = await userRouter.getUser(id)
        setUserData(response.data)
        return response.data
    }
    const provider = {
        userData,
        getUserById,
        users,
        init,
        profesores,
        usuarios,
        editUser,
        historialPagosAlumno,
        setAlumnos,
        alumnos
    }
    return (
        <UsersContext.Provider value={provider}>
            {props.children}
        </UsersContext.Provider>
    )
}

export const useUsersContext = () => useContext(UsersContext)