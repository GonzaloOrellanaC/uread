import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonInputPasswordToggle, IonItem, IonPage, IonRow } from "@ionic/react"
import { useState } from "react"
import { useHistory, useParams } from "react-router"
import userRouter from "../../router/user.router"

export const BienvenidaPage = () => {
const [password, setPassword] = useState<string>()
const [confirmPassword, setConfirmPassword] = useState<string>()


const params: any = useParams()

const history = useHistory()


const enviarNuevaPassword = async () => {
    if (password && password.length > 5) {
        if (password === confirmPassword) {
            try {
                const response = await userRouter.restorePassword(params.id as string, password as string)
                if (response) {
                    console.log(response)
                    alert('Su contraseña ha sido generada. Ahora ingrese a la plataforma. Será redireccionado al Login')
                    setTimeout(() => {
                        history.replace('/login')
                    }, 500);
                }
            } catch (error) {
                alert('Error')
            }
        } else {
            alert('Contraseñas no coinciden.')
        }
    } else {
        alert('Contraseña debe tener al menos 6 carácteres.')
    }
}


    return (
        <IonPage>
            <IonContent class="ion-padding">
                <IonGrid>
                    <IonRow>
                        <IonCol />
                        <IonCol sizeXl="3" sizeLg="4" sizeMd="7" sizeSm="10" sizeXs="12">
                            <div style={{textAlign: 'center'}}>
                                <h3>Para iniciar en UREAD debes crear una contraseña</h3>
                                <br />
                                <IonItem>
                                    <IonInput type={'password'} labelPlacement={'floating'} label='Nueva Password' name={'password'} value={password} onIonChange={(e) => {setPassword(e.target.value as string)}}>
                                        <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                                    </IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonInput type={'password'} labelPlacement={'floating'} label='Confirme Password' name={'confirmPassword'} value={confirmPassword} onIonChange={(e) => {setConfirmPassword(e.target.value as string)}}>
                                        <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                                    </IonInput>
                                </IonItem>
                                <IonButton expand={'block'} onClick={enviarNuevaPassword}>
                                    Enviar nueva contraseña
                                </IonButton>
                            </div>
                        </IonCol>
                        <IonCol />
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}