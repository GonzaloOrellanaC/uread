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
}

export const UsersContext = createContext<UsersContextValues>({} as UsersContextValues)

export const UsersProvider = (props: any) => {
    const {isAdmin} = useAuthContext()
    const [ userData, setUserData ] = useState<User>()
    const [users, setUsers] = useState<User[]>([])

    const [profesores, setProfesores] = useState<any[]>([])
    const [usuarios, setUsuarios] = useState<any[]>([])

    useEffect(() => {
        if (isAdmin) {
            init()
        }
    }, [isAdmin])

    useEffect(() => {
        if (users) {
            const profesoresCache: any[] = []
            const usuariosCache: any[] = []
            users.forEach((user) => {
                if (user.roles) {
                    user.roles.forEach((role) => {
                        if (role.name === 'teacher' || role.name === 'admin') {
                            profesoresCache.push(user)
                        }
                        if (role.name === 'user') {
                            usuariosCache.push(user)
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
        editUser
    }
    return (
        <UsersContext.Provider value={provider}>
            {props.children}
        </UsersContext.Provider>
    )
}

export const useUsersContext = () => useContext(UsersContext)