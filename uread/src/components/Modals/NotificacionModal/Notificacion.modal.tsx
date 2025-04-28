import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonModal, IonToolbar } from "@ionic/react";
import { close } from "ionicons/icons";
import { useHistory } from "react-router";

export const NotificacionModal = ({open, handleClose, notificacion}: {open: boolean, handleClose: () => void, notificacion: any}) => {
    const history = useHistory()
    return (
                <IonModal
                    isOpen={open}
                    onWillDismiss={() => {handleClose()}}
                    backdropDismiss={false}
                    className='profile-management-modal'
                >
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons slot='end'>
                                <IonButton onClick={() => {handleClose()}}>
                                    <IonIcon icon={close} />
                                </IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent class="ion-padding">
                        <h3 style={{textAlign: 'justify'}}>
                            {notificacion.title}
                        </h3>
                        <h5 style={{textAlign: 'justify'}}>
                            {notificacion.detail}
                        </h5>
                        <p style={{textAlign: 'justify'}}>
                            {notificacion.longText}
                        </p>
                        {notificacion.viwed && <p style={{textAlign: 'right', color: '#ccc', fontSize: 10}}>
                            {new Date(notificacion.viwed).toLocaleDateString()}
                        </p>}
                        {notificacion.links.map((link: string, index: number) => {
                            return (
                                <div style={{width: '100%'}} key={index}>
                                    {
                                        link.includes('http')
                                        ?
                                        <IonButton expand={'full'} href={link} target={'_blank'}>
                                            {
                                                link.includes('webpay')
                                                ?
                                                'Pagar'
                                                :
                                                'Ir'
                                            }
                                        </IonButton>
                                        :
                                        <IonButton expand={'full'} onClick={() => {history.push(link); handleClose()}}>
                                            Ir
                                        </IonButton>
                                    }
                                </div>
                            )
                        })}
                    </IonContent>
                </IonModal>
    )
}