import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonIcon, IonRow, IonTitle, IonToolbar } from '@ionic/react'
import { UseUreadContainer } from '../../components/Containers'
import { useAuthContext } from '../../context/Auth.context'
import { useHistory } from 'react-router'
import { exitOutline } from 'ionicons/icons'

const HomeContainer = () => {
    const {isAdmin, userData, setUserData, alumno, apoderado, profesor} = useAuthContext()
    const history = useHistory()
    return (
        <IonContent>
            <IonToolbar>
                <IonButtons slot='end'>
                    <IonButton onClick={() => {
                        history.replace('/login');
                        setUserData(undefined);
                        localStorage.clear()
                    }}>
                        <IonIcon icon={exitOutline} />
                    </IonButton>
                </IonButtons>
            </IonToolbar>
                <IonGrid>
                    <IonRow>
                        <IonCol sizeXl='4' sizeLg='3.5' sizeMd='2' sizeSm='1' sizeXs='0'>

                        </IonCol>
                        <IonCol sizeXl='4' sizeLg='5' sizeMd='8' sizeSm='10' sizeXs='12'>
                            <IonTitle>
                                Bienvenid@ {userData?.name}
                            </IonTitle>
                        </IonCol>
                        <IonCol sizeXl='4' sizeLg='3.5' sizeMd='2' sizeSm='1' sizeXs='0'>
                            
                        </IonCol>
                    </IonRow>
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
