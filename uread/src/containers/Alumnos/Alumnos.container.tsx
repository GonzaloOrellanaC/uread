import { IonAlert, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonInputPasswordToggle, IonItem, IonModal, IonRadio, IonRow, IonTitle, IonToolbar, useIonAlert } from "@ionic/react"
import { useAuthContext } from "../../context/Auth.context"
import { useEffect, useState } from "react"
import { arrowBack, arrowUp, close } from "ionicons/icons"
import { useHistory } from "react-router"
import userRouter from "../../router/user.router"
import { useContenidoContext } from "../../context/Contenido.context"
import { useUsersContext } from "../../context/Users.context"

export const AlumnosContainer = () => {
    const [presentAlert] = useIonAlert()
    const history = useHistory()
    const {userData} = useAuthContext()
    const {setLoading} = useContenidoContext()

    const {alumnos, setAlumnos} = useUsersContext()


    /* const [alumnos, setAlumnos] = useState<any[]>([])
 */
    const [alumnoSeleccionado, setAlumnoSeleccionado] = useState<any>()

    const [openAlumnoModal, setOpenAlumnoModal] = useState(false)

    const [typePassword, setTypePassword] = useState<'password' | 'text'>('password')
    const [typePasswordConfirm, setTypePasswordConfirm] = useState<'password' | 'text'>('password')

    const [openAlertPlan, setOpenAlertPlan] = useState(false)

/*     useEffect(() => {
        if (userData)
            obtenerAlumnos()
    },[userData])

    const obtenerAlumnos = async () => {
        const response = await userRouter.alumnosPorApoderado(userData!._id)
        setAlumnos(response.alumnos)
    } */


    const seleccionarUsuario = (alumno: any) => {
        if (alumno.permiteValidar) {
            setAlumnoSeleccionado({
                ...alumno
            })
            setOpenAlumnoModal(true)
        } else {
            presentAlert({
                header: 'Aviso!',
                message: 'Estamos en proceso de validación de pago del alumno. Este proceso puede tardar máximo 24 hrs desde que se realizó el pago del plan.',
                buttons: [
                    {
                        text: 'Ok'
                    }
                ],
            })
        }
    }

    const editUsuario = (e: any) => {
        const value: string = e.target.value;
        const name: string = e.target.name;
        setAlumnoSeleccionado({
            ...alumnoSeleccionado,
            [name]: value
        })
    }

    const habilitarUsuarioDesdeAlumno = async () => {
        setLoading(true)
        try {
            const response = await userRouter.habilitarUsuarioDesdeAlumno(alumnoSeleccionado)
            setAlumnos(alumnos.map(alumno => {
                if (alumno._id === response.user._id) {
                    return response.user
                } else {
                    return alumno
                }
            }))
            alert('Alumno validado. Se ha enviado un correo electrónico para darle la bienvenida.')
            setOpenAlumnoModal(false)
        } catch (error: any) {
            console.error(error)
            if (error && error.response ) {
                const {response} = error
                if (response.data && response.data.error) {
                    if (response.data.error.keyValue) {
                        if (response.data.error.keyValue.email) {
                            const detectMismoEmail = response.data.error.keyValue.email === userData?.email
                            presentAlert({
                                header: 'Aviso!',
                                message: `
                                ${response.data.error.keyValue.email} ${detectMismoEmail ? 'ya es usado por usted' : 'ya es usado por otro usuario'}.
                                Debe indicar un correo válido diferente. 
                                Recuerde que la información de acceso le llegará a ese correo.
                                Atte.
                                Plataforma UREAD
                                `,
                                buttons: [
                                    {
                                        text: 'Ok'
                                    }
                                ],
                            })
                        }
                    }
                }
            }
        } finally {
            setLoading(false)

        }
    }

    const abrirSeleccionarPlan = () => {
        setOpenAlertPlan(true)
    }

    const seleccionarPlan = (plan: string) => {
        history.push(`/plan/${plan}`)
    }

    return (
        <IonContent class="ion-padding">
            {openAlertPlan &&
                <IonAlert
                    isOpen={openAlertPlan}
                    onWillDismiss={() => {setOpenAlertPlan(false)}}
                    trigger="present-alert"
                    header="Seleccione plan:"
                    /* className="custom-alert" */
                    buttons={[
                        {
                            text: 'Plan A',
                            cssClass: 'alert-button-cancel',
                            handler: () => {
                                seleccionarPlan('A')
                            }
                        },
                        {
                            text: 'Plan B',
                            cssClass: 'alert-button-cancel',
                            handler: () => {
                                seleccionarPlan('B')
                            }
                        },
                        {
                            text: 'Plan C',
                            cssClass: 'alert-button-cancel',
                            handler: () => {
                                seleccionarPlan('C')
                            }
                        }
                    ]}
                ></IonAlert>
            }
            {openAlumnoModal && <IonModal
                isOpen={openAlumnoModal}
                onWillDismiss={() => setOpenAlumnoModal(false)}
            >
                <IonHeader className="ion-no-border">
                    <IonToolbar>
                        <IonButtons slot="end">
                            <IonButton onClick={() => {setOpenAlumnoModal(false)}}>
                                <IonIcon icon={close} />
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent class="ion-padding">
                    <p>Para habilitar usuario asociado a {alumnoSeleccionado.name} ingresar los datos.</p>
                    <IonItem>
                        <IonInput labelPlacement={'floating'} label='Nombre' name={'name'} value={alumnoSeleccionado.name} onIonChange={editUsuario}/>
                    </IonItem>
                    <IonItem>
                        <IonInput labelPlacement={'floating'} label='Apellido' name={'lastName'} value={alumnoSeleccionado.lastName} onIonChange={editUsuario}/>
                    </IonItem>
                    <IonItem>
                        <IonInput labelPlacement={'floating'} label='Email' name={'email'} value={alumnoSeleccionado.email} onIonChange={editUsuario}/>
                    </IonItem>
                    <IonItem>
                        <IonInput type={typePassword} labelPlacement={'floating'} label='Nueva Password' name={'password'} value={alumnoSeleccionado.password} onIonChange={editUsuario}>
                            <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                        </IonInput>
                    </IonItem>
                    <IonItem>
                        <IonInput type={typePasswordConfirm} labelPlacement={'floating'} label='Confirme Password' name={'confirmPassword'} value={alumnoSeleccionado.confirmPassword} onIonChange={editUsuario}>
                            <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                        </IonInput>
                    </IonItem>
                    <div style={{width: '100%', textAlign: 'center', paddingTop: 10}}>
                        <IonButton onClick={() => {habilitarUsuarioDesdeAlumno()}}>
                            Habilitar
                        </IonButton>
                    </div>
                </IonContent>
            </IonModal>}
            <IonHeader class="no-lines">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={() => {
                            history.push('/home')
                        }}>
                            <IonIcon icon={arrowBack}></IonIcon>
                        </IonButton>
                    </IonButtons>
                    <IonTitle slot="start">
                        Mis Alumnos
                    </IonTitle>
                    <IonButtons slot={'end'}>
                        <IonButton onClick={() => {abrirSeleccionarPlan()}}>
                            + Inscribir Alumno
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonGrid>
                <IonRow>
                    <IonCol />
                    <IonCol sizeXl="6" sizeLg="6" sizeMd="8" sizeSm="10" sizeXs="12" style={{padding: 0}}>
                        <IonGrid style={{padding: 0, fontSize: 11}}>
                            <IonRow style={{padding: 0}}>
                                <IonCol size="1.5">
                                    
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
                                                <IonCol size="1.5">
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
                                                        <p>{alumno.levelUser && alumno.levelUser.name}</p>
                                                    </div>
                                                </IonCol>
                                                <IonCol>
                                                    <IonButtons>
                                                        {alumno.state && <IonButton title="Habilitar usuario" onClick={() => {
                                                            seleccionarUsuario(alumno)
                                                        }}>
                                                            <IonIcon icon={arrowUp} />
                                                        </IonButton>}
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
    )
}