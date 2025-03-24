import { IonAccordion, IonAccordionGroup, IonButton, IonButtons, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonModal, IonPage, IonRippleEffect, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react"
import { add, arrowBack, close, planet } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { formularioInscripcion } from "../../router/form.router"
import { useContenidoContext } from "../../context/Contenido.context"

export const ContartarPlanPage = () => {
    const {setLoading} = useContenidoContext()
    const transbankList: {A: string[], B: string[], C: string[]} = {
        'A': ['https://www.webpay.cl/form-pay/253730', 'https://www.webpay.cl/form-pay/262693', 'https://www.webpay.cl/form-pay/262694'],
        'B': ['https://www.webpay.cl/form-pay/261774', 'https://www.webpay.cl/form-pay/262695', 'https://www.webpay.cl/form-pay/262696'],
        'C': ['https://www.webpay.cl/form-pay/261776', 'https://www.webpay.cl/form-pay/262697', 'https://www.webpay.cl/form-pay/262698']
    }

    const params: any = useParams()
    const [idPlan, setIdPlan] = useState<'A' | 'B' | 'C'>()
    const [alumnos, setAlumnos] = useState([{
        name: '',
        lastName: '',
        year: '1',
        plan: '',
        medioPago: ''
    }])
    const [apoderado, setApoderado] = useState({
        name: '',
        lastName: '',
        email: '',
        medioPago: ''
    })
   /*  const [datoPago, setDatoPago] = useState({
        nameLastName: '',
        email: ''
    }) */
    const [openImageModal, setOpenImageModal] = useState(false)
    const [transbanckSelected, setTransbankSelected] = useState(false)
    const [transferenciaBancaria, setTransferenciaBancariaSelectedected] = useState(false)

    const [openTransferencia, setOpenTransferencia] = useState(false)

    const [totalAPagar, setTotalAPagar] = useState(0)

    useEffect(() => {
        if (params) {
            setIdPlan(params.idPlan)
            
        }
    }, [params])

    useEffect(() => {
        if (idPlan === 'A') {
            setTotalAPagar(3000 * alumnos.length)
        } else if (params.idPlan === 'A') {
            setTotalAPagar(6000 * alumnos.length)
        } else {
            setTotalAPagar(15000 * alumnos.length)
        }
    }, [alumnos])

    const agregarAlumno = () => {
        if (alumnos.length < 3) {
            setAlumnos([...alumnos, {name: '', lastName: '', year: '1', plan: '', medioPago: ''}])
        } else {
            alert('Máximo 3 alumnos por apoderado. Estamos trabajando para mejorar nuestros procesos.')
        }
    }

    const cambiarDatosAlumnos = (e: any, index: number) => {
        const name: string = e.target.name
        const value: string = e.target.value
        const alumnosCache = [...alumnos]
        const alumnosTemp = alumnosCache.map((alumno, i) => {
            if (index === i) {
                const alumnoCache: {
                    name: string;
                    lastName: string;
                    year: string;
                    plan: string;
                    medioPago: string
                } = {
                    ...alumno,
                    [name]: value
                }
                console.log(alumnoCache)
                return alumnoCache
            } else {
                return alumno
            }
        })
        setAlumnos(alumnosTemp)
    }

    const editarDataApoderado = (e: any) => {
        const name: string = e.target.name
        const value: string = e.target.value
        const apoderadoCache: {
            name: string;
            lastName: string;
            email: string;
            medioPago: string
        } = {
            ...apoderado,
            [name]: (name === 'email') ? value.toLowerCase() : value
        }
        setApoderado(apoderadoCache)
    }

/*     const editarDataPago = (e: any) => {
        const name: string = e.target.name
        const value: string = e.target.value
        const pagoCache: {
            nameLastName: string;
            email: string;
        } = {
            ...datoPago,
            [name]: value
        }
        setDatoPago(pagoCache)
    } */
    const pagar = async () => {
        if (transbanckSelected && !transferenciaBancaria) {
            const params = `location=no, toolbar=no, menubar=no`
            const popup = window.open(transbankList[`${idPlan!}`][alumnos.length-1], 'Transbank Webpay', params)
            if (popup) {
                let tiempo= 0;
                const interval = setInterval(async () => {
                    if(popup.closed !== false) {
                        window.clearInterval(interval)
                        if (confirm('¿Su pago fue exitoso?')) {
                            const state = await guardarDatosPago()
                            if (state) {
                                alert('¡Genial!. En un plazo máximo de 24 hrs te llagerá un correo de bienvenida, una vez confirmemos el pago.')
                            } else {
                                alert('Error 403. Hubo un error en la conexión con el servidor, pero no te preocupes. El pago es independiente y avanza desde pasos paralelos, asi que confirmaremos el pago y te contactaremos. ¡Nos vemos!')
                            }
                            if (process.env.NODE_ENV === 'production') {
                                window.open('https://uread.cl/', "_self")
                            }
                        } else {
                            setTimeout(() => {
                                alert('No importa. Intente nuevamente.')
                            }, 1000);
                        }
                    } else {
                      tiempo +=1;
                    }
                }, 500)
            }
        } else if (transferenciaBancaria && !transbanckSelected) {
            setOpenTransferencia(true)
        } else {
            alert('Debe seleccionar su método de pago.')
        }
    }

    const guardarDatosPago = async () => {
        try {
            const response = await formularioInscripcion({
                alumnos: alumnos.map(alumno => {
                    alumno.plan = idPlan!
                    alumno.medioPago = (transbanckSelected && !transferenciaBancaria) ? 'transbank' : 'transferencia'
                    return alumno
                }),
                apoderado
            })
            return ({
             state: true,
             response   
            })
        } catch (error) {
            console.log(error)
            return({
                state: false,
                error
            })
        }
    }

/*     const mismosDatosDeApoderado = () => {
        if (apoderado.name && apoderado.lastName) {
            setDatoPago({
                ...datoPago,
                nameLastName: `${apoderado.name} ${apoderado.lastName}`,
                email: apoderado.email
            })
        } else {
            alert('Debe indicar el nombre y apellido del apoderado.')
        }
    } */

    const enviarPago = async () => {
        setLoading(true)
        guardarDatosPago().then((data) => {
            console.log(data)
            setLoading(false)
            alert('Muchas gracias por informarnos. Revisaremos el pago y te contactaremos en un plazo máximo de 24 HRS.')
        })
    }

    return (
        <IonPage>
        {
            openImageModal && <IonModal
                isOpen={openImageModal}
                onWillDismiss={() => {setOpenImageModal(false)}}
            >
                <IonHeader className="ion-no-border">
                    <IonToolbar>
                        <IonButtons slot="end">
                            <IonButton fill={'clear'} slot={'icon-only'} onClick={() => {setOpenImageModal(false)}}>
                                <IonIcon icon={close} />
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol></IonCol>
                            <IonCol sizeXl="6" sizeLg="6" sizeMd="6" sizeSm="6" sizeXs="12">
                            <div style={{width: '100%', height: '80%', padding: 10, textAlign: 'center'}}>
                                <img src={`/assets/plans/${idPlan}.jpg`} style={{width: '80%'}} />
                            </div>
                            </IonCol>
                            <IonCol></IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonModal>
        }
        {
            openTransferencia && <IonModal
                isOpen={openTransferencia}
                onWillDismiss={() => {setOpenTransferencia(false)}}
            >
                <IonHeader className="ion-no-border">
                    <IonToolbar>
                        <IonButtons slot="end">
                            <IonButton fill={'clear'} slot={'icon-only'} onClick={() => {setOpenTransferencia(false)}}>
                                <IonIcon icon={close} />
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol></IonCol>
                            <IonCol sizeXl="10" sizeLg="10" sizeMd="10" sizeSm="12" sizeXs="12">
                            <div style={{width: '100%', height: '80%', padding: 10, textAlign: 'justify'}}>
                                <h1>Pasos para ejecutar transferena</h1>
                                <p>
                                    1.- Sin cerrar la página ingresa a tu banco haz la transferencia 
                                    por el monto de ${totalAPagar} siguiendo
                                    las instrucciones indicadas en "Datos de transferencia" más abajo.
                                    <br />
                                    <br />
                                    2.- Cuando esté transferido presiona el botón "Listo" y nosotros, tras verificar
                                    en un plazo máximo de 24 hrs, te contactaremos al correo electrónico 
                                    que ingresaste como apoderado.
                                </p>
                                <h3>Datos para la transferencia:</h3>
                                <p>
                                    Banco: Banco Estado
                                </p>
                                <p>
                                Nombre: Tradustech JMA Ltda.
                                </p>
                                <p>
                                Cuenta Vista (o Chequera Electrónica)
                                </p>
                                <p>
                                Cta N° 2517080872-2
                                </p>
                                <p>
                                Rut: 76.872.448-2
                                </p>
                                <p>
                                Mail: ureadchile@gmail.com
                                </p>
                                <p>
                                Mensaje: NOMBRE y cursos
                                </p>
                                <br />
                                <IonButton onClick={enviarPago}>
                                    Listo
                                </IonButton>
                            </div>
                            </IonCol>
                            <IonCol></IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonModal>
        }

            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton href="https://uread.cl/wp/#planes">
                            <IonIcon icon={arrowBack}></IonIcon>
                        </IonButton>
                    </IonButtons>
                    <IonTitle slot="start">
                        <h2 style={{fontWeight: 'bold'}}>Contrata tu plan {idPlan}</h2>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding">
                <div style={{height: 'calc(100vh - 93px)'}}>
                    <IonGrid>
                        <IonRow>
                            <IonCol></IonCol>
                            <IonCol sizeXl="3" sizeLg="4" sizeMd="6" sizeSm="12" sizeXs="12">
                                <div style={{width: '100%', maxWidth: 400, overflowY: 'auto'}}>
                                    <IonButton onClick={() => {setOpenImageModal(true)}}>Ver plan</IonButton>
                                    <h3 style={{fontWeight: 'bold'}}>Formulario de contratación</h3>
                                    <p style={{fontWeight: 'bold'}}>Datos del Alumno o Alumna</p>
                                    {
                                        alumnos.map((alumno, index) => {
                                            return (
                                                <div key={index} className="">
                                                    <IonItemDivider>
                                                        <IonTitle>
                                                            Alumno {index + 1}
                                                        </IonTitle>
                                                    </IonItemDivider>
                                                    <IonItem>
                                                        <IonInput label="Nombre" name={'name'} labelPlacement="floating" onIonChange={(e) => {cambiarDatosAlumnos(e, index), console.log(e)}} value={alumno.name}/>
                                                    </IonItem>
                                                    <IonItem>
                                                        <IonInput label="Apellido" name={'lastName'} labelPlacement="floating" onIonChange={(e) => {cambiarDatosAlumnos(e, index)}} value={alumno.lastName}/>
                                                    </IonItem>
                                                    <IonItem>
                                                        <IonSelect label="Año académico" name={'year'} labelPlacement="floating" onIonChange={(e) => {cambiarDatosAlumnos(e, index)}} value={alumno.year}>
                                                            {
                                                                (idPlan === 'A' || idPlan === 'B') && <>
                                                                <IonSelectOption value={'1'}>
                                                                    1° Básico
                                                                </IonSelectOption>
                                                                <IonSelectOption value={'2'}>
                                                                    2° Básico
                                                                </IonSelectOption>
                                                                <IonSelectOption value={'3'}>
                                                                    3° Básico
                                                                </IonSelectOption>
                                                                <IonSelectOption value={'4'}>
                                                                    4° Básico
                                                                </IonSelectOption>
                                                                </>
                                                            }
                                                            {
                                                                (idPlan === 'A' || idPlan === 'C') && <>
                                                                <IonSelectOption value={'5'}>
                                                                    5° Básico
                                                                </IonSelectOption>
                                                                <IonSelectOption value={'6'}>
                                                                    6° Básico
                                                                </IonSelectOption>
                                                                <IonSelectOption value={'7'}>
                                                                    7° Básico
                                                                </IonSelectOption>
                                                                <IonSelectOption value={'8'}>
                                                                    8° Básico
                                                                </IonSelectOption>
                                                                </>
                                                            }
                                                        </IonSelect>
                                                    </IonItem>
                                                    <IonItemDivider />
                                                </div>
                                            )
                                        })
                                    }
                                    <IonButton expand={'block'} onClick={agregarAlumno}>
                                        <IonIcon icon={add} /> Agregar alumno
                                    </IonButton>
                                    <p style={{fontWeight: 'bold'}}>Datos del Apoderado o Apoderada</p>
                                    <IonItem>
                                        <IonInput onIonChange={editarDataApoderado} value={apoderado.name} name={'name'} label="Nombre" labelPlacement="floating"/>
                                    </IonItem>
                                    <IonItem>
                                        <IonInput onIonChange={editarDataApoderado} value={apoderado.lastName} name={'lastName'} label="Apellido" labelPlacement="floating"/>
                                    </IonItem>
                                    <IonItem>
                                        <IonInput onIonChange={editarDataApoderado} value={apoderado.email} name={'email'} label="Email" labelPlacement="floating"/>
                                    </IonItem>
                                    {/* <p style={{fontWeight: 'bold'}}>Datos de pago</p>
                                    <p onClick={mismosDatosDeApoderado} style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer'}}>Mismos datos de apoderado</p>
                                    <IonItem>
                                        <IonInput onIonChange={editarDataPago} value={datoPago.nameLastName} name={'name-lastName'} label="Nombre y apellido de quien paga" labelPlacement="floating"/>
                                    </IonItem> */}
                                    {/* <IonItem>
                                        <IonInput onIonChange={editarDataPago} value={datoPago.email} name={'email'} label="Correo electrónico" labelPlacement="floating"/>
                                    </IonItem> */}
                                    <IonItemDivider />
                                    <h3>Seleccione medio de pago</h3>
                                    <IonAccordionGroup>
                                        <IonAccordion value="first">
                                            <IonItem slot="header" color="light">
                                                <IonLabel>Pago con Débito o Crédito</IonLabel>
                                            </IonItem>
                                            <div className="ion-padding" slot="content">
                                                <IonItem button onClick={() => {setTransbankSelected(transbanckSelected ? false : true); setTransferenciaBancariaSelectedected(false)}}>
                                                    <IonCheckbox checked={transbanckSelected}>
                                                    </IonCheckbox>
                                                    <div>
                                                        <img src={'/assets/plans/webpay_logo.png'} style={{maxWidth: 100}} />
                                                    </div>
                                                </IonItem>
                                            </div>
                                        </IonAccordion>
                                        <IonAccordion value="second">
                                            <IonItem slot="header" color="light">
                                                <IonLabel>Transferencia bancaria</IonLabel>
                                            </IonItem>
                                            <div className="ion-padding" slot="content">
                                                <IonItem button onClick={() => {setTransferenciaBancariaSelectedected(transferenciaBancaria ? false : true); setTransbankSelected(false)}}>
                                                    <IonCheckbox checked={transferenciaBancaria}>
                                                    </IonCheckbox>
                                                    <div>
                                                        <img src={'/assets/images/bank-logo.jpg'} style={{maxWidth: 100}} />
                                                    </div>
                                                </IonItem>
                                            </div>
                                        </IonAccordion>
                                    </IonAccordionGroup>
                                    <IonItemDivider />
                                    <IonButton onClick={pagar} expand={'block'}>
                                        Pagar
                                    </IonButton>
                                    <IonItemDivider />
                                </div>
                            </IonCol>
                            <IonCol></IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
            </IonContent>
        </IonPage>
    )
}