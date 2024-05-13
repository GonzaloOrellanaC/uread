import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../interfaces/User.interface";
import userRouter from "../router/user.router";

interface AuthContextValues {
    userData?: User,
    login: (email: string, password: string) => void,
    loading: boolean
    isAdmin: boolean
}

export const AuthContext = createContext<AuthContextValues>({} as AuthContextValues)

export const AuthProvider = (props: any) => {
    const [ userData, setUserData ] = useState<User>()
    const [loading, setLoading] = useState<boolean>(false)
    const [isAdmin, setIsAdmin] = useState(false)
    
    const login = (email: string, password: string) => {
        if (email && password) {
            setLoading(true)
            try {
                userRouter.login(email, password)
                .then(response => {
                    setUserData(response.data)
                    setLoading(false)
                })
                .catch(err => {
                    console.log(err)
                    alert(err.response.data.message)
                    setLoading(false)
                })
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
    }
    useEffect(() => {
        const idUread = localStorage.getItem('id-uread')
        console.log(userData)
        if (!userData && idUread) {
            getUserById(idUread)
        }
        if (userData) {
            if (userData.roles && userData.roles[0]) {
                if (userData.roles[0].name === "SuperAdmin" || userData.roles[0].name === "admin") {
                    setIsAdmin(true)
                }
            }
        }
    },[userData])
    const getUserById = async (id: string) => {
        const response = await userRouter.getUser(id)
        setUserData(response.data)
    }
    const provider = {
        userData,
        login,
        loading,
        isAdmin
    }
    return (
        <AuthContext.Provider value={provider}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)