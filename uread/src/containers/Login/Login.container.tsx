import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonSpinner } from '@ionic/react'
import { useAuthContext } from '../../context/Auth.context'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import userRouter from '../../router/user.router'
import { User } from '../../interfaces/User.interface'
import { eyeOffOutline, eyeOutline } from 'ionicons/icons'
import { RegistreModal } from '../../components/Modals'

const LoginContainer = () => {

    const {userData, login, loading} = useAuthContext()
    const history = useHistory()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [openRegistreModal, setOpenRegistreModal] = useState<boolean>(false)
    
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
                /* if (validateEmail(email)) { */
                    login(email, password)
                /* } else {
                    alert('No se reconoce el formato de correo electrónico.')
                } */
            } catch (error: any) {
                console.log(error)
                alert(error.response.data.message)
                /* setIsLoading(false) */
            }
        }
    }

    /* const validateEmail = (email: string) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      }; */

    const closeRegistreModal = () => {
        setOpenRegistreModal(false)
    }

    return (
        <IonContent className="ion-padding">
            <RegistreModal open={openRegistreModal} closeModal={closeRegistreModal} />
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
                                style={{ backgroundColor: '#E6D3FF'}}            
                            >
                                <IonInput
                                    disabled={loading}
                                    label='Correo / Email'
                                    labelPlacement={'stacked'}
                                    type={'email'}
                                    color={'primary'}
                                    onIonChange={(e: any) => {setEmail(e.target.value)}}
                                />
                            </IonItem>
                            <br />
                            <IonItem
                                style={{ backgroundColor: '#E6D3FF'}}            
                            >
                                <IonInput
                                    disabled={loading}
                                    label='Contraseña / Password'
                                    labelPlacement={'stacked'}                                
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
                                    {loading && <IonSpinner />}
                                    Login
                                </IonButton>
                                <br />
                                <IonButton color={'secondary'} expand={'block'} onClick={() => {setOpenRegistreModal(true)}}>
                                    Registre
                                </IonButton>
                                <br />
                            </div>
                            <div
                                style={{
                                    width: '100%',
                                    textAlign: 'center',
                                    cursor: 'pointer'
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
