import { DatetimeChangeEventDetail, IonButton, IonCheckbox, IonCol, IonContent, IonDatetime, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonPopover, IonRow, IonSearchbar, IonTextarea } from "@ionic/react"
import { useEffect, useRef, useState } from "react"
import { useCalendarContext } from "../../../context/Calendar.context"
import { CreateMeetingModal } from "../../../components/Modals/MeetingModal/CreateMeeting.modal"
import { close } from "ionicons/icons"
import { useUsersContext } from "../../../context/Users.context"
import { SelectUserModal } from "../../../components/Modals/SelectUserModal/SelectUser.modal"

export const CalendarComponent = () => {
    const {profesores} = useUsersContext()
    const {createMeeting, meetings} = useCalendarContext()
    const [reuniones, setReuniones] = useState([])
    const [reunion, setReunion] = useState({
        'titulo': '',
        'descripcion': '',
        'profesores': [],
        'usuarios': [],
        'url': ''
    })
    const [openReunionModal, setOpenReunionModal] = useState(false)
    const [date, setDate] = useState<string>('')

    const [profesoresOpenPopover, setProfesoresOpenPopover] = useState(false)
    const [usuariosOpenPopover, setUsuariosOpenPopover] = useState(false)

    const usuariosPopoverElement = useRef<HTMLIonPopoverElement>(null);
    const profesoresPopoverElement = useRef<HTMLIonPopoverElement>(null);

    const [usuariosSeleccionados, setUsuariosSeleccionados] = useState<any[]>([])


    const openProfesoresPopover = (e: any) => {
        profesoresPopoverElement.current!.event = e;
        setProfesoresOpenPopover(true);
    };

    const openUsuariosPopover = (e: any) => {
        /* usuariosPopoverElement.current!.event = e; */
        setUsuariosOpenPopover(true);
    };

    useEffect(() => {
        if (meetings) {
            setReuniones(meetings)
        }
    }, [meetings])

    const getDate = (date: DatetimeChangeEventDetail) => {
        console.log(date)
        if (date.value && (typeof date.value === 'string')) {
            setDate(date.value)
        }
    }

    const crearNuevaReunion = () => {
            console.log(reunion)
    }

    const cerrarModal = () => {
        setOpenReunionModal(false)
    }

    const inputCrearReunion = (e: any) => {
        const value = e.detail.value
        const name = e.target.name
        const reunionCache: any = {...reunion}
        if (!reunionCache[name]) {
            reunionCache[name] = ''
        }
        reunionCache[name] = value
        setReunion(reunionCache)
    }

    const seleccionarProfesor = (index: number) => {
        const findProfe = [...profesores][index]
        const reunionCache: any = {...reunion, profesores: [findProfe._id]}
        setReunion(reunionCache)
        setProfesoresOpenPopover(false)

    }

    const closeModal = () => {
        console.log('Cerrar')
        setUsuariosOpenPopover(false)
    }

    return (
        <IonPage>
            <IonContent class="ion-padding">
                <CreateMeetingModal
                    isOpen={openReunionModal}
                    closeModal={cerrarModal}
                    date={date!}
                />
                {usuariosOpenPopover && <SelectUserModal
                    usuariosOpenPopover={usuariosOpenPopover}
                    usuariosSeleccionados={usuariosSeleccionados}
                    setUsuariosOpenPopover={setUsuariosOpenPopover}
                    setUsuariosSeleccionados={setUsuariosSeleccionados}
                    reunion={reunion}
                    setReunion={setReunion}
                    closeModal={closeModal}
                />}

                {
                    <IonPopover ref={profesoresPopoverElement} isOpen={profesoresOpenPopover} onDidDismiss={() => setProfesoresOpenPopover(false)}>
                        <IonContent class="ion-padding">
                            {/* <div>
                                <IonItem>
                                    <IonLabel>
                                        Buscar
                                    </IonLabel>
                                    <IonSearchbar onIonChange={filtrarUsuarios} />
                                </IonItem>
                            </div>
                            <div>
                                <IonItem>
                                    <IonCheckbox />
                                    <IonLabel style={{marginLeft: 10}}>
                                        Seleccionar todos
                                    </IonLabel>
                                </IonItem>
                            </div> */}
                            {
                                profesores.map((profesor, index) => {
                                    return (
                                        <IonItem key={`${profesor.name}_${index}`} button onClick={() => {seleccionarProfesor(index)}}>
                                            <IonLabel>
                                                {profesor.name} {profesor.lastName}
                                            </IonLabel>
                                        </IonItem>
                                    )
                                })
                            }
                        </IonContent>
                    </IonPopover>
                }

                <IonGrid>
                    <IonRow>
                        <IonCol sizeXl="3">
                            <IonDatetime
                                firstDayOfWeek={1}
                                size={'cover'}
                                showDefaultTimeLabel={false}
                                onIonChange={(e) => {getDate(e.detail)}}
                            />
                        </IonCol>
                        <IonCol sizeXl="9">
                            <IonRow>
                                <IonCol>
                                    <div style={{padding: 10}}>
                                        {
                                            reuniones.length > 0
                                            ?
                                            <IonList>
                                                {
                                                    reuniones.map((reunion: any, i) => {
                                                        return (
                                                            <IonItem button onClick={() => {setReunion(reunion)}}>
                                                                {reunion.title}
                                                            </IonItem>
                                                        )
                                                    })
                                                }
                                            </IonList>
                                            :
                                            <IonList>
                                                <IonItem>
                                                    <IonLabel>
                                                        No hay clases
                                                    </IonLabel>
                                                </IonItem>
                                            </IonList>
                                        }
                                    </div>
                                </IonCol>
                                <IonCol>
                                    <div style={{position: 'relative', width: '100%', padding: 16}}>
                                        {/* <button style={{position: 'absolute', top: 10, right: 10, backgroundColor: 'transparent', fontSize: 24}} onClick={closeModal}>
                                            <IonIcon icon={close} />
                                        </button> */}
                                        <div style={{marginTop: 24, marginBottom: 24}}>
                                            <IonList>
                                                <IonItem>
                                                    <IonLabel position={'floating'}>
                                                        Título
                                                    </IonLabel>
                                                    <IonInput name={'titulo'} onIonChange={inputCrearReunion} value={reunion['titulo']}>

                                                    </IonInput>
                                                </IonItem>
                                                <IonItem>
                                                    <IonLabel position={'floating'}>
                                                        Descripción
                                                    </IonLabel>
                                                    <IonTextarea name={'descripcion'} onIonChange={inputCrearReunion} value={reunion['descripcion']}>

                                                    </IonTextarea>
                                                </IonItem>
                                                <IonItem button onClick={openUsuariosPopover}>
                                                    <IonLabel>
                                                        Usuarios
                                                    </IonLabel>
                                                    <IonLabel>
                                                        Seleccionados: {reunion.usuarios.length}
                                                    </IonLabel>
                                                </IonItem>
                                                <IonItem button onClick={openProfesoresPopover}>
                                                    <IonLabel>
                                                        Profesores
                                                    </IonLabel>
                                                    <IonLabel>
                                                        Seleccionados: {reunion.profesores.length}
                                                    </IonLabel>
                                                </IonItem>
                                                <IonItem>
                                                    <IonLabel position={'floating'}>
                                                        URL
                                                    </IonLabel>
                                                    <IonInput name={'url'} onIonChange={inputCrearReunion} value={reunion['url']}>

                                                    </IonInput>
                                                </IonItem>
                                            </IonList>
                                        </div>
                                        <IonButton expand={'block'}>
                                            Crear Reunión
                                        </IonButton>
                                    </div>
                                
                                </IonCol>
                            </IonRow>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}