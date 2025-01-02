import { DatetimeChangeEventDetail, IonButton, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonTextarea } from "@ionic/react"
import { close } from "ionicons/icons"
import { useEffect, useState } from "react"

export const CreateMeetingModal = ({isOpen, closeModal, date}: {isOpen: boolean, closeModal: () => void, date: string}) => {
    const [fecha, setFecha] = useState()
    const [hora, setHora] = useState()


    useEffect(() => {
        if (date) {
            
        }
    }, [date])


    return (
        <IonModal
            isOpen={isOpen}
            onIonModalDidDismiss={closeModal}
        >
            <div style={{position: 'relative', width: '100%', padding: 16}}>
                <button style={{position: 'absolute', top: 10, right: 10, backgroundColor: 'transparent', fontSize: 24}} onClick={closeModal}>
                    <IonIcon icon={close} />
                </button>
                <div style={{marginTop: 24, marginBottom: 24}}>
                    <IonList>
                        <IonItem>
                            <IonLabel position={'floating'}>
                                Título
                            </IonLabel>
                            <IonInput>

                            </IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position={'floating'}>
                                Descripción
                            </IonLabel>
                            <IonTextarea>

                            </IonTextarea>
                        </IonItem>
                        <IonItem button>
                            <IonLabel>
                                Usuarios
                            </IonLabel>
                        </IonItem>
                        <IonItem button>
                            <IonLabel>
                                Profesores
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel position={'floating'}>
                                URL
                            </IonLabel>
                            <IonInput>

                            </IonInput>
                        </IonItem>
                    </IonList>
                </div>
                <IonButton expand={'block'}>
                    Crear Reunión
                </IonButton>
            </div>
        </IonModal>
    )
}