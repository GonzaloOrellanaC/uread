import { createContext, useContext, useState } from "react";
import { User } from "../interfaces/User.interface";
import userRouter from "../router/user.router";

interface UsersContextValues {
    userData?: User,
    getUserById: (id: string) => Promise<User>
}

export const UsersContext = createContext<UsersContextValues>({} as UsersContextValues)

export const UsersProvider = (props: any) => {
    const [ userData, setUserData ] = useState<User>()
    const getUserById = async (id: string) => {
        const response = await userRouter.getUser(id)
        setUserData(response.data)
        return response.data
    }
    const provider = {
        userData,
        getUserById
    }
    return (
        <UsersContext.Provider value={provider}>
            {props.children}
        </UsersContext.Provider>
    )
}

export const useUsersContext = () => useContext(UsersContext)