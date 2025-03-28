import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from "@ionic/react"
import { useEffect, useState } from "react"
import { ModalData } from "../../../interfaces/ModalData.interface"
import { closeOutline, eyeOffOutline, eyeOutline, logoFacebook, logoGoogle, mailOutline } from 'ionicons/icons'
import userRouter from "../../../router/user.router"
import { User } from "../../../interfaces/User.interface"
import rolesRouter from "../../../router/roles.router"
const RegistreModal = ({open, closeModal}: ModalData) => {
    const [withEmail, setWithEmail] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
    const [name, setName] = useState<string | undefined>()
    const [lastName, setLastName] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [phone, setPhone] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [confirmPassword, setConfirmPassword] = useState<string>()
    const [role, setRole] = useState<string>()
    const isPassword = () => {
        if (showPassword) {
            setShowPassword(false)
        } else {
            setShowPassword(true)
        }
    }
    const isConfirmPassword = () => {
        if (showConfirmPassword) {
            setShowConfirmPassword(false)
        } else {
            setShowConfirmPassword(true)
        }
    }
    useEffect(() => {
        init()
        setWithEmail(false)
    }, [open])

    const init = async () => {
        const res = await rolesRouter.getRoles()
        res.data.forEach((role: any) => {
            if (role.name === 'user') {
                setRole(role._id)
            }
        })
    }

    const createUser = async () => {
        if (name && lastName && email && phone && password && confirmPassword) {
            if (validateEmail(email)) {
                if (password === confirmPassword) {
                    const newUser = {
                        name: name,
                        lastName: lastName,
                        email: email,
                        phone: phone,
                        password: password,
                        premium: false,
                        state: false,
                        roles: [role]
                    } as User
                    const response = await userRouter.signUpUser(newUser)
                    alert(/* response.message */ 'Bienvenid@ a UREAD. Ingrese a su cuenta.')
                    setName(undefined)
                    setLastName(undefined)
                    setEmail(undefined)
                    setPhone(undefined)
                    setPassword(undefined)
                    setConfirmPassword(undefined)
                    setRole(undefined)
                    closeModal()
                } else {
                    alert('Contraseñas no son iguales.')
                }
            } else {
                alert('No se reconoce el formato de correo electrónico.')
            }
        } else {
            alert('Faltan datos')
        }
    }

    const validateEmail = (email: string) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    return (
        <IonModal
            className={'registre-modal'}
            isOpen={open}
            onWillDismiss={closeModal}
        >
            <IonHeader className={'ion-no-border'}>
                <IonToolbar>
                    <IonTitle color={'primary'}>Registro / Registre</IonTitle>
                    <IonButtons slot="end">
                        <IonButton color={'primary'} onClick={closeModal} shape={'round'} >
                            <IonIcon icon={closeOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <div className="item-button-registre">
                    <IonButton disabled expand={'block'} style={{fontSize: 12}} color={'danger'}>
                        <IonIcon icon={logoGoogle} className={'margin-right-10'}></IonIcon> Pronto registro con Google
                    </IonButton>
                </div>
                <div className="item-button-registre">
                    <IonButton disabled expand={'block'} style={{fontSize: 12, '--background': '#4267B2', color: '#fff' }}>
                        <IonIcon icon={logoFacebook} className={'margin-right-10'}></IonIcon> Pronto registro con Facebook
                    </IonButton>
                </div>
                <div className="item-button-registre">
                    <IonButton expand={'block'} style={{fontSize: 12}} color={'primary'} onClick={() => { setWithEmail(true) }}>
                        <IonIcon icon={mailOutline} className={'margin-right-10'}></IonIcon> Registrate en plataforma
                    </IonButton>
                </div>
                {!withEmail && 
                        <div style={{padding: '20px 0px', textAlign: 'center'}}>
                            <a href="https://uread.cl/wp/politica-uso-de-datos/" target="_blank">Políticas de seguridad</a>
                        </div>}
                {
                    withEmail &&
                    <div style={{ padding: '0px 10px' }}>
                        <IonItem>
                            <IonLabel>
                                * Todos los datos obligatorios
                            </IonLabel>
                        </IonItem>
                        <IonItem >
                            <IonInput
                                style={{ backgroundColor: '#E6D3FF'}}   
                                fill={'outline'}
                                labelPlacement={"stacked"}
                                label="Nombre / Name"                            
                                onIonChange={(e) => {setName(e.target.value?.toString())}}
                                type={'text'}
                                color={'primary'}
                            />
                        </IonItem>
                        <br />
                        <IonItem >
                            <IonInput
                                style={{ backgroundColor: '#E6D3FF'}}   
                                fill={'outline'}
                                labelPlacement={"stacked"}
                                label="Apellido / Surname"
                                onIonChange={(e) => {setLastName(e.target.value?.toString())}}
                                type={'text'}
                                color={'primary'}
                            />
                        </IonItem>
                        <br />
                        <IonItem >
                            <IonInput
                                style={{ backgroundColor: '#E6D3FF'}}   
                                fill={'outline'}
                                labelPlacement={"stacked"}
                                label="Correo / Email"
                                onIonChange={(e) => {setEmail(e.target.value?.toString())}}
                                type={'email'}
                                color={'primary'}
                            />
                        </IonItem>
                        <br />
                        <IonItem >
                            <IonInput
                                style={{ backgroundColor: '#E6D3FF'}}   
                                fill={'outline'}
                                labelPlacement={"stacked"}
                                label="Teléfono / Phone"                            
                                onIonChange={(e) => {setPhone(e.target.value?.toString())}}
                                type={'email'}
                                color={'primary'}
                            />
                        </IonItem>
                        <br />
                        <IonItem >
                            <IonInput
                                style={{ backgroundColor: '#E6D3FF'}}
                                fill={'outline'}
                                labelPlacement={"stacked"}
                                label="Contraseña / Password"
                                onIonChange={(e) => {setPassword(e.target.value?.toString())}}
                                type={showPassword ? 'text' : 'password'}
                                color={'primary'}
                            />
                            <IonButtons slot="end">
                                <IonButton color={'primary'} shape={'round'} onClick={isPassword}>
                                    <IonIcon icon={showPassword ? eyeOffOutline : eyeOutline} />
                                </IonButton>
                            </IonButtons>
                        </IonItem>
                        <br />
                        <IonItem >
                            <IonInput
                                labelPlacement="stacked"
                                label="Confirme Contraseña / Confirm Password"
                                fill={'outline'}
                                color={'primary'}
                                style={{ backgroundColor: '#E6D3FF'}}
                                onIonChange={(e) => {setConfirmPassword(e.target.value?.toString())}}
                                type={showConfirmPassword ? 'text' : 'password'}
                            />
                            <IonButtons slot="end">
                                <IonButton color={'primary'} shape={'round'} onClick={isConfirmPassword}>
                                    <IonIcon icon={showConfirmPassword ? eyeOffOutline : eyeOutline} />
                                </IonButton>
                            </IonButtons>
                        </IonItem>
                        <br />
                        <div style={{ padding: '0px 100px', textAlign: 'center' }}>
                            <IonButton expand={'block'} onClick={createUser}>
                                Registrar con Correo
                            </IonButton>
                        </div>
                        <div style={{padding: '20px 0px', textAlign: 'center'}}>
                            <a href="/data-policy">Políticas de seguridad</a>
                        </div>
                    </div>
                }
            </IonContent>
        </IonModal>
    )
}

export default RegistreModal