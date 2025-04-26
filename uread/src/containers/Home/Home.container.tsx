import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonIcon, IonRow, IonTitle, IonToolbar } from '@ionic/react'
import { UseUreadContainer } from '../../components/Containers'
import { useAuthContext } from '../../context/Auth.context'
import { useHistory, useLocation } from 'react-router'
import { exitOutline, menu, notifications, person } from 'ionicons/icons'
import { menuController } from '@ionic/core/components';
import { useNotificacionesContext } from '../../context/Notificaciones.context'
import { useUsersContext } from '../../context/Users.context'

const HomeContainer = () => {
    const {isAdmin, userData, setUserData, alumno, apoderado, profesor} = useAuthContext()
    const {totalNuevasNotificaciones} = useNotificacionesContext()
    const {alumnos} = useUsersContext()
    const history = useHistory()
    const location = useLocation()

    const openMenu = async () => {
        if (
            location.pathname.includes('login') ||
            location.pathname.includes('restore-password') ||
            location.pathname.includes('reset-password') ||
            location.pathname.includes('validate-password') ||
            location.pathname.includes('plan') ||
            location.pathname.includes('bienvenida')
        ) {
            console.log('No menu')
        } else {
            await menuController.open('menu-home')
        }
    }

    return (
        <IonContent>
            <IonToolbar>
                <IonButtons slot='start'>
                    <IonButton onClick={openMenu}>
                        <IonIcon icon={menu} />
                    </IonButton>
                </IonButtons>
                <h5 slot='start'>
                    Bienvenid@ {userData?.name}
                </h5>
                <IonButtons slot={'end'}>
                    <IonButton style={{position: 'relative'}} onClick={() => {
                        history.push('/notifications')
                    }}>
                        <IonIcon icon={notifications}/>
                        {
                            totalNuevasNotificaciones > 0
                            &&
                            <div style={{backgroundColor: 'red', color: 'white', position: 'absolute', padding: 3, top: 0, right: 0, borderRadius: '50%', fontSize: 8}}>
                                {totalNuevasNotificaciones}
                            </div>
                        }
                    </IonButton>
                </IonButtons>
            </IonToolbar>
                <IonGrid>
                    {isAdmin || apoderado && <IonRow>

                        <IonCol />
                        <IonCol sizeXl='8' sizeLg='10' sizeMd='12' sizeSm='12' sizeXs='12'>
                        <div className="dashboard-container" style={{marginTop: 10, marginBottom: 10}}>
                            {
                                apoderado &&
                                <div>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol>
                                                <h3>Alumnos</h3>
                                                {
                                                    alumnos.map((alumno: any) => {
                                                        return (
                                                            <IonCard key={alumno._id} style={{
                                                                
                                                            }}>
                                                                <IonRow style={{backgroundColor: alumno.pendientePago ? '#f6d5ff' : 'white'}}>
                                                                    <IonCol size='2' style={{textAlign: 'center'}}>
                                                                    <p><IonIcon icon={person} size={'large'} /></p>
                                                                    </IonCol>
                                                                    <IonCol size='8'>
                                                                        <IonRow>
                                                                            <IonCol sizeXl='1.5' sizeLg='2' sizeMd='4' sizeSm='6' sizeXs='12'>
                                                                                <p style={{margin: '3px 0px'}}>Nombre:</p>
                                                                            </IonCol>
                                                                            <IonCol size='auto'>
                                                                                <p style={{margin: '3px 0px'}}> <strong>{alumno.name} {alumno.lastName}</strong></p>
                                                                            </IonCol>
                                                                        </IonRow>
                                                                        <IonRow>
                                                                            <IonCol sizeXl='1.5' sizeLg='2' sizeMd='4' sizeSm='6' sizeXs='12'>
                                                                                <p style={{margin: '3px 0px'}}>Plan:</p>
                                                                            </IonCol>
                                                                            <IonCol size='auto'>
                                                                                <p style={{margin: '3px 0px'}}> <strong>{alumno.plan}</strong></p>
                                                                            </IonCol>
                                                                        </IonRow>
                                                                        <IonRow>
                                                                            <IonCol sizeXl='1.5' sizeLg='2' sizeMd='4' sizeSm='6' sizeXs='12'>
                                                                                <p style={{margin: '3px 0px'}}>Prox. Pago:</p>
                                                                            </IonCol>
                                                                            <IonCol size='auto'>
                                                                                <p style={{margin: '3px 0px'}}> <strong>{alumno.fechaProximoPago ? new Date(alumno.fechaProximoPago).toLocaleDateString() : 'No disponible'}</strong></p>
                                                                            </IonCol>
                                                                        </IonRow>
                                                                    </IonCol>
                                                                    <IonCol size='2' style={{textAlign: 'center'}}>
                                                                        {
                                                                            alumno.pendientePago && <div style={{
                                                                                fontSize: 12
                                                                            }}>
                                                                                <IonButton href='https://www.webpay.cl/form-pay/192335' target='_blank' style={{width: '100%'}}>
                                                                                    Pagar
                                                                                </IonButton>
                                                                                <h3><strong>Valor: ${alumno.plan === 'A' ? '3.000' : alumno.plan === 'B' ? '6.000' : '15.000'}</strong></h3>
                                                                                <p><strong>Nota:</strong></p>
                                                                                <p><strong>Este botón se mantendrá hasta que el pago sea validado. Si usted ya pagó, han pasado más de 48 hrs y el botón sigue apareciendo, contáctenos al Whatsapp que está en el menú de la aplicación.</strong></p>
                                                                            </div>
                                                                        }
                                                                    </IonCol>
                                                                </IonRow>
                                                                
                                                            </IonCard>
                                                        )       
                                                    })
                                                }
                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </div>
                            }
                            {
                                isAdmin &&
                                <div>
                                    <h2>Hola Administrador</h2>
                                    <p>Dashboard disponible próximamente</p>
                                </div>
                            }
                        </div>
                        </IonCol>
                        <IonCol />
                    </IonRow>}
                    <IonRow>
                        <IonCol sizeXl='4' sizeLg='3.5' sizeMd='2' sizeSm='1' sizeXs='0'>

                        </IonCol>
                        <IonCol sizeXl='4' sizeLg='5' sizeMd='8' sizeSm='10' sizeXs='12'>
                            <IonRow>
                                <IonCol sizeLg='6' sizeXs='12'>
                                    <div style={{height: '15vh'}}>
                                        <IonButton onClick={() => {history.push('/library')}} style={{height: '100%', width: '100%'}}>
                                            Biblioteca
                                        </IonButton>
                                    </div>
                                </IonCol>
                                <IonCol sizeLg='6' sizeXs='12'>
                                    <div style={{height: '15vh'}}>
                                        <IonButton onClick={() => {history.push('/admin')}} disabled={!isAdmin || alumno || profesor || apoderado} style={{height: '100%', width: '100%'}}>
                                            Administración
                                        </IonButton>
                                    </div>
                                </IonCol>
                                <IonCol sizeLg='6' sizeXs='12'>
                                    <div style={{height: '15vh'}}>
                                        <IonButton onClick={() => {history.push('/alumnos')}} disabled={alumno} style={{height: '100%', width: '100%'}}>
                                            Mis Alumnos
                                        </IonButton>
                                    </div>
                                </IonCol>
                                <IonCol sizeLg='6' sizeXs='12'>
                                    <div style={{height: '15vh'}}>
                                        <IonButton onClick={() => {history.push('/espacio-estudiantes')}} style={{height: '100%', width: '100%'}}>
                                            Espacio Estudiantes
                                        </IonButton>
                                    </div>
                                </IonCol>
                            </IonRow>
                        </IonCol>
                        <IonCol sizeXl='4' sizeLg='3.5' sizeMd='2' sizeSm='1' sizeXs='0'>
                            
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <div style={{marginTop: 10, width: '100%', textAlign: 'center', bottom: 0, left: 0}}>
                            <img src={'/assets/icon/uread/uread_logo_transparente.png'} width={40} alt="logo-uread" />
                        </div>
                    </IonRow>
                </IonGrid>
        </IonContent>
    )
}

export default HomeContainer
