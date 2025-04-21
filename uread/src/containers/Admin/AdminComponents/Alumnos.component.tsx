import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert } from "@ionic/react"
import { arrowBack, arrowUp } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import userRouter from "../../../router/user.router"
import { useUsersContext } from "../../../context/Users.context"

export const AlumnosAdminPage = () => {
    const {historialPagosAlumno} = useUsersContext()
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

    const validarPago = async (alumno: any) => {
        const response = await userRouter.editarAlumnoFechaPago(alumno.pagos._id, new Date())
        console.log(response)
        leerAlumnos()

    }

    const leerAlumnos = async () => {
        const response = await userRouter.todosLosAlumnos()
        const alumnosCache = await Promise.all(response.alumnos.map(async (user : any) => {
            const response = await historialPagosAlumno(user._id)
            if (response.pagos !== null) {
                const proximoPago = new Date(response.pagos.fechasPago[response.pagos.fechasPago.length - 1]).getTime()
                const fechaTope = proximoPago + (((60000 * 60) * 24) * 15)
                const hoy = Date.now()
                user.pendientePago = (proximoPago < hoy)
                if (user.pendientePago) {
                    user.fechaTope = new Date(fechaTope)
                    user.pagos = response.pagos
                }
                return user
            } else {
                user.pendientePago = false
                return user
            }
        }))
        setAlumnos(alumnosCache)
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
                        <IonCol sizeXl="6" sizeLg="6" sizeMd="8" sizeSm="10" sizeXs="12">
                            <IonGrid style={{padding: 0, fontSize: 11}}>
                                {/* <IonRow style={{padding: 0}}>
                                    <IonCol sizeXl="2" sizeLg="2" sizeMd="3" sizeSm="12" sizeXs="12">
                                        
                                    </IonCol>
                                    <IonCol sizeXl="2" sizeLg="2" sizeMd="3" sizeSm="6" sizeXs="6">
                                        <div style={{textAlign: 'center', width: '100%'}}>
                                            <p>Nombre</p>
                                        </div>
                                    </IonCol>
                                    <IonCol sizeXl="2" sizeLg="2" sizeMd="3" sizeSm="6" sizeXs="6">
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
                                            <p>Apoderad@</p>
                                        </div>
                                    </IonCol>
                                    <IonCol>
                                        <div style={{textAlign: 'left', width: '100%'}}>
                                            <p>Acciones</p>
                                        </div>
                                    </IonCol>
                                </IonRow> */}
                                <div style={{height: 'calc(100vh - 200px)', width: '100%', overflowY: 'auto'}}>
                                    {
                                        alumnos.map((alumno, index) => {
                                            return (
                                                <IonRow key={index} style={{borderBottom: '1px #ccc solid'}}>
                                                    <IonCol sizeXl="1" sizeLg="1" sizeMd="3" sizeSm="12" sizeXs="12" style={{textAlign: 'center'}}>
                                                        <img src={'/assets/images/user-profile-default.svg'} style={{maxHeight: 20, maxWidth: 20, borderRadius: '50%'}} />
                                                    </IonCol>
                                                    <IonCol sizeXl="1.5" sizeLg="1.5" sizeMd="3" sizeSm="4" sizeXs="4">
                                                        <div style={{textAlign: 'center', width: '100%'}}>
                                                            <p>{alumno.name}</p>
                                                        </div>
                                                    </IonCol>
                                                    <IonCol sizeXl="1.5" sizeLg="1.5" sizeMd="3" sizeSm="4" sizeXs="4">
                                                        <div style={{textAlign: 'center', width: '100%'}}>
                                                            <p>{alumno.lastName}</p>
                                                        </div>
                                                    </IonCol>
                                                    <IonCol sizeXl="1" sizeLg="1" sizeMd="3" sizeSm="4" sizeXs="4">
                                                        <div style={{textAlign: 'center', width: '100%'}}>
                                                            <p>{alumno.plan}</p>
                                                        </div>
                                                    </IonCol>
                                                    <IonCol sizeXl="1" sizeLg="1" sizeMd="4" sizeSm="6" sizeXs="6">
                                                        <div style={{textAlign: 'center', width: '100%'}}>
                                                            <p>{alumno.levelUser.name}</p>
                                                        </div>
                                                    </IonCol>
                                                    <IonCol sizeXl="2" sizeLg="2" sizeMd="4" sizeSm="6" sizeXs="6">
                                                        <div style={{textAlign: 'center', width: '100%'}}>
                                                            <p>{(alumno.apoderado && alumno.apoderado.name) ? `${alumno.apoderado.name} ${alumno.apoderado.lastName}` : 'No informado'}</p>
                                                        </div>
                                                    </IonCol>
                                                    <IonCol sizeXl="1" sizeLg="1" sizeMd="12" sizeSm="12" sizeXs="12">
                                                        <div style={{textAlign: 'center', width: '100%'}}>
                                                            <p>
                                                                {
                                                                    alumno.pendientePago ? 'Pendiente' : 'S/O'
                                                                }
                                                            </p>
                                                            {
                                                                alumno.fechaTope &&
                                                                <p>
                                                                   Tope: {new Date(alumno.fechaTope).toLocaleDateString()}
                                                                </p>
                                                            }
                                                        </div>
                                                    </IonCol>
                                                    <IonCol sizeXl="2" sizeLg="2" sizeMd="12" sizeSm="12" sizeXs="12" style={{textAlign: 'center'}}>
                                                    {!alumno.permiteValidar ? <IonButton title="Validar Alumno" onClick={() => {
                                                        validarAlumno(alumno)
                                                    }}>
                                                        <IonIcon icon={arrowUp} />
                                                    </IonButton> : <IonButton disabled>OK!</IonButton>}
                                                    {
                                                        alumno.pendientePago &&
                                                        <IonButton onClick={() => {validarPago(alumno)}}>
                                                            Validar Pago
                                                        </IonButton>
                                                    }
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