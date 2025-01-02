import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonSpinner, IonTitle, IonToolbar } from "@ionic/react"
import { useContext, useEffect, useState } from "react"
import { closeOutline, eyeOffOutline, eyeOutline } from 'ionicons/icons'
import userRouter from "../../../router/user.router"
import { useHistory } from "react-router"
import { AuthContext } from "../../../context/Auth.context"
import { User } from "../../../interfaces/User.interface"
const LoginModal = (props: any) => {
    const {userData, login, loading} = useContext(AuthContext)
    const history = useHistory()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)
    /* const [isLoading, setIsLoading] = useState<boolean>(false) */
    useEffect(() => {
        if (userData) {
            if (/* userData.emailVerifiedAt &&  */props.open) {
                alert(`Bienvenid@ ${userData.name} ${userData.lastName}`)
                if(props.getDataModal)
                props.getDataModal({isAuth: true, user: userData})
                /* setIsLoading(false) */
                props.closeModal()
            }/*  else if (!userData.emailVerifiedAt) {
                resendVerification(userData)
                props.closeModal()
            } */
        }
    },[userData])
    const resendVerification = async (userData: User) => {
        const res = await userRouter.resendVerification(userData)
        /* setIsLoading(false) */
        alert(res.message)
    }
    const isPassword = () => {
        if (showPassword) {
            setShowPassword(false)
        } else {
            setShowPassword(true)
        }
    }
    const initSession = async () => {
        if (email && password) {
            try {
                /* setIsLoading(true) */
                login(email, password)
            } catch (error: any) {
                console.log(error)
                alert(error.response.data.message)
                /* setIsLoading(false) */
            }
        }
    }
    return (
        <IonModal
            isOpen={props.open}
            onWillDismiss={props.closeModal}
        >
            <IonHeader className={'ion-no-border'}>
                <IonToolbar>
                    <IonTitle color={'primary'}>LOG IN / INGRESA</IonTitle>
                    <IonButtons slot="end">
                        <IonButton color={'primary'} onClick={props.closeModal} shape={'round'} >
                            <IonIcon icon={closeOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <div /* style={{ padding: '0px 50px' }} */>
                    <div className='icon-logo-container'>
                        <img src={'/assets/images/logo.png'} width={80} alt=""/>
                        <p className='title size-title'>Mamás en Acción por la Lectura</p>
                        {/* <p className='subTitle size-subTitle'>Read, Master, Succed.</p> */}
                    </div>
                    <br />
                    <IonItem >
                        <IonInput
                            label="Correo / Email"
                            labelPlacement={'stacked'}
                            style={{ backgroundColor: '#E6D3FF'}}
                            disabled={loading}
                            fill={'outline'}                        
                            type={'email'}
                            color={'primary'}
                            onIonChange={(e: any) => {setEmail(e.target.value)}}
                        />
                    </IonItem>
                    <br />
                    <IonItem >
                        <IonInput
                            label="Contraseña / Password"
                            labelPlacement={'stacked'}
                            style={{ backgroundColor: '#E6D3FF'}}
                            disabled={loading}
                            fill={'outline'}
                            type={showPassword ? 'text' : 'password'}
                            color={'primary'}
                            onIonChange={(e: any) => {setPassword(e.target.value)}}
                        />
                        <IonButtons slot="end">
                            <IonButton color={'primary'} shape={'round'} onClick={isPassword}>
                                <IonIcon icon={showPassword ? eyeOffOutline : eyeOutline} />
                            </IonButton>
                        </IonButtons>
                    </IonItem>
                    <br />
                    <div style={{ padding: '0px 100px', textAlign: 'center' }}>
                        <IonButton disabled={loading} expand={'block'} onClick={initSession}>
                            <IonSpinner hidden={!loading} />
                            Login
                        </IonButton>
                        <br />
                    </div>
                    <div
                        style={{
                            width: '100%',
                            textAlign: 'center'
                        }}
                    >
                        <a onClick={() => { history.push('/restore-password'); props.closeModal() }} style={{ fontSize: 12, padding: 5, textDecoration: 'none', borderColor: 'var(--ion-color-primary)', borderStyle: 'solid', borderWidth: 2, borderRadius: 8 }}>Restaurar contraseña / Restore password</a>
                    </div>
                </div>
            </IonContent>
        </IonModal>
    )
}

export default LoginModal