import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonToolbar } from "@ionic/react"
import { useNotificacionesContext } from "../../context/Notificaciones.context"
import { arrowBack } from "ionicons/icons"
import { useHistory } from "react-router"

export const NotificacionesPage = () => {
    const {notificaciones, setNotificaciones, setNotificacionSeleccionada} = useNotificacionesContext()
    const history = useHistory()

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot={'start'}>
                        <IonButton onClick={() => {
                            history.goBack()
                        }}>
                            <IonIcon icon={arrowBack} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding">
                <IonGrid>
                    <IonRow>
                        <IonCol />
                        <IonCol sizeXl="6" sizeLg="6" sizeMd="8" sizeSm="10" sizeXs="12">
                            {
                                notificaciones.map((n, index) => {
                                    return (
                                        <IonRow key={index}
                                            style={{
                                                borderBottom: '1px solid #ccc',
                                                cursor: 'pointer',
                                                backgroundColor: n.viwed ? 'white' : '#f5dafd',
                                                padding: 10
                                            }} onClick={() => {
                                            setNotificacionSeleccionada(n)
                                        }}>
                                            <IonCol sizeXl="12" sizeLg="12" sizeMd="12" sizeSm="12" sizeXs="12">
                                                <h3 style={{margin: '5px 0px', textAlign: 'justify'}}>{n.title}</h3>
                                            </IonCol>
                                            <IonCol sizeXl="12" sizeLg="12" sizeMd="12" sizeSm="12" sizeXs="12">
                                                <h5 style={{margin: '5px 0px', textAlign: 'justify'}}>{n.detail}</h5>
                                            </IonCol>
                                            <IonCol sizeXl="12" sizeLg="12" sizeMd="12" sizeSm="12" sizeXs="12">
                                                <p style={{margin: '5px 0px', textAlign: 'right', color: '#ccc', fontSize:10}}>
                                                    {
                                                        n.viwed ?
                                                        `Visto ${new Date(n.viwed).toLocaleDateString()}`
                                                        :
                                                        'Presiona para ver más detalles.'
                                                    }
                                                </p>
                                            </IonCol>
                                        </IonRow>
                                    )
                                })
                            }
                        </IonCol>
                        <IonCol />
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}