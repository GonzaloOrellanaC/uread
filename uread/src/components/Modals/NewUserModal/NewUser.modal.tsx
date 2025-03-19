import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonSelect, IonSelectOption, IonSpinner, IonTitle, IonToolbar } from "@ionic/react"
import { closeOutline, eyeOffOutline, eyeOutline, star } from "ionicons/icons"
import { useEffect, useState } from "react"
import { ModalData } from "../../../interfaces/ModalData.interface"
import { format } from 'rut.js'
import { User } from "../../../interfaces/User.interface"
import userRouter from "../../../router/user.router"
import rolesRouter from "../../../router/roles.router"

interface Rol {
    name: string
    _id: string
}

const NewUserModal = ({open, closeModal, user, deleteUser}: ModalData) => {
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [run, setRun] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [levelUser, setLevelUser ] = useState<number>()
    const [showPassword, setShowPassword] = useState<any>('password')
    const [showConfirmPassword, setShowConfirmPassword] = useState<any>('password')
    const [roles, setRoles] = useState<Rol[]>([])
    const [roleSelected, setRoleSelected] = useState<string[]>()
    const [userData, setUserData] = useState<User | undefined>()
    const [premium, setPremium] = useState<boolean>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (open) {
            init()
        }
    }, [open])

    useEffect(() => {
        if (user) {
            setUserData(user)
        } else {
            setUserData(undefined)
        }
    }, [user])

    useEffect(() => {
        console.log(userData)
        if (userData) {
            setName(userData.name)
            setLastName(userData.lastName)
            setEmail(userData.email)
            setRun(userData.run)
            setLevelUser(userData.levelUser)
            setPremium(userData.premium)
        } else {
            setName('')
            setLastName('')
            setEmail('')
            setRun('')
            setRoleSelected([])
            setLevelUser(undefined)
            setPremium(false)
        }
    }, [userData])

    useEffect(() => {
        if (run)
        if (run.length > 1) {
            const runCache = run
            setRun(format(runCache))
        } else if (run === '-' || run.length === 0) {
            setRun('')
        }
    }, [run])

    useEffect(() => {
        console.log(roles)
        if (userData && (roles.length > 0)) {
            const rolesCache: string[] = []
            userData.roles.forEach((rol, i) => {
                rolesCache.push(rol._id)
            })
            setRoleSelected(rolesCache)
            console.log(rolesCache)
        }
    }, [roles])

    const init = async () => {
        const response = await rolesRouter.getRoles()
        setRoles(response.data)
    }
    
    useEffect(() => {
        console.log(premium)
    }, [premium])

    const guardarUsuario = async () => {
        if (userData) {
            setLoading(true)
            const userToEdit = {
                _id: userData._id,
                name: name,
                lastName: lastName,
                email: email,
                password: password,
                roles: roleSelected,
                run: run,
                levelUser: levelUser,
                premium: premium
            } as User
            const response = await userRouter.editUser(userToEdit)
            if (response) {
                setLoading(false)
                closeModal()
            }
        } else {
            if (password === confirmPassword) {
                setLoading(true)
                const newUser = {
                    name: name,
                    lastName: lastName,
                    email: email,
                    password: password,
                    roles: roleSelected,
                    run: run,
                    levelUser: levelUser,
                    premium: premium
                } as User
                try {
                    const response = await userRouter.createUser(newUser)
                    console.log(response)
                    setLoading(false)
                    if (response) {
                        closeModal()
                    }
                } catch (error: any) {
                    setLoading(false)
                    console.log(error)
                    alert(error.message + ' Run: ' + error.response.data.data.keyValue.run )
                }
            } else {
                alert('Contraseñas no coinciden.')
            }
        }
    }
    
    return (
        <IonModal
            isOpen={open}
            className='user-modal'
            onWillDismiss={closeModal}
        >
            <IonHeader className={'ion-no-border'}>
                <IonToolbar>
                    <IonTitle color={'primary'}>{user ? 'Editar Usuario' : 'Crear Usuario'}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton color={'primary'} onClick={closeModal} shape={'round'} >
                            <IonIcon icon={closeOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem >
                    <IonInput
                        label="Nombre"
                        labelPlacement={'floating'}
                        fill={'outline'}
                        color={'primary'}
                        type={'text'}
                        value={name}
                        onIonChange={(e) => { e.target.value && setName(e.target.value.toString()) }}
                    />
                </IonItem>
                <br />
                <IonItem >
                    <IonInput
                        label="Apellido"
                        labelPlacement={'floating'}
                        fill={'outline'}
                        color={'primary'}
                        type={'text'}
                        value={lastName}
                        onIonChange={(e) => { e.target.value && setLastName(e.target.value.toString()) }}
                    />
                </IonItem>
                <br />
                <IonItem >
                    <IonInput
                        label="R.U.N."
                        labelPlacement={'floating'}
                        fill={'outline'}
                        color={'primary'}
                        maxlength={12}
                        type={'text'}
                        value={run}
                        onIonChange={(e) => { e.target.value && setRun(e.target.value.toString()) }}
                    />
                </IonItem>
                <br />
                <IonItem >
                    <IonInput
                        label="Correo"
                        labelPlacement={'floating'}
                        fill={'outline'}
                        color={'primary'}
                        type={'email'}
                        value={email}
                        onIonChange={(e) => { e.target.value && setEmail(e.target.value.toString()) }}
                    />
                </IonItem>
                {!userData && <br />}
                {!userData && <IonItem >
                    <IonInput
                        label="Password"
                        labelPlacement={'floating'}
                        fill={'outline'}
                        color={'primary'}
                        type={showPassword}
                        value={password}
                        onIonChange={(e) => { e.target.value && setPassword(e.target.value.toString()) }}
                    />
                    <IonButtons slot="end">
                        <IonButton color={'primary'} shape={'round'} onClick={() => { setShowPassword((showPassword==='password') ? 'text' : 'password') }}>
                            <IonIcon icon={(showPassword==='text') ? eyeOffOutline : eyeOutline} />
                        </IonButton>
                    </IonButtons>
                </IonItem>}
                {!userData && <br />}
                {!userData && <IonItem >
                    <IonInput
                        label="Confirm Password"
                        labelPlacement={'floating'}
                        fill={'outline'}
                        color={'primary'}
                        type={showConfirmPassword}
                        value={confirmPassword}
                        onIonChange={(e) => { e.target.value && setConfirmPassword(e.target.value.toString()) }}
                    />
                    <IonButtons slot="end">
                        <IonButton color={'primary'} shape={'round'} onClick={() => { setShowConfirmPassword((showConfirmPassword==='password') ? 'text' : 'password') }}>
                            <IonIcon icon={(showConfirmPassword==='text') ? eyeOffOutline : eyeOutline} />
                        </IonButton>
                    </IonButtons>
                </IonItem>}
                <br />
                <IonButton expand={'block'} color={'primary'} onClick={guardarUsuario}>
                    {loading && <IonSpinner style={{ marginRight: 10 }} />} {userData ? 'Editar usuario' : 'Crear usuario'}
                </IonButton>
                {userData && <br />}
                {userData && <IonButton expand={'block'} color={'danger'} onClick={() => { deleteUser && deleteUser(userData) }}>
                    Borrar Usuario
                </IonButton>}
            </IonContent>
        </IonModal>
    )
}

export default NewUserModal
