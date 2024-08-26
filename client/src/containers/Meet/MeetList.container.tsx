import { IonCol, IonContent, IonGrid, IonItem, IonList, IonRow } from "@ionic/react"
import { useState } from "react"
import { useHistory } from "react-router"

export const MeetListContainer = () => {
    const [meetList, setMeetList] = useState([{
        id: 'skdbjclsncowbcjwnclsec',
        name: 'Test meet'
    }])

    const history = useHistory()

    return (
        <IonContent className='page-container'>
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <div style={{borderRight: '1px solid #ccc', height: '80vh'}}>
                            <IonList>
                                {
                                    meetList.map((meet, index) => {
                                        return (
                                            <IonItem button key={`${meet.name}_${meet.id}`} onClick={() => {
                                                history.push(`/meet/${meet.id}`)
                                                /* window.open(`/meet/${meet.id}`,'winname', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=w, height=h, top=top, left=left'); */
                                            }}>
                                                {meet.name}
                                            </IonItem>
                                        )
                                    })
                                }
                            </IonList>
                        </div>
                    </IonCol>
                    <IonCol>
                        
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}