import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonItem, IonList, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { useContext, useEffect, useState } from "react"
import { Contenido } from "../../interfaces/Contenido.interface"
import { ContenidoContext } from "../../context/Contenido.context"
import { TaleModal } from "./Tale.modal"
import { arrowBack } from "ionicons/icons"
import { useHistory } from "react-router"

export const LibraryContainerV2 = () => {
    const {contenido} = useContext(ContenidoContext)
    const [listaContenido, setListaContenido] = useState<Contenido[]>([])
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [item, setItem] = useState()

    const history = useHistory()

    useEffect(() => {
        if(contenido) {
            console.log(contenido)
            const listaContenidoCache = [...contenido]
            listaContenidoCache.map((contenido) => {
                contenido.state = false
            })
            setListaContenido(listaContenidoCache)
        }
    }, [contenido])

    const seleccionarItem = (i: any) => {
        setItem(i)
        setIsOpenModal(true)
    }

    const cerrarModal = () => {
        setIsOpenModal(false)
    }

    return (
        <IonContent>
            <IonToolbar>
                <IonButtons slot={'start'}>
                    <IonButton onClick={()=>{history.goBack()}}>
                        <IonIcon icon={arrowBack} />
                    </IonButton>
                </IonButtons>
                <IonTitle>
                    Biblioteca
                </IonTitle>
            </IonToolbar>
            <TaleModal
                isOpen={isOpenModal}
                closeModal={cerrarModal}
                item={item}
            />
            
            <div style={{height: 'calc(100vh - 60px)', overflowY: 'auto'}}>
                <IonGrid>
                    <IonRow>
                        <IonCol sizeXs="0" sizeMd="2" sizeLg="4">

                        </IonCol>
                        <IonCol sizeXs="12" sizeMd="10" sizeLg="4">
                            <IonList>
                                {
                                    listaContenido.map((elemento, index) => {
                                        return (
                                            <IonItem key={index} button onClick={() => {seleccionarItem(elemento)}}>
                                                <img 
                                                    style={{height: 20, width: 20, objectFit: 'cover', marginRight: 10}}
                                                    src={
                                                        (
                                                            elemento.imageUrl && 
                                                            elemento.imageUrl[0] && 
                                                            elemento.imageUrl[0].url
                                                        ) ? elemento.imageUrl[0].url 
                                                        : 'https://imkchat.blob.core.windows.net/extras/noimage.jpg'} />
                                                {elemento.nombreTexto}
                                            </IonItem>
                                        )
                                    })
                                }
                            </IonList>
                        </IonCol>
                        <IonCol sizeXs="0" sizeMd="2" sizeLg="4">
                            
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </div>
        </IonContent>
    )
}