import { IonButton, IonCol, IonGrid, IonIcon, IonRow, IonToolbar } from "@ionic/react"
import axios from "axios"
import { add } from "ionicons/icons"
import { useEffect, useState } from "react"
import NewContentModal from "../../../components/Modals/ContentModal/NewContent.modal"
import NewContentTextModal from "../../../components/Modals/ContentModal/NewContentText.modal"
import { Contenido } from "../../../interfaces/Contenido.interface"

const SubirContenidoComponent = () => {
    const [contenidos, setContenidos] = useState<Contenido[]>([])
    const [contenidosCache, setContenidosCache] = useState<Contenido[]>([])
    const [openNewContent, setOpenNewContent] = useState<boolean>(false)
    const [contenido, setContenido] = useState<Contenido|null>(null)
    const [niveles, setNiveles] = useState<any[]>([])
    const openNewContentModal = () => {
        setOpenNewContent(true)
    }
    const closeNewContentModal = async () => {
        setOpenNewContent(false)
        const response = await axios.get('/api/contenido/leerContenidos')
        console.log(response.data)
        setContenidos(response.data.data)
        setContenidosCache(response.data.data)
        setContenido(null)
    }
    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        const response = await axios.get('/api/contenido/leerContenidos')
        console.log(response.data)
        setContenidos(response.data.data)
        setContenidosCache(response.data.data)
        const res = await axios.get('/api/niveles/leerNiveles')
        const filtros = [
            {
                _id: 'all',
                name: 'Todos',
                number: 0
            }
        ]
        console.log(filtros.concat(res.data.data))
        const buttons: any[] = [...filtros.concat(res.data.data)]
        buttons.forEach((button: any) => {
            button.state = false
        })
        buttons[0].state = true
        setNiveles(buttons)
    }

    const selectLevel = (button: any, index: number) => {
        const buttons = [...niveles]
        buttons.forEach(button => {
            button.state = false
        })
        buttons[index].state = true
        setNiveles(buttons)
        const contenidoCacheData = [...contenidosCache]
        if (button._id === 'all') {
            setContenidos(contenidosCache)
        } else {
            const resultado = contenidoCacheData.filter(contenido => {if (button._id === contenido.nivel) { return contenido }})
            setContenidos(resultado)
        }
    }

    return (
        <div /* className="admin-container" */>
            <IonToolbar className='toolbar-personalized'>
                <h2>Contenidos</h2>
                {
                    niveles.map((button: any, index) => {
                        return (
                            <IonButton disabled={button.state} key={index} slot="end" onClick={() => { selectLevel(button, index) }}>
                                {button.name}
                            </IonButton>
                        )
                    })
                }
                <IonButton style={{marginLeft: 10}} slot="end" onClick={openNewContentModal}>
                    <IonIcon icon={add} style={{ marginRight: 10 }} /> Nuevo contenido
                </IonButton>
            </IonToolbar>
            <IonGrid>
                <IonRow>
                    <IonCol sizeXl="1" sizeLg="1" sizeMd="1" sizeSm="0"></IonCol>
                    <IonCol sizeXl="10" sizeLg="10" sizeMd="10" sizeSm="12">
                        <IonRow className="contenidos-container">
                            {
                                (contenidos.length === 0)
                                ?
                                <div>
                                    <h5>Sin contenidos en plataforma.</h5>
                                </div>
                                :
                                contenidos.map((contenido, index) => {
                                    return (
                                        <IonCol sizeXl="6" sizeLg="6" sizeMd="12" sizeSm="12" key={index} style={{padding: '0px 5px'}}>
                                            <IonRow className="contenido" >
                                                <IonCol size="2">
                                                    <img src={(contenido.imageUrl && contenido.imageUrl[0]) ? contenido.imageUrl[0].url : 'https://imkchat.blob.core.windows.net/extras/noimage.jpg'} height={70} width={70} style={{objectFit: 'cover'}} />
                                                </IonCol>
                                                <IonCol size="2">
                                                    <p>{index+1}.- </p>
                                                </IonCol>
                                                <IonCol size="6">
                                                    <p>{contenido.nombreTexto}</p>
                                                </IonCol>
                                                <IonCol size="2">
                                                    <IonButton onClick={() => { setOpenNewContent(true); setContenido(contenido) }}>
                                                        Ver
                                                    </IonButton>
                                                </IonCol>
                                            </IonRow>
                                        </IonCol>
                                    )
                                })
                            }
                        </IonRow>
                    </IonCol>
                    <IonCol sizeXl="1" sizeLg="1" sizeMd="1" sizeSm="0"></IonCol>
                </IonRow>
            </IonGrid>
            <NewContentTextModal open={openNewContent} closeModal={closeNewContentModal} data={contenido} />
        </div>
    )
}

export default SubirContenidoComponent
