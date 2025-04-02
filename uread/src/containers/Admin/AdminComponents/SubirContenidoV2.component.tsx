import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { add, arrowBack } from "ionicons/icons"
import { useContenidoContext } from "../../../context/Contenido.context"
import { useEffect, useState } from "react"
import { Contenido } from "../../../interfaces/Contenido.interface"
/* import { NewContentModal } from "../../../components/Modals/ContentModal/NewContent_v2.modal" */
import { LibraryV2ContentModal } from "../../../components/Modals/ContentModal/LibraryV2Content.modal"
import { useHistory } from "react-router"

export const SubirContenidoV2Component = () => {
    const {niveles, contenidoV2} = useContenidoContext()
    const [data, setData] = useState<Contenido>()
    const [contenidosCache, setContenidosCache] = useState<Contenido[]>([])
    const [openNewContent, setOpenNewContent] = useState<boolean>(false)
    const [openPreview, setOpenPreview] = useState<boolean>(false)
    const [nivelesButtons, setNivelesButtons] = useState<any[]>([])

    const history = useHistory()


    const openNewContentModal = () => {
        setOpenNewContent(true)
    }
    const closeNewContentModal = async () => {
        setOpenNewContent(false)
    }

    const closePreview = () => {
        setOpenPreview(false)
    }

    useEffect(() => {
        setContenidosCache(contenidoV2)
    }, [contenidoV2])

    useEffect(() => {
        console.log(openNewContent)
    }, [openNewContent])

    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        /* const response = await axios.get('/api/contenido/leerContenidos')
        console.log(response.data)
        setContenidos(response.data.data) */
        /* setContenidosCache(contenido) */
        /* const res = await axios.get('/api/niveles/leerNiveles') */
        const filtros = [
            {
                _id: 'all',
                name: 'Todos',
                number: 0
            }
        ]
        console.log(filtros.concat(niveles/* res.data.data */))
        const buttons: any[] = [...filtros.concat(niveles/* res.data.data */)]
        buttons.forEach((button: any) => {
            button.state = false
        })
        buttons[0].state = true
        setNivelesButtons(buttons)
    }

    const selectLevel = (button: any, index: number) => {
        const buttons = [...nivelesButtons]
        buttons.forEach(button => {
            button.state = false
        })
        buttons[index].state = true
        setNivelesButtons(buttons)
        const contenidoCacheData = [...contenidoV2]
        if (button._id === 'all') {
            setContenidosCache(contenidoV2)
        } else {
            const resultado = contenidoCacheData.filter(contenido => {if (button._id === contenido.nivel) { return contenido }})
            setContenidosCache(resultado)
        }
    }

    return (
        <IonPage>
            <IonContent>
                <IonToolbar className='toolbar-personalized'>
                    <IonButtons slot="start">
                        <IonButton onClick={() => {history.goBack()}}>
                            <IonIcon icon={arrowBack} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Contenidos V2</IonTitle>
                    <IonButton style={{marginLeft: 10}} slot="end" onClick={openNewContentModal}>
                        <IonIcon icon={add} style={{ marginRight: 10 }} /> Nuevo contenido
                    </IonButton>
                </IonToolbar>
                <IonGrid>
                    <IonRow>
                        <IonCol sizeXl="1" sizeLg="1" sizeMd="1" sizeSm="0"></IonCol>
                        <IonCol sizeXl="10" sizeLg="10" sizeMd="10" sizeSm="12" sizeXs="12">
                                {
                                    (contenidosCache.length === 0)
                                    ?
                                    <div>
                                        <h5>Sin contenidos en plataforma.</h5>
                                    </div>
                                    :
                                    contenidosCache.map((c: Contenido, index: number) => {
                                        return (
                                            <IonItem key={index} button onClick={() => { setOpenPreview(true); setData(c) }}>
                                                {index + 1}.-  {c.nombreTexto}
                                            </IonItem>
                                            /* <IonCol sizeXl="6" sizeLg="6" sizeMd="12" sizeSm="12" key={index} style={{padding: '0px 5px'}}>
                                                <IonRow className="contenido" >
                                                    <IonCol size="2">
                                                        <img src={(c.imageUrl && c.imageUrl[0]) ? c.imageUrl[0].url : 'https://imkchat.blob.core.windows.net/extras/noimage.jpg'} height={70} width={70} style={{objectFit: 'cover'}} />
                                                    </IonCol>
                                                    <IonCol size="2">
                                                        <p>{index+1}.- </p>
                                                    </IonCol>
                                                    <IonCol size="6">
                                                        <p>{c.nombreTexto}</p>
                                                    </IonCol>
                                                    <IonCol size="2">
                                                        <IonButton onClick={() => { setOpenPreview(true); setData(c) }}>
                                                            Ver
                                                        </IonButton>
                                                    </IonCol>
                                                </IonRow>
                                            </IonCol> */
                                        )
                                    })
                                }
                        </IonCol>
                        <IonCol sizeXl="1" sizeLg="1" sizeMd="1" sizeSm="0"></IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
            {/* <NewContentModal open={openNewContent} closeModal={closeNewContentModal} data={data} /> */}
            {data && <LibraryV2ContentModal open={openPreview} closeModal={closePreview} data={data} />}
        </IonPage>
    )
}