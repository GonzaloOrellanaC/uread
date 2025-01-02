import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonRow, IonSelect, IonSelectOption, IonTextarea, IonToolbar } from "@ionic/react"
import { close } from "ionicons/icons"
import { useEffect, useState } from "react"
import { Contenido } from "../../../interfaces/Contenido.interface"
import { updateContentIndexedDB } from "../../../indexedDb/Contenido.indexDB"
import { useContenidoContext } from "../../../context/Contenido.context"

export const NewContentModal = ({open, closeModal, data}:{open: boolean, closeModal: () => void, data: any}) => {
    const {niveles, crearContenido} = useContenidoContext()
    const [contentData, setContentData] = useState<Contenido>({
        idContenido: 0,
        nombreTexto: '',
        descripcion: '',
        audioEnUrl: '',
        audioEsUrl: '',
        imageUrl: [],
        relator: '',
        lenguajes: [
            {
                lenguaje: 'es',
                contenido: '',
            },
            {
                lenguaje: 'en',
                contenido: '',
            }
        ],
        createdBy: '',
        updatedBy: '',
        state: false,
        nivel: '',
        pdf: [],
    })
    const [idiomaSeleccionado, setIdiomaSeleccionado] = useState('es')

    useEffect(() => {
        if (contentData.idContenido === 0) {
            contentData.idContenido = Date.now()
        }
        
    }, [contentData])

    const getInputData = (e: any) => {
        if (e.target.name === 'contenido') {
            const lenguajes = [...contentData.lenguajes]
            lenguajes[idiomaSeleccionado === 'es' ? 0 : 1] = {... lenguajes[idiomaSeleccionado === 'es' ? 0 : 1] , contenido : e.detail.value}
            const content = {...contentData, lenguajes: lenguajes}
            actualizarDatosContenido(content)
            setContentData(content)
        } else {
            const content = {...contentData, [e.target.name] : e.detail.value}
            actualizarDatosContenido(content)
            setContentData(content)
        }
    }

    const selectNivel = (e: any) => {
        const content = {...contentData, nivel : e.detail.value}
        actualizarDatosContenido(content)
        setContentData(content)
    }

    const actualizarDatosContenido = async (contenido: Contenido) => {
        await updateContentIndexedDB(contenido)
    }

    const nuevoContenido = async () => {
        const response = await crearContenido(contentData)
        console.log(response)
    }


    return (
        <IonModal
            isOpen={open}
            /* backdropDismiss={true} */
            className='new-content-modal'
            onDidDismiss={closeModal}
        >
            <IonToolbar>
                <IonButtons slot="end">
                    <IonButton onClick={() => {closeModal()}}>
                        <IonIcon icon={close} />
                    </IonButton>
                </IonButtons>
            </IonToolbar>
            <IonContent class="ion-padding">
                <IonGrid>
                    <IonRow>
                        <IonCol></IonCol>
                        <IonCol sizeXs="12" sizeSm="12" sizeMd="10" sizeLg="8" sizeXl="6">
                            <div>
                                <IonItem fill={'outline'}>
                                    <IonLabel position={'floating'}>
                                        Título
                                    </IonLabel>
                                    <IonInput
                                        onIonChange={getInputData}
                                        name={'nombreTexto'}
                                        placeholder="Título"
                                    />
                                </IonItem>
                                <br />
                                <IonItem fill={'outline'}>
                                    <IonLabel position={'floating'}>
                                        Descripción
                                    </IonLabel>
                                    <IonInput
                                        onIonChange={getInputData}
                                        name={'descripcion'}
                                        placeholder="Descripción"
                                    />
                                </IonItem>
                                <br />
                                <IonItem fill={'outline'}>
                                    <IonLabel position={'floating'}>
                                        Contenido
                                    </IonLabel>
                                    <IonTextarea
                                        onIonChange={getInputData}
                                        name={'contenido'}
                                        style={{
                                            textAlign: 'center'
                                        }}
                                        rows={10}
                                        placeholder="Esciba el contenido"
                                    />
                                </IonItem>
                            </div>
                            <br />
                            <IonRow>
                                <IonCol>
                                <IonItem fill={'outline'}>
                                    <IonLabel position={'floating'}>
                                        Nivel
                                    </IonLabel>
                                    <IonSelect value={contentData.nivel} name={'nivel'} onIonChange={selectNivel}>
                                        {
                                            niveles.map((nivel, index) => {
                                                return(
                                                    <IonSelectOption value={nivel._id} key={index}>
                                                        {nivel.name}
                                                    </IonSelectOption>
                                                )
                                            })
                                        }
                                    </IonSelect>
                                </IonItem>
                                </IonCol>
                                <IonCol>
                                    
                                </IonCol>
                            </IonRow>
                            <br />
                            <IonRow>
                                <IonCol>
                                    <IonButton expand={'full'} onClick={nuevoContenido}>
                                        Crear contenido
                                    </IonButton>
                                </IonCol>
                                <IonCol>
                                    <IonButton color={'danger'} expand={'full'}>
                                        Cancelar
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </IonCol>
                        <IonCol></IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonModal>
    )
}