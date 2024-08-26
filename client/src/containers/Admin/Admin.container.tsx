import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonRouterOutlet, IonRow, IonToolbar } from '@ionic/react'
import { useEffect, useState } from 'react'
import { Route, useHistory } from 'react-router'
import { ButtonAdmin } from '../../interfaces/Admin.interface'
import SubirContenidoComponent from './AdminComponents/SubirContenido.component'
import UserAdminComponent from './AdminComponents/UserAdmin.component'
import { arrowBack } from 'ionicons/icons'

const AdminContainer = () => {
    const history = useHistory()
    const [buttons, setButtons] = useState<ButtonAdmin[]>([])
    useEffect(() => {
        /* if (localStorage.getItem('user-uread')) { */
            const buttonsList: ButtonAdmin[] = [
                {
                    id: 0,
                    name: 'Inicio',
                    link: '',
                    state: true
                },
                {
                    id: 1,
                    name: 'Usuarios',
                    link: 'usuarios',
                    state: false
                },
                {
                    id: 2,
                    name: 'Subir contenido',
                    link: 'subir-contenido',
                    state: false
                }/* ,
                {
                    id: 2,
                    name: 'Pagos',
                    link: '/pagos'
                } */
            ]
            detectUrl(buttonsList)
        /* } else {
            history.replace('/')
        } */
    }, [])
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
        const buttonsCacheList = [...buttons]
        buttonsCacheList.map(button => {
            button.state = false
        })
        buttonsCacheList[index].state = true
        setButtons(buttonsCacheList)
        history.push(`/admin/${button.link}`)
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
                    {/* <IonCol>
                        
                    </IonCol> */}
                    <IonCol size='10'>
                        <div className='admin-container'>
                            <IonRouterOutlet style={{ height: 'calc(100vh - 65px)' }}>
                                <Route exact path='/admin'>
                                    <h2>
                                        Seleccione acción
                                    </h2>
                                </Route>
                                <Route exact path='/admin/usuarios'>
                                    <UserAdminComponent />
                                </Route>
                                <Route exact path='/admin/subir-contenido'>
                                    <SubirContenidoComponent />
                                </Route>
                            </IonRouterOutlet>
                        </div>
                    </IonCol>
                    <IonCol size='2'>
                        <div className='button-list'>
                            <h3>Navegación</h3>
                            {
                                buttons.map((button, index) => {
                                    return (
                                        <div key={index} className='button-container'>
                                            <a className={button.state ? 'link-activated' : 'link-desactivated'} onClick={() => {selectIndex(button, index)}}>{button.name}</a>
                                            <br />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}

export default AdminContainer
