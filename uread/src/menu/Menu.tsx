import { IonButton, IonContent, IonMenu } from "@ionic/react"
import { useAuthContext } from "../context/Auth.context"
import { useHistory } from "react-router"
import { ProfileModal } from "../components/Modals/Profile/Profile.modal"
import { useState } from "react"

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
            </IonContent>
        </IonMenu>
    )
}