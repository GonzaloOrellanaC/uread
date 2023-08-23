import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonRow, IonTextarea } from '@ionic/react'

const ContactUsContainer = () => {
    return (
        <IonContent>
            <IonGrid>
                <IonRow className='content-data content-data-size'>
                <IonCol size='2'></IonCol>
                <IonCol size='8'>
                    <div className='content-data-col'>
                        <div
                            /* className='conten-levels-data' */
                            style={
                                {
                                    width: '100%',
                                    textAlign: 'center'
                                }
                            }
                        >
                            <h2>
                                Contáctanos / Contact us
                            </h2>
                            <IonGrid>
                                <IonRow>
                                    <IonCol sizeXl='2' sizeLg='2' sizeMd='0'></IonCol>
                                    <IonCol sizeXl='8' sizeLg='8' sizeMd='12'>
                                        <IonItem
                                            fill={'outline'}
                                            lines={'none'}
                                            color={'primary'}
                                            style={{ backgroundColor: '#E6D3FF'}}
                                        >
                                            <IonLabel position="stacked" color={'primary'}>Nombe*</IonLabel>
                                            <IonInput
                                                type={'text'}
                                                color={'primary'}
                                            />
                                        </IonItem>
                                        <br />
                                        <IonItem
                                            fill={'outline'}
                                            lines={'none'}
                                            color={'primary'}
                                            style={{ backgroundColor: '#E6D3FF'}}
                                        >
                                            <IonLabel position="stacked" color={'primary'}>Correo electrónico*</IonLabel>
                                            <IonInput
                                                type={'text'}
                                                color={'primary'}
                                            />
                                        </IonItem>
                                        <br />
                                        <IonItem
                                            fill={'outline'}
                                            lines={'none'}
                                            color={'primary'}
                                            style={{ backgroundColor: '#E6D3FF'}}
                                        >
                                            <IonLabel position="stacked" color={'primary'}>Mensaje*</IonLabel>
                                            <IonTextarea
                                                rows={3}
                                                color={'primary'}
                                            />
                                        </IonItem>
                                        <br />
                                        <IonButton expand={'block'}>
                                            Enviar Mensaje
                                        </IonButton>
                                    </IonCol>
                                    <IonCol sizeXl='2' sizeLg='2' sizeMd='0'></IonCol>
                                </IonRow>
                            </IonGrid>
                        </div>
                    </div>
                </IonCol>
                <IonCol size='2'></IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}

export default ContactUsContainer
