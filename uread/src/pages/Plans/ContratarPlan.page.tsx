import { IonAccordion, IonAccordionGroup, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonPage, IonRippleEffect, IonRow, IonSelect, IonSelectOption, IonToolbar } from "@ionic/react"
import { arrowBack } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

export const ContartarPlanPage = () => {
    const params: any = useParams()

    const [idPlan, setIdPlan] = useState()

    useEffect(() => {
        if (params) {
            setIdPlan(params.idPlan)
        }
    }, [params])

    return (
        <IonPage>
            <IonContent class="ion-padding">
                <IonToolbar>
                    <IonButtons>
                        <IonButton href="https://uread.cl/wp/#planes">
                            <IonIcon icon={arrowBack}></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
                <div style={{height: 'calc(100vh - 93px)', overflowY: 'auto'}}>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <h2>Contrata tu plan {idPlan}</h2>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol sizeXl="3" sizeLg="4" sizeMd="6" sizeSm="12" sizeXs="12">
                                <div style={{width: '100%', padding: 10, textAlign: 'center'}}>
                                    <img src={`/assets/plans/${idPlan}.jpg`} style={{width: '70%'}} />
                                </div>
                            </IonCol>
                            <IonCol sizeXl="9" sizeLg="8" sizeMd="6" sizeSm="12" sizeXs="12">
                                <div style={{width: '100%', maxWidth: 400}}>
                                    <h3>Formulario de contratación</h3>
                                    <p>Datos del Alumno o Alumna</p>
                                    <IonItem>
                                        <IonInput label="Nombre" labelPlacement="floating"/>
                                    </IonItem>
                                    <IonItem>
                                        <IonInput label="Apellido" labelPlacement="floating"/>
                                    </IonItem>
                                    <IonItem>
                                        <IonSelect label="Año académico" labelPlacement="floating">
                                            {
                                                (idPlan === 'A' || idPlan === 'B') && <>
                                                <IonSelectOption value={'1'}>
                                                    1° Básico
                                                </IonSelectOption>
                                                <IonSelectOption value={'2'}>
                                                    2° Básico
                                                </IonSelectOption>
                                                <IonSelectOption value={'3'}>
                                                    3° Básico
                                                </IonSelectOption>
                                                <IonSelectOption value={'4'}>
                                                    4° Básico
                                                </IonSelectOption>
                                                </>
                                            }
                                            {
                                                (idPlan === 'A' || idPlan === 'C') && <>
                                                <IonSelectOption value={'5'}>
                                                    5° Básico
                                                </IonSelectOption>
                                                <IonSelectOption value={'6'}>
                                                    6° Básico
                                                </IonSelectOption>
                                                <IonSelectOption value={'7'}>
                                                    7° Básico
                                                </IonSelectOption>
                                                <IonSelectOption value={'8'}>
                                                    8° Básico
                                                </IonSelectOption>
                                                </>
                                            }
                                        </IonSelect>
                                    </IonItem>
                                    <p>Datos del Apoderado o Apoderada</p>
                                    <IonItem>
                                        <IonInput label="Nombre" labelPlacement="floating"/>
                                    </IonItem>
                                    <IonItem>
                                        <IonInput label="Apellido" labelPlacement="floating"/>
                                    </IonItem>
                                    <p>Datos de pago</p>
                                    <IonItem>
                                        <IonInput label="Nombre y apellido de quien paga" labelPlacement="floating"/>
                                    </IonItem>
                                    <IonItem>
                                        <IonInput label="Correo electrónico" labelPlacement="floating"/>
                                    </IonItem>
                                    <IonItemDivider />
                                    <h3>Seleccione medio de pago</h3>
                                    <IonAccordionGroup>
                                        <IonAccordion value="first">
                                            <IonItem slot="header" color="light">
                                                <IonLabel>Pago con Débito o Crédito</IonLabel>
                                            </IonItem>
                                            <div className="ion-padding" slot="content">
                                                <button className="webpay-button">
                                                    <img src={'/assets/plans/webpay_logo.png'} style={{maxWidth: 100}} />
                                                </button>
                                            </div>
                                        </IonAccordion>
                                        <IonAccordion value="second">
                                            <IonItem slot="header" color="light">
                                                <IonLabel>Transferencia bancaria</IonLabel>
                                            </IonItem>
                                            <div className="ion-padding" slot="content">
                                            Second Content
                                            </div>
                                        </IonAccordion>
                                    </IonAccordionGroup>
                                </div>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
            </IonContent>
        </IonPage>
    )
}