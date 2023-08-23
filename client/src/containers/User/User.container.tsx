import { IonCol, IonContent, IonGrid, IonRow } from "@ionic/react"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { User } from "../../interfaces/User.interface"
import userRouter from "../../router/user.router"

const UserContainer = () => {
    const {id}: any = useParams()
    const [user, setUser] = useState<User>()
    const getUserData = async () => {
        const response = await userRouter.getUser(id)
        setUser(response.data)
    }
    useEffect(() => {
        getUserData()
    },[])
    return (
        <IonContent className='page-container'>
            <IonGrid>
                <IonRow className='content-data content-data-size'>
                    <IonCol sizeXl='12' sizeLg='12' sizeMd='12' sizeSm='12' sizeXs='12'>
                        {user && <div style={{ textAlign: "center", fontFamily: "Comic Sans MS" }}>
                            <img src={user.profileImage ? user.profileImage : './assets/images/user-default.svg'} width={200} className={'profile-image'} alt={`user-image-${user?._id}`} />
                            <h3>Nombre: <b style={{ color: 'var(--ion-color-primary)'}}>{user.name} {user.lastName}</b></h3>
                            <h3>Acceso a plataforma: <b style={{ color: 'var(--ion-color-primary)'}}>{user.premium ? 'Premium' : 'Free'}</b></h3>
                        </div>}
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}

export default UserContainer
