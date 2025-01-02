import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonModal, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { close, pause, pencil, play, save, stop, time } from "ionicons/icons"
import { useEffect, useState } from "react"
import { Contenido } from "../../../interfaces/Contenido.interface"
import { useAuthContext } from "../../../context/Auth.context"
import { useContenidoContext } from "../../../context/Contenido.context"

export const LibraryV2ContentModal = ({open, closeModal, data}:{open: boolean, closeModal: () => void, data: Contenido}) => {

    const {isAdmin} = useAuthContext()
    const {editarContenido} = useContenidoContext()
    const nodeEnv = process.env.NODE_ENV
    const [datosModal, setDatosModal] = useState<Contenido>()
    const [lenguajeSeleccionado, setLenguajeSeleccionado] = useState('en')
    const [contenido, setContenido] = useState('')
    const [contenidoCache, setContenidoCache] = useState('')
    const [transcripcion, setTranscripcion] = useState<any>()
    const [audio, setAudio] = useState<HTMLAudioElement>()
    const [audioPlaying, setAudioPlaying] = useState(false)
    const [canStop, setCanStop] = useState(false)
    const [segments, setSegments] = useState<any[]>([])
    const [tiempo, setTiempo] = useState(0)
    const [newInterval, setNewInterval] = useState<any>()
    const [segmentDetected, setSegmentDetected] = useState<any>()
    const [segmentFind, setSegmentFind] = useState({
        id: 0,
        lenguaje: 'en'
    })
    const [isEditing, setIsEditing] = useState(false)
    const [heightDiv, setHeightDiv] = useState(0)
    const [segmentText, setSegmentText] = useState('')

    useEffect(() => {
        if (open) {
            setDatosModal(data)
        }
    }, [data, open])

    useEffect(() => {
        if (datosModal) {
            setSegmentFind({...segmentFind, lenguaje: lenguajeSeleccionado})
            const lenguaje = data.lenguajes[lenguajeSeleccionado === 'es' ? 0 : 1]
            const contenidoTemp = lenguaje.contenido
            const transcripcionCache = lenguaje.transcripcion
            const audioCacheUrl = (lenguajeSeleccionado === 'es' ? data.audioEsUrl! : data.audioEnUrl!)
            const audioCacheUrlModified = nodeEnv === 'development' ? audioCacheUrl.replace('https://app.uread.cl', 'http://localhost:5212') : audioCacheUrl
            if (contenidoTemp) {
                setContenido(contenidoTemp)
                setContenidoCache(contenidoTemp)
                setTranscripcion(transcripcionCache)
                setAudio(new Audio(audioCacheUrlModified))
            }
        }
    }, [datosModal, lenguajeSeleccionado])

    useEffect(() => {
        if(!isEditing) {
            console.log(segments.map(segment => {
                return segment.text
            }))
            let newContenido = contenido
            segments.forEach((segment) => {
                newContenido = newContenido.replace(segment.text.replace(' ', ''), `<b style="font-weight: normal" id="${segment.id}">${segment.text}</b>`)
            })
            console.log(newContenido)
            setTimeout(() => {
                const div = document.getElementById('contenido')
                if (div) {
                    div.innerHTML = `<p id="contenido-texto" style="white-space: pre-line; text-align: center">${newContenido}</p>`
                    setHeightDiv(div.offsetHeight)
                }
            }, 100);
        }
    },[contenido, segments, isEditing])

    useEffect(() => {
        if (audio) {
            setCanStop(true)
        }
        if (transcripcion) {
            setSegments(transcripcion.segments.map((segment: any, index: number) => {
                return {
                    ...segment,
                    id: index
                }
            }))
        }
    }, [transcripcion, audio])

    useEffect(() => {
        if (audioPlaying) {
            let timeCache = tiempo
            setNewInterval(setInterval(() => {
                timeCache = timeCache + 100
                setTiempo(timeCache)
            }, 100))
        }
    },[audioPlaying])

    useEffect(() => {
        const detectSegment = segments.filter(segment => 
            (tiempo > (segment.start * 1000))&&(tiempo < (segment.end * 1000))
        )
        if (detectSegment.length > 0) {
            setSegmentDetected(detectSegment[0])
        }
    },[tiempo])

    useEffect(() => {
        if (segmentDetected) {
            setSegmentText(segmentDetected.text)
            setSegmentFind({...segmentFind, id: segmentDetected.id})
            segments.forEach(segment => {
                const bTemp = document.getElementById(`${segment.id}`)
                if (bTemp) {
                    bTemp.style.fontWeight = 'normal'
                    bTemp.style.color = 'black'
                } 
            })
            const b = document.getElementById(`${segmentDetected.id}`)
            if (b) {
                b.style.fontWeight = 'bold'
                b.style.color = 'red'
            }
        }
    }, [segmentDetected])

    const guardarCambios = async () => {
        if (datosModal) {
            const lenguajesTemp = datosModal?.lenguajes
            lenguajesTemp[lenguajeSeleccionado === 'es' ? 0 : 1].contenido = contenido
            lenguajesTemp[lenguajeSeleccionado === 'es' ? 0 : 1].transcripcion!.segments[segmentFind.id].text = segmentText
            const newDatosModal = {
                ...datosModal,
                lenguajes: lenguajesTemp
            }
            setDatosModal(newDatosModal)
            const response = await editarContenido(newDatosModal)
            console.log (response)
            alert('Cambios guardados')
        }
    }

    const pauseAudio = () => {
        audio?.pause()
        setAudioPlaying(false)
        if (newInterval) {
            clearInterval(newInterval)
        }
    }

    const stopAudio = () => {
        audio?.pause()
        setAudioPlaying(false)
        const audioCache: any = audio
        audioCache.currentTime = 0
        setAudio(audioCache)
        setTiempo(0)
        if (newInterval) {
            clearInterval(newInterval)
        }
        segments.forEach(segment => {
            const bTemp = document.getElementById(`${segment.id}`)
            if (bTemp) {
                bTemp.style.fontWeight = 'normal'
                bTemp.style.color = 'black'
            } 
        })
        setSegmentText('')
    }

    const closeAndRemoveData = () => {
        setDatosModal(undefined)
        setContenido('')
        setTranscripcion(undefined)
        setAudio(undefined)
        setAudioPlaying(false)
        setCanStop(false)
        setSegments([])
        setTiempo(0)
        audio?.pause()
        setIsEditing(false)
        closeModal()
    }

    return (
        <IonModal
            isOpen={open}
            className='new-content-modal'
            onDidDismiss={closeAndRemoveData}
        >
            <IonToolbar>
                <IonTitle>
                    {data.nombreTexto}
                </IonTitle>
                <IonButtons slot="end">
                    <IonButton title="Guardar Cambios" onClick={() => {guardarCambios()}}>
                        <IonIcon icon={save} />
                    </IonButton>
                    <IonButton title="Cerrar" onClick={() => {closeAndRemoveData()}}>
                        <IonIcon icon={close} />
                    </IonButton>
                </IonButtons>
            </IonToolbar>
            <IonContent class="ion-padding">
                <IonGrid>
                    <IonRow>
                        <IonCol sizeXs="12" sizeMd="6">
                            <div style={{position: "relative", border: '1px #ccc solid', borderRadius: 30, padding: 30, height: heightDiv + 94}}>
                                {isAdmin && <IonButton onClick={() => {setIsEditing(isEditing ? false : true)}} fill={'clear'} style={{position: 'absolute', top: 10, right: 10, zIndex: 1000}}>
                                    <IonIcon slot={'icon-only'} icon={isEditing ? close : pencil} />
                                </IonButton>}
                                {
                                    isEditing ?
                                        <textarea 
                                            value={contenido}
                                            style={{
                                                width: '100%',
                                                height: heightDiv,
                                                textAlign: 'center',
                                                overflow: 'hidden',
                                                margin: '16px 0px',
                                                border: '0px',
                                                resize: 'none',
                                                padding: 0
                                            }}
                                        />
                                    :
                                    <div id={'contenido'} />
                                }
                            </div>
                            {isAdmin && <br />}
                            {isAdmin && <div style={{width: '100%', border: '1px #ccc solid', borderRadius: 30, padding: 10}}>
                                <textarea
                                    disabled={audioPlaying}
                                    style={{border: 0, width: '100%',textAlign: 'center', resize: 'none'}}
                                    value={segmentText}
                                    onChange={(e) => {setSegmentText(e.target.value)}}
                                />
                            </div>}
                            <br />
                            {!isEditing && <IonToolbar>
                                <IonButtons slot="end">
                                    <IonButton disabled={!canStop || !audio} onClick={() => {stopAudio()}}>
                                        <IonIcon icon={stop} />
                                    </IonButton>
                                    <IonButton disabled={audioPlaying || !audio} onClick={() => {audio?.play(); setAudioPlaying(true)}}>
                                        <IonIcon icon={play} />
                                    </IonButton>
                                    <IonButton disabled={!audioPlaying || !audio} onClick={() => {pauseAudio()}}>
                                        <IonIcon icon={pause} />
                                    </IonButton>
                                </IonButtons>
                            </IonToolbar>}
                        </IonCol>
                        <IonCol sizeXs="12" sizeMd="6">
                            <IonToolbar>
                                <IonButtons slot="end">
                                    <IonButton disabled={lenguajeSeleccionado === 'es'} onClick={() => {setLenguajeSeleccionado('es')}}>
                                        Español
                                    </IonButton>
                                    <IonButton disabled={lenguajeSeleccionado === 'en'} onClick={() => {setLenguajeSeleccionado('en')}}>
                                        English
                                    </IonButton>
                                </IonButtons>
                            </IonToolbar>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonModal>
    )
}