import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonSpinner } from '@ionic/react'
import { useAuthContext } from '../../context/Auth.context'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import userRouter from '../../router/user.router'
import { User } from '../../interfaces/User.interface'
import { eyeOffOutline, eyeOutline } from 'ionicons/icons'

const LoginContainer = () => {

    const {userData, login, loading} = useAuthContext()
    const history = useHistory()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)
    /* const [isLoading, setIsLoading] = useState<boolean>(false) */
    
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
        <IonContent className="ion-padding">
            <IonGrid>
                <IonRow>
                    <IonCol></IonCol>
                    <IonCol sizeXs='12' sizeSm='10' sizeMd='6' sizeLg='4' sizeXl='3'>
                        <div style={{ marginTop: 50 }}>
                            <div className='icon-logo-container'>
                                <img src={'/assets/images/logo.png'} width={80} alt=""/>
                                <p className='title size-title'>Club bilingüe</p>
                                {/* <p className='subTitle size-subTitle'>Read, Master, Succed.</p> */}
                            </div>
                            <br />
                            <IonItem
                                disabled={loading}
                                fill={'outline'}
                                lines={'none'}
                                color={'primary'}
                                style={{ backgroundColor: '#E6D3FF'}}            
                            >
                                <IonLabel position="stacked" color={'primary'}>
                                    Correo / Email
                                </IonLabel>
                                <IonInput
                                    type={'email'}
                                    color={'primary'}
                                    onIonChange={(e: any) => {setEmail(e.target.value)}}
                                />
                            </IonItem>
                            <br />
                            <IonItem
                                disabled={loading}
                                fill={'outline'}
                                lines={'none'}
                                color={'primary'}
                                style={{ backgroundColor: '#E6D3FF'}}            
                            >
                                <IonLabel position="stacked" color={'primary'}>
                                    Contraseña / Password
                                </IonLabel>
                                <IonInput
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
                                <a onClick={() => { history.push('/restore-password')}} style={{ fontSize: 12, padding: 5, textDecoration: 'none', borderColor: 'var(--ion-color-primary)', borderStyle: 'solid', borderWidth: 2, borderRadius: 8 }}>Restaurar contraseña / Restore password</a>
                            </div>
                        </div>
                    </IonCol>
                    <IonCol></IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}

export default LoginContainer
