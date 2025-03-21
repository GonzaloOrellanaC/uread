import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../interfaces/User.interface";
import userRouter from "../router/user.router";
import { useHistory } from "react-router";
import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonItem, IonModal, IonRow } from "@ionic/react";
import { format } from "rut.js";

interface AuthContextValues {
    userData?: User,
    login: (email: string, password: string) => void,
    loading: boolean
    isAdmin: boolean
    setUserData: React.Dispatch<React.SetStateAction<User | undefined>>
    apoderado: boolean
    alumno: boolean
    profesor: boolean
    traducirNombreRol: (name: string) => string
}

export const AuthContext = createContext<AuthContextValues>({} as AuthContextValues)

export const AuthProvider = (props: any) => {
    const [ userData, setUserData ] = useState<User>()
    const [loading, setLoading] = useState<boolean>(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [apoderado, setApoderado] = useState(false)
    const [alumno, setAlumno] = useState(false)
    const [profesor, setProfesor] = useState(false)

    const [openRunEditor, setOpenRunEditor] = useState(false)

    const [newRun, setNewRun] = useState('')

    const history = useHistory()
    
    const login = (email: string, password: string) => {
        if (email && password) {
            setLoading(true)
            try {
                userRouter.login(email, password)
                .then(response => {
                    setUserData(response.data)
                    localStorage.setItem('uread_user', JSON.stringify(response.data))
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

    const editRun = async () => {
        if (newRun.length > 0) {
            setLoading(true)
            const newUser = {
                ...userData,
                run: newRun
            } as User
            const response = await userRouter.editUser(newUser)
            setUserData(response.user)
            localStorage.setItem('uread_user', JSON.stringify(response.user))
            setOpenRunEditor(false)
            setLoading(false)
        }
    }

    const addRut = (run: string) => {
        setNewRun(format(run))
    }


    useEffect(() => {
        if (userData) {
            if (userData.roles && userData.roles[0]) {
                if (userData.roles[0].name === "SuperAdmin" || userData.roles[0].name === "admin") {
                    setIsAdmin(true)
                } else if (userData.roles[0].name === "studentRepresentative") {
                    setApoderado(true)
                } else if (userData.roles[0].name === "user") {
                    setAlumno(true)
                } else {
                    setProfesor(true)
                }
            }
            if ((!userData.run || userData.run.length < 1) && (userData.roles[0].name === "studentRepresentative")) {
                setOpenRunEditor(true)
            }
        } else {
            const userCache = localStorage.getItem('uread_user')
            if (userCache) {
                if (
                    location.pathname.includes('login') ||
                    location.pathname.includes('restore-password') ||
                    location.pathname.includes('reset-password') ||
                    location.pathname.includes('validate-password') ||
                    location.pathname.includes('plan') ||
                    location.pathname.includes('bienvenida')
                ) {
                    console.log('Nothing')
                } else {
                    setUserData(JSON.parse(userCache))
                    history.replace('/home')
                }
            } else {
                if (
                    location.pathname.includes('login') ||
                    location.pathname.includes('restore-password') ||
                    location.pathname.includes('reset-password') ||
                    location.pathname.includes('validate-password') ||
                    location.pathname.includes('plan') ||
                    location.pathname.includes('bienvenida')
                ) {
                    console.log('Nothing')
                } else {
                    history.replace('/login')
                }
            }
        }
    },[userData])


    
    const traducirNombreRol = (name: string) => {
        if (name === 'studentRepresentative') {
            return 'Apoderado'
        } else if (name === 'user') {
            return 'Alumno'
        } else if (name === 'admin') {
            return 'Administrador'
        } else {
            return name
        }
    }

    const provider = {
        userData,
        login,
        loading,
        isAdmin,
        setUserData,
        apoderado,
        alumno,
        profesor,
        traducirNombreRol
    }
    return (
        <AuthContext.Provider value={provider}>
            <IonModal
                isOpen={openRunEditor}
                backdropDismiss={false}
            >
                <IonContent class="ion-padding">
                    <IonGrid>
                        <IonRow>
                            <IonCol />
                            <IonCol sizeXl="6" sizeLg="6" sizeMd="8" sizeSm="10" sizeXs="12">
                                <p style={{textAlign: 'justify'}}>
                                    <strong>Bienvenid@ a UREAD.</strong> <br />
                                    Necesitamos que ingrese su R.U.T. para continuar con el proceso.
                                </p>
                                <IonInput onIonInput={(e) => {
                                    addRut(e.target.value as string)
                                }} value={newRun} label={'R.U.T'} labelPlacement={'floating'} fill={'outline'}/>
                                <br /><br />
                                <IonButton onClick={editRun} expand={'block'}>
                                    Agregar RUT
                                </IonButton>
                            </IonCol>
                            <IonCol />
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonModal>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)