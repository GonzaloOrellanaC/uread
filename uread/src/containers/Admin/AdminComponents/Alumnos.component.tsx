import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert } from "@ionic/react"
import { arrowBack, arrowUp } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import userRouter from "../../../router/user.router"

export const AlumnosAdminPage = () => {
    const [presentAlert] = useIonAlert()
    const [alumnos, setAlumnos] = useState<any[]>([])

    const history = useHistory()

    useEffect(() => {
        leerAlumnos()
    }, [])

    const validarAlumno = async (alumno: any) => {
        const response = await userRouter.editarAlumno({...alumno, permiteValidar: true})
        console.log(response.alumno)
        const alumnosEditados = [...alumnos].map(a => {
            if (a._id === response.alumno._id) {
                const newAlumno = {
                    ...a,
                    permiteValidar: response.alumno.permiteValidar
                }
                return newAlumno
            } else {
                return a
            }
        })
        presentAlert({
            header: 'Aviso!',
            message: `Alumno ${alumno.name} ${alumno.lastName} ya puede ser elevado por apoderad@`,
            buttons: [
                {
                    text: 'Ok',
                    handler: () => {
                        setAlumnos(alumnosEditados)
                    }
                }
            ],
        })
    }

    const leerAlumnos = async () => {
        const response = await userRouter.todosLosAlumnos()
        setAlumnos(response.alumnos)
    }

    return (
        <IonPage>
            <IonContent class="ion-padding">
                <IonHeader class="no-lines">
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton onClick={() => {
                                history.goBack()
                            }}>
                                <IonIcon icon={arrowBack}></IonIcon>
                            </IonButton>
                        </IonButtons>
                        <IonTitle slot="start">
                            Alumnos
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonGrid>
                    <IonRow>
                        <IonCol />
                        <IonCol sizeXl="6" sizeLg="6" sizeMd="8" sizeSm="10" sizeXs="12" style={{padding: 0}}>
                            <IonGrid style={{padding: 0, fontSize: 11}}>
                                <IonRow style={{padding: 0}}>
                                    <IonCol size="1">
                                        
                                    </IonCol>
                                    <IonCol size="2">
                                        <div style={{textAlign: 'center', width: '100%'}}>
                                            <p>Nombre</p>
                                        </div>
                                    </IonCol>
                                    <IonCol size="2">
                                        <div style={{textAlign: 'center', width: '100%'}}>
                                            <p>Apellido</p>
                                        </div>
                                    </IonCol>
                                    <IonCol size="2">
                                        <div style={{textAlign: 'center', width: '100%'}}>
                                            <p>Plan</p>
                                        </div>
                                    </IonCol>
                                    <IonCol size="2">
                                        <div style={{textAlign: 'center', width: '100%'}}>
                                            <p>Nivel</p>
                                        </div>
                                    </IonCol>
                                    <IonCol size="2">
                                        <div style={{textAlign: 'center', width: '100%'}}>
                                            <p>Nivel</p>
                                        </div>
                                    </IonCol>
                                    <IonCol>
                                        <div style={{textAlign: 'left', width: '100%'}}>
                                            <p>Acciones</p>
                                        </div>
                                    </IonCol>
                                </IonRow>
                                <div style={{height: 'calc(100vh - 200px)', overflowY: 'auto'}}>
                                    {
                                        alumnos.map((alumno, index) => {
                                            return (
                                                <IonRow key={index} style={{borderBottom: '1px #ccc solid'}}>
                                                    <IonCol size="1">
                                                        <img src={'/assets/images/user-profile-default.svg'} style={{maxHeight: 20, maxWidth: 20, borderRadius: '50%'}} />
                                                    </IonCol>
                                                    <IonCol size="2">
                                                        <div style={{textAlign: 'center', width: '100%'}}>
                                                            <p>{alumno.name}</p>
                                                        </div>
                                                    </IonCol>
                                                    <IonCol size="2">
                                                        <div style={{textAlign: 'center', width: '100%'}}>
                                                            <p>{alumno.lastName}</p>
                                                        </div>
                                                    </IonCol>
                                                    <IonCol size="2">
                                                        <div style={{textAlign: 'center', width: '100%'}}>
                                                            <p>{alumno.plan}</p>
                                                        </div>
                                                    </IonCol>
                                                    <IonCol size="2">
                                                        <div style={{textAlign: 'center', width: '100%'}}>
                                                            <p>{alumno.levelUser.name}</p>
                                                        </div>
                                                    </IonCol>
                                                    <IonCol size="2">
                                                        <div style={{textAlign: 'center', width: '100%'}}>
                                                            <p>{(alumno.apoderado && alumno.apoderado.name) ? `${alumno.apoderado.name} ${alumno.apoderado.lastName}` : 'No informado'}</p>
                                                        </div>
                                                    </IonCol>
                                                    <IonCol>
                                                        <IonButtons>
                                                            {!alumno.permiteValidar ? <IonButton title="Validar Alumno" onClick={() => {
                                                                validarAlumno(alumno)
                                                            }}>
                                                                <IonIcon icon={arrowUp} />
                                                            </IonButton> : <IonButton disabled>OK!</IonButton>}
                                                        </IonButtons>
                                                    </IonCol>
                                                </IonRow>
                                            )
                                        })
                                    }
                                </div>
                            </IonGrid>
                        </IonCol>
                        <IonCol />
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}