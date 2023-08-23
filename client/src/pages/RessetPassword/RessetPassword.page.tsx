import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonSpinner } from "@ionic/react"
import { eyeOffOutline, eyeOutline } from "ionicons/icons"
import { useState } from "react"
import { useHistory, useParams } from "react-router"
import userRouter from "../../router/user.router"

const RessetPasswordPage = () => {
    const history = useHistory()
    const {token}: any = useParams()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState<any>('password')
    const [showConfirmPassword, setShowConfirmPassword] = useState<any>('password')
    const [loading, setLoading] = useState<boolean>(false)
    const cambiarPassword = async () => {
        if (password === confirmPassword) {
            setLoading(true)
            try {
                const response = await userRouter.restorePassword(token, password)
                console.log(response)
                setLoading(false)
                if(response.message === 'password reset') {
                    alert('Contraseña cambiada con éxito. Ahora inicie sesión.')
                    history.replace('/')
                }
            } catch (error: any) {
                console.log(error)
                setLoading(false)
            }
        } else {
            alert('Debe ingresar el email')
        }
    }
    return(
        <IonPage>
            <IonContent>
                <div className='page-container'>
                    <IonGrid>
                        <IonRow className='content-data content-data-size'>
                            <IonCol sizeXl='4' sizeLg='2' sizeMd='2' sizeSm='0' sizeXs='0'>
                                
                            </IonCol>
                            <IonCol sizeXl='4' sizeLg='8' sizeMd='8' sizeSm='12' sizeXs='12'>
                                <h2 style={{ color: 'var(--ion-color-primary)', fontFamily: 'Comic Sans MS' }}>Ingresa tu nueva contraseña 2 veces.</h2>
                                <br />
                                <IonItem fill={'outline'} color={'primary'}>
                                    <IonLabel position={'floating'}>Password</IonLabel>
                                    <IonInput
                                        type={showPassword}
                                        value={password}
                                        onIonChange={(e) => { e.target.value && setPassword(e.target.value.toString()) }}
                                    />
                                    <IonButtons slot="end">
                                        <IonButton color={'primary'} shape={'round'} onClick={() => { setShowPassword((showPassword==='password') ? 'text' : 'password') }}>
                                            <IonIcon icon={(showPassword==='text') ? eyeOffOutline : eyeOutline} />
                                        </IonButton>
                                    </IonButtons>
                                </IonItem>
                                <br />
                                <IonItem fill={'outline'} color={'primary'}>
                                    <IonLabel position={'floating'}>Confirme Password</IonLabel>
                                    <IonInput
                                        type={showConfirmPassword}
                                        value={confirmPassword}
                                        onIonChange={(e) => { e.target.value && setConfirmPassword(e.target.value.toString()) }}
                                    />
                                    <IonButtons slot="end">
                                        <IonButton color={'primary'} shape={'round'} onClick={() => { setShowConfirmPassword((showConfirmPassword==='password') ? 'text' : 'password') }}>
                                            <IonIcon icon={(showConfirmPassword==='text') ? eyeOffOutline : eyeOutline} />
                                        </IonButton>
                                    </IonButtons>
                                </IonItem>
                                <br />
                                <IonButton expand={'block'} onClick={cambiarPassword}>
                                    {loading && <IonSpinner style={{ marginRight: 10 }} />}
                                    Cambiar password
                                </IonButton>
                            </IonCol>
                            <IonCol sizeXl='4' sizeLg='2' sizeMd='2' sizeSm='0' sizeXs='0'>
                                
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default RessetPasswordPage
