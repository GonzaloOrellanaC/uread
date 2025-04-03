import { IonButton, IonContent, IonIcon, IonMenu } from "@ionic/react"
import { useAuthContext } from "../context/Auth.context"
import { useHistory } from "react-router"
import { ProfileModal } from "../components/Modals/Profile/Profile.modal"
import { useState } from "react"
import { logoWhatsapp } from "ionicons/icons"

interface Menu {
    contentId: string
    menuId: string
}

export const Menu = ({contentId, menuId}: Menu) => {
    const {userData, setUserData} = useAuthContext()
    const [openProfile, setOpenProfile] = useState(false)
    const history = useHistory()

    const cerrarSesion = () => {
        history.replace('/login');
        setUserData(undefined);
        localStorage.clear()
    }

    return (
        <IonMenu menuId={menuId} contentId={contentId} swipeGesture={false}>
            {openProfile && <ProfileModal
                open={openProfile}
                handleClose={() => {
                    setOpenProfile(false)
                }}
            />}
            <IonContent className="ion-padding">
                <div className="menu-profile">
                    <img src={userData?.profileImage ? userData.profileImage : './assets/images/user-profile-default.svg'} />
                    <p>
                        {userData?.name} {userData?.lastName}
                    </p>
                </div>
                <br />
                <IonButton expand={'block'} color={'primary'} onClick={() => {setOpenProfile(true)}}>
                    Editar Perfil
                </IonButton>
                <br />
                <IonButton expand={'block'} color={'primary'} onClick={cerrarSesion}>
                    Cerrar Sesión
                </IonButton>
                <div style={{marginTop: 30}}>
                    <h4>Contacto</h4>
                    <p style={{color: '#b0b0b0', fontSize: 12}}>Para consultas y soporte:</p>
                    <IonButton expand={'block'} href="https://wa.me/+56993128583" target="_blank">
                        <IonIcon icon={logoWhatsapp} style={{marginRight: 10}}/> WhatsApp
                    </IonButton>
                </div>
            </IonContent>
        </IonMenu>
    )
}