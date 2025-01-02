import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonPage, IonRow, IonSpinner } from "@ionic/react"
import { useState } from "react"
import { useHistory } from "react-router"
import userRouter from "../../router/user.router"

const RestorePasswordPage = () => {
    const history = useHistory()
    const [email, setEmail] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)
    const solicitarPassword = async () => {
        if (email) {
            setLoading(true)
            try {
                const response = await userRouter.resetPassword(email)
                console.log(response)
                if(response.message === 'email sent') {
                    alert('Correo enviado. Si no lo ve en su bandeja de entrada, revise los SPAMS')
                    history.replace('/')
                }
                setLoading(false)
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
                                <h2 style={{ color: 'var(--ion-color-primary)', fontFamily: 'Comic Sans MS' }}>Ingresa tu correo electrónico para recuperar la contraseña.</h2>
                                <br />
                                <IonItem
                                    lines={'none'}
                                    style={{ backgroundColor: '#E6D3FF'}}            
                                >
                                    <IonInput
                                        label="Correo / Email"
                                        labelPlacement={'stacked'}
                                        fill={'outline'}
                                        style={{ backgroundColor: '#E6D3FF'}}            
                                        value={email}
                                        type={'email'}
                                        color={'primary'}
                                        onIonChange={(e: any) => {setEmail(e.target.value)}}
                                    />
                                </IonItem>
                                <br />
                                <IonButton expand={'block'} onClick={solicitarPassword}>
                                    {loading && <IonSpinner style={{ marginRight: 10 }} />}
                                    Solicitar
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

export default RestorePasswordPage
