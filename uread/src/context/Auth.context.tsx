import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../interfaces/User.interface";
import userRouter from "../router/user.router";
import { useHistory } from "react-router";

interface AuthContextValues {
    userData?: User,
    login: (email: string, password: string) => void,
    loading: boolean
    isAdmin: boolean
    setUserData: React.Dispatch<React.SetStateAction<User | undefined>>

}

export const AuthContext = createContext<AuthContextValues>({} as AuthContextValues)

export const AuthProvider = (props: any) => {
    const [ userData, setUserData ] = useState<User>()
    const [loading, setLoading] = useState<boolean>(false)
    const [isAdmin, setIsAdmin] = useState(false)

    const history = useHistory()
    
    const login = (email: string, password: string) => {
        if (email && password) {
            setLoading(true)
            try {
                userRouter.login(email, password)
                .then(response => {
                    setUserData(response.data)
                    localStorage.setItem('user', JSON.stringify(response.data))
                    setLoading(false)
                    history.push('/home')
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
        if (userData) {
            console.log(userData)
            history.replace('/home')
            if (userData.roles && userData.roles[0]) {
                if (userData.roles[0].name === "SuperAdmin" || userData.roles[0].name === "admin") {
                    setIsAdmin(true)
                }
            }
        } else {
            const userCache = localStorage.getItem('user')
            if (userCache) {
                setUserData(JSON.parse(userCache))
            }
        }
    },[userData])

    /* const getUserById = async (id: string) => {
        const response = await userRouter.getUser(id)
        setUserData(response.data)
    } */

    const provider = {
        userData,
        login,
        loading,
        isAdmin,
        setUserData
    }
    return (
        <AuthContext.Provider value={provider}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)