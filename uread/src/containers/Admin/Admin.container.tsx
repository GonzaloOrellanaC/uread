import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonRouterOutlet, IonRow, IonToolbar } from '@ionic/react'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ButtonAdmin } from '../../interfaces/Admin.interface'
import SubirContenidoComponent from './AdminComponents/SubirContenido.component'
import UserAdminComponent from './AdminComponents/UserAdmin.component'
import { arrowBack } from 'ionicons/icons'
import { CalendarComponent } from './AdminComponents/Calendar.component'

const AdminContainer = () => {
    const history = useHistory()
    const [buttons, setButtons] = useState<ButtonAdmin[]>([
        {
            id: 1,
            name: 'Usuarios',
            link: 'usuarios',
            state: false,
            enable: true
        },
        {
            id: 2,
            name: 'Subir contenido',
            link: 'subir-contenido',
            state: false,
            enable: true
        },
        {
            id: 3,
            name: 'Subir contenido V2',
            link: 'subir-contenido-v2',
            state: false,
            enable: true
        },
        {
            id: 4,
            name: 'Calendario',
            link: 'calendario',
            state: false,
            enable: true
        },
        {
            id: 5,
            name: 'ClassRoomEdit',
            link: 'classroom-edit',
            state: false,
            enable: true
        }
    ])
    const detectUrl = (buttons_: ButtonAdmin[]) => {
        console.log(history.location)
        const location = history.location
        const buttonsCacheList = [...buttons_]
        let index = 0
        buttonsCacheList.forEach((button, number) => {
            button.state = false
            if (location.pathname.includes(button.link)) {
                index = number
            }
        })
        buttonsCacheList[index].state = true
        setButtons(buttonsCacheList)
    }
    const selectIndex = (button: ButtonAdmin, index: number) => {
        /* const buttonsCacheList = [...buttons]
        buttonsCacheList.map(button => {
            button.state = false
        })
        buttonsCacheList[index].state = true
        setButtons(buttonsCacheList) */
        history.push(`/${button.link}`)
    }
    return (
        <IonContent>
            <IonToolbar>
                <IonButtons>
                    <IonButton onClick={()=>{history.goBack()}}>
                        <IonIcon icon={arrowBack} />
                    </IonButton>
                </IonButtons>
            </IonToolbar>
            <IonGrid>
                <IonRow>
                    <IonCol>
                        
                    </IonCol>
                    <IonCol sizeXs='12' sizeSm='12' sizeMd='8' sizeLg='4' sizeXl='3'>
                        <div className='button-list'>
                            <h3>Seleccione</h3>
                            {
                                buttons.map((button, index) => {
                                    return (
                                        <div>
                                            <IonButton expand={'block'} disabled={!button.enable} key={index} onClick={() => {selectIndex(button, index)}}>
                                                {button.name}
                                            </IonButton>
                                            <br />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </IonCol>
                    <IonCol>
                        
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}

export default AdminContainer
