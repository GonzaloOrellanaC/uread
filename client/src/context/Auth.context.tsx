import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../interfaces/User.interface";
import userRouter from "../router/user.router";

interface AuthContextValues {
    userData?: User,
    login: (email: string, password: string) => void,
    loading: boolean
}

export const AuthContext = createContext<AuthContextValues>({} as AuthContextValues)

export const AuthProvider = (props: any) => {
    const [ userData, setUserData ] = useState<User>()
    const [loading, setLoading] = useState<boolean>(false)
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
        if (!userData && idUread) {
            getUserById(idUread)
        }
    },[userData])
    const getUserById = async (id: string) => {
        const response = await userRouter.getUser(id)
        setUserData(response.data)
    }
    const provider = {
        userData,
        login,
        loading
    }
    return (
        <AuthContext.Provider value={provider}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)