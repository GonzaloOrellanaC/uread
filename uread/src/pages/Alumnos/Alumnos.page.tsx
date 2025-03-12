import { IonBackButton, IonButton, IonButtons, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { AlumnosContainer } from "../../containers/Alumnos/Alumnos.container"
import { arrowBack } from "ionicons/icons"

export const AlumnosPage = () => {
    return (
        <IonPage>
            <AlumnosContainer />
        </IonPage>
    )
}