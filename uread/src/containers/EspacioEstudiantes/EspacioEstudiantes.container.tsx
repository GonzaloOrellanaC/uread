import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { arrowBack } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { useAuthContext } from "../../context/Auth.context"
import classroomRouter from "../../router/classroom.router"

export const EspacioEstudiantesContainer = () => {
    const history = useHistory()

    const {userData} = useAuthContext()

    const [classRooms, setClassRooms] = useState<any[]>([])

    useEffect(() => {
        if (userData && userData.plan && userData.levelUser) {
            console.log(userData)
            leerMisClassrooms(userData.levelUser.number, userData.plan)
        }
    }, [userData])

    const leerMisClassrooms = async (nivel: number, plan: string) => {
        const response = await classroomRouter.obteneClassroomsPorNivelPlan(plan, nivel)
        console.log(response)
        setClassRooms(response.list)
    }


    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons>
                        <IonButton onClick={() => {history.goBack()}}>
                            <IonIcon icon={arrowBack} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding">
                <IonGrid>
                    <IonRow>
                        <IonCol />
                        <IonCol sizeXl="3" sizeLg="4" sizeMd="6" sizeSm="10" sizeXs="12">
                            <div style={{marginTop: 50, textAlign: 'center'}}>
                                <IonTitle>Accesos a tus servicios:</IonTitle>
                                <div style={{textAlign: 'left'}}>
                                    <h2 style={{margin: '10px 0px'}}>Classrooms</h2>
                                    {
                                        classRooms.map((c, i) => {
                                            return (
                                                <IonRow>
                                                    <IonCol size="6">
                                                        {c.name}
                                                    </IonCol>
                                                    <IonCol size="6">
                                                        <IonButton href={c.url} target={'_blank'}>
                                                            Link
                                                        </IonButton>
                                                    </IonCol>
                                                </IonRow>
                                            )
                                        })
                                    }
                                    {
                                        userData && (userData.plan === 'B' || userData.plan === 'C') && <div>
                                                <h2 style={{margin: '10px 0px'}}>Videoconferencia en vivo</h2>

                                                <IonButton href={userData.plan === 'B' ? 'https://meet.google.com/jpk-vwjg-den' : userData.plan === 'C' ? 'https://meet.google.com/jxc-byes-ppg' : ''}>
                                                    Abrir Google Meet
                                                </IonButton>

                                            </div>
                                    }
                                    {
                                        userData && userData.plan && <div>
                                                <h2 style={{margin: '10px 0px'}}>Grupo de WhatsApp</h2>

                                                <IonButton href={userData.plan === 'A' ? 'https://chat.whatsapp.com/ByLIPtrcgUg6BkRI8m3PvB' : 'https://chat.whatsapp.com/ECIvsT5pGJtA6YvXTCAMtb'}>
                                                    Solicitar ingresar al grupo
                                                </IonButton>

                                            </div>
                                    }

                                </div>
                            </div>
                        </IonCol>
                        <IonCol />
                    </IonRow>
                    
                </IonGrid>
            </IonContent>
        </>
    )
}