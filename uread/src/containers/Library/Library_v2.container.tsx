import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonItem, IonList, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { useContext, useEffect, useState } from "react"
import { Contenido } from "../../interfaces/Contenido.interface"
import { ContenidoContext } from "../../context/Contenido.context"
import { TaleModal } from "./Tale.modal"
import { arrowBack, arrowForward } from "ionicons/icons"
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
            /* listaContenidoCache.map((contenido) => {
                contenido.state = false
            }) */
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
            {isOpenModal && <TaleModal
                isOpen={isOpenModal}
                closeModal={cerrarModal}
                item={item}
            />}
            
            <div style={{height: 'calc(100vh - 60px)', overflowY: 'auto', fontSize: 12}}>
                <IonGrid>
                    <IonRow>
                        <IonCol />
                        <IonCol sizeXs="12" sizeMd="10" sizeLg="5" sizeXl="4">
                                <IonGrid>
                                {
                                    listaContenido.map((elemento, index) => {
                                        return (
                                            <IonRow key={index} style={{borderBottom: '1px #ccc solid', backgroundColor: elemento.state ? 'white' : '#ccc'}}>
                                                <IonCol size="1">
                                                    
                                                <p>{index + 1}.-</p> 
                                                </IonCol>
                                                <IonCol size="2">
                                                <div style={{textAlign: 'center', width: '100%'}}>
                                                    <p>
                                                    <img 
                                                        style={{height: 15, objectFit: 'cover', marginRight: 10, marginLeft: 10}}
                                                        src={
                                                            (
                                                                elemento.imageUrl && 
                                                                elemento.imageUrl[0] && 
                                                                elemento.imageUrl[0].url
                                                            ) ? elemento.imageUrl[0].url 
                                                            : 'https://imkchat.blob.core.windows.net/extras/noimage.jpg'} />
                                                    </p>
                                                </div>
                                                </IonCol>
                                                
                                                <IonCol size="6">
                                                    <p>{elemento.nombreTexto}</p>
                                                </IonCol>
                                                <IonCol size="1">

                                                </IonCol>
                                                <IonCol size="2">
                                                    <IonButton onClick={() => {seleccionarItem(elemento)}}>
                                                        <IonIcon icon={arrowForward} />
                                                    </IonButton>
                                                </IonCol>
                                            </IonRow>
                                        )
                                    })
                                }
                                </IonGrid>
                        </IonCol>
                        <IonCol />
                    </IonRow>
                </IonGrid>
            </div>
        </IonContent>
    )
}