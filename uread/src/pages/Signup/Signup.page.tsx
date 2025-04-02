import { IonButton, IonCol, IonContent, IonGrid, IonImg, IonInput, IonItem, IonList, IonPage, IonRow } from "@ionic/react"
import { useState } from "react"
import userRouter from "../../router/user.router"
import { User } from "../../interfaces/User.interface"
import { useHistory } from "react-router"

export const SignupPage = () => {
    const history = useHistory()
    const [userData, setUserData] = useState<User>({
        name: '',
        lastName: '',
        email: '',
        password: ''
    } as User)
    const [password, setPassword] = useState('')
    const [confirmarPassword, setConfirmarPassword] = useState('')

    const registre = async () => {
        if (password.length > 5) {
            if (confirmarPassword === password) {
                if (userData.name) {
                    if (userData.lastName) {
                        if (userData.email) {
                            const newUser = {
                                ...userData,
                                password
                            }
                            const response = await userRouter.createUser(newUser)
                            if (response) {
                                alert(`Se ha enviará un correo a ${userData.email} con instrucciones para validar su cuenta.`)
                                history.goBack()
                            }
                        } else {
                            alert('Falta ingresar el email.')
                        }
                    } else {
                        alert('Falta ingresar el apellido.')
                    }
                } else {
                    alert('Falta ingresar el nombre.')
                }
            } else {
                alert('Passwords no son iguales. Revise y vuelva a escribir.')
            }
        } else {
            alert('Password debe ser de mínimo 6 carácteres.')
        }
    }

    return (
        <IonPage style={{height: '100vh'}}>
            <IonContent style={{backgroundColor: 'pink', fontFamily: 'Rimouski'}}>
                <IonGrid style={{
                    height: '99vh',
                    padding: 0
                    }}>
                    <IonRow style={{
                        height: '100%',
                        padding: 0
                        }}>
                        <IonCol style={{
                            height: '100%',
                            padding: 0
                            }}>
                            <div style={{height: '100%'}}>
                                <img
                                    src="/assets/images/uread_signup_bg.jpeg"
                                    width={'100%'}
                                    style={{height: '100%', objectFit: 'cover'}}
                                    alt="" />
                            </div>
                        </IonCol>
                        <IonCol style={{
                            padding: 0
                        }} sizeXl="6" sizeLg="6" sizeMd="6" sizeSm="12" sizeXs="12">
                            <div style={{marginTop: 30, textAlign: 'center'}}>
                                <IonImg style={{height: 100}} src={'/assets/icon/uread/uread_logo_transparente.png'} />
                                <div style={{textAlign: 'center'}}>
                                    <p>
                                        Para inscribir necesitaremos que hagas una cuenta en nuestra plataforma.
                                    </p>
                                </div>
                                    <IonRow>
                                        <IonCol />
                                        <IonCol sizeXl="6" sizeLg="9" sizeMd="12" sizeSm="12" sizeXs="12">
                                            <IonList>
                                                <IonItem>
                                                    <IonInput value={userData.name} onIonChange={(e) => {setUserData({...userData, [e.target.name] : e.target.value})}} name={'name'} label="Nombre" labelPlacement={'floating'} />
                                                </IonItem>
                                                <IonItem>
                                                    <IonInput value={userData.lastName} onIonChange={(e) => {setUserData({...userData, [e.target.name] : e.target.value})}} name={'lastName'} label="Apellido" labelPlacement={'floating'} />
                                                </IonItem>
                                                <IonItem>
                                                    <IonInput value={userData.email} onIonChange={(e) => {setUserData({...userData, [e.target.name] : e.target.value})}} name={'email'} label="Email" labelPlacement={'floating'} />
                                                </IonItem>
                                                <IonItem>
                                                    <IonInput value={password} onIonChange={(e) => {setPassword(e.target.value as string)}} name={'password'} label="Password" labelPlacement={'floating'} />
                                                </IonItem>
                                                <IonItem>
                                                    <IonInput value={confirmarPassword} onIonChange={(e) => {setConfirmarPassword(e.target.value as string)}} name={'confirmPassword'} label="Confirme Password" labelPlacement={'floating'} />
                                                </IonItem>
                                            </IonList>
                                            <br />
                                            <br />
                                            <IonButton expand={'block'} onClick={registre}>
                                                Iniciar como Apoderado
                                            </IonButton>
                                            <br />
                                            <IonButton expand={'block'} color={'medium'} onClick={() => {history.push('/login')}}>
                                                Ya tengo cuenta
                                            </IonButton>
                                        </IonCol>
                                        <IonCol />
                                    </IonRow>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}