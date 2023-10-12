import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonRow, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from "@ionic/react"
import { ModalData } from "../../../interfaces/ModalData.interface"
import { useEffect, /* useRef,  */useState } from "react";
import { TextList } from "../../../interfaces/TextList.interface";
import { add, close, closeOutline, closeSharp, documentAttachOutline, /* closeSharp,  */eye, eyeOff, imageOutline, musicalNotesOutline, playOutline, refreshOutline, saveOutline, stopOutline, trash, trashOutline } from "ionicons/icons";
import { Contenido, Image, Lenguajes, ListaLenguajes, PDFData } from "../../../interfaces/Contenido.interface";
import axios from "axios";
import azureStorageRouter from "../../../router/azure-storage.router";
import { Swiper, SwiperSlide/* , useSwiper */ } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';


const NewContentTextModal = ({open, closeModal, data}: ModalData) => {
    const [textList, setTextList] = useState<TextList[]>([])
    const [isClosed, setIsClosed] = useState(false)
    const [vistaPrevia, setVistaPrevia] = useState(false)
    const [textToshow, setTextToShow] = useState<any[]>([])
    const [nombreTexto, setNombreTexto] = useState<string | null | undefined>('')
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [appLanguages, setAppLanguages] = useState<ListaLenguajes[]>([])
    const [languageSelected, setLanguageSelected] = useState('es')
    const [indexLanguageSelected, setIndexLanguageSelected] = useState(0)
    const [lenguajes, setLenguajes] = useState<Lenguajes[]>([])
    const [contenido, setContenido] = useState<Contenido | null | undefined>()
    const [timeOut, setElementTimeout] = useState<any>()
    const [niveles, setNiveles] = useState<any[]>([])
    const [nivelSeleccionado, setNivelSeleccionado] = useState<string>('')
    const [audioEnUrl, setAudioEnUrl] = useState<string | null>(null)
    const [audioEsUrl, setAudioEsUrl] = useState<string | null>(null)
    const [images, setImages] = useState<Image[]>([])
    const [PDFs, setPDFs] = useState<PDFData[]>([])

    /* useEffect(() => {
        guardarContenido()
    },[images]) */

    useEffect(() => {
        if (niveles.length > 0 && data) {
            setNivelSeleccionado(data.nivel)
        }
    }, [niveles])

    useEffect(() => {
        if (!data) {
            const langs: ListaLenguajes[] = appLanguages
            const list: Lenguajes[] = []
            langs.forEach((lang, index) => {
                list.push({
                    lenguaje: lang.language,
                    listaTexto: []
                })
            })
            const contenido : Contenido = {
                nombreTexto: '',
                relator: '',
                lenguajes: list,
                createdBy: '',
                updatedBy: '',
                state: true,
                nivel: nivelSeleccionado,
            }
            setContenido(contenido)
        }
    }, [appLanguages])

    useEffect(() => {
        lenguajes.forEach((l, i) => {
            if (languageSelected === l.lenguaje) {
                setTextList(lenguajes[i].listaTexto)
                setIndexLanguageSelected(i)
            }
        })
    }, [languageSelected])

    useEffect(() => {
        setContenido(data)
        if (open) {
            if (data) {
                console.log(data)
                setIsEdit(true)
            }
        } else {
            setIsEdit(false)
            console.log(data)
            setContenido(null)
            setNivelSeleccionado('')
            setTextList([])
            setLenguajes([])
            setImages([])
            setAudioEnUrl(null)
            setAudioEsUrl(null)
            setPDFs([])
            setNombreTexto('')
        }
    },[open])

    useEffect(() => {
        if (contenido) {
            setNombreTexto(contenido.nombreTexto)
            setLenguajes(contenido.lenguajes)
            setNivelSeleccionado(contenido.nivel)
            if (contenido.audioEnUrl)
            setAudioEnUrl(contenido.audioEnUrl)
            if (contenido.audioEsUrl)
            setAudioEsUrl(contenido.audioEsUrl)
            if (contenido.imageUrl)
            setImages(contenido.imageUrl)
            if (contenido.pdf)
            setPDFs(contenido.pdf)
            const element = document.getElementById('list-container')
            setTimeout(() => {
                if (element)
                element.scroll({ top: element.scrollHeight, behavior: 'smooth' });
            }, 100);
        }
    }, [contenido])

    useEffect(() => {
        lenguajes.forEach((l, i) => {
            if (languageSelected === l.lenguaje) {
                setTextList(lenguajes[i].listaTexto)
            }
        })
    }, [lenguajes])

    useEffect(() => {
        init()
    },[])

    useEffect(() => {
        if (vistaPrevia) {
            clearTimeout(timeOut)
            readAllElements()
        }
    }, [textList])

    const init = async () => {
        const response = await axios.get('/api/lenguajes/leerLenguajes')
        const responseNiveles = await axios.get('/api/niveles/leerNiveles')
        setAppLanguages(response.data.data)
        setNiveles(responseNiveles.data.data)
    }

    const newText = () => {
        const textListCache = [...textList]
        textListCache.push({
            text: '',
            index: textList.length + 1,
            init: 0,
            finish: 0
        })
        setTextList(textListCache)
        const element = document.getElementById('list-container')
        setTimeout(() => {
            if (element)
            element.scroll({ top: element.scrollHeight, behavior: 'smooth' });
        }, 100);
    }

    const writeText = (e: any, index: number) => {
        const textListCache = [...textList]
        textListCache[index].text = e.detail.value
        setTextList(textListCache)
    }

    const changeSecondInit = (e: any, index: number) => {
        const textListCache = [...textList]
        textListCache[index].init = e.detail.value
        setTextList(textListCache)
    }

    const changeSecondFinish = (e: any, index: number) => {
        const textListCache = [...textList]
        textListCache[index].finish = e.detail.value
        setTextList(textListCache)
    }

    const closeThisModal = () => {
        if (!isClosed) {
            if (window.confirm('Confirme que desea salir de la edición')) {
                setContenido(null)
                setIsClosed(true)
                setTextList([])
                setNombreTexto('')
                setLanguageSelected('es')
                setIndexLanguageSelected(0)
                setAudioEnUrl(null)
                setAudioEsUrl(null)
                setImages([])
                setPDFs([])
                closeModal()
                setTimeout(() => {
                    setIsClosed(false)
                }, 100);
            }
        } else {
            setContenido(null)
            setTextList([])
            setNombreTexto('')
            setLanguageSelected('es')
            setIndexLanguageSelected(0)
            setAudioEnUrl(null)
            setAudioEsUrl(null)
            setImages([])
            setPDFs([])
            closeModal()
        }
    }

    const cambiarAVistaPrevia = () => {
        if (vistaPrevia) {
            if (languageSelected === 'es') {
                const element = document.getElementById('audioEsLoaded') as HTMLAudioElement
                if(element) {
                    element.pause()
                }
            } else if (languageSelected === 'en') {
                const element = document.getElementById('audioEnLoaded') as HTMLAudioElement
                if(element) {
                    element.pause()
                }
            }
            setVistaPrevia(false)
            clearTimeout(timeOut)
        } else {
            if (languageSelected === 'es') {
                const element = document.getElementById('audioEsLoaded') as HTMLAudioElement
                if(element) {
                    element.load()
                    setTimeout(() => {
                        element.play()
                    }, 100);
                }
            } else if (languageSelected === 'en') {
                const element = document.getElementById('audioEnLoaded') as HTMLAudioElement
                if(element) {
                    element.load()
                    setTimeout(() => {
                        element.play()
                    }, 100);
                }
            }
            setVistaPrevia(true)
            readAllElements()
        }
    }

    const readAllElements = () => {
        const reading: any[] = []
        textList.forEach((text, index) => {
            reading[index] = `${text.text} &nbsp`
            if (index === (textList.length - 1)) {
                setTextToShow(reading)
                setTimeout(() => {
                    const n = 0
                    initRead(textList, n)
                }, 1000)
            }
        })
    }

    const initRead = (textList: TextList[], number: number) => {
        if (number === textList.length) {
            alert('terminado')
        } else {
            const text = textList[number]
            console.log(text)
            const textToResalt = document.getElementById(`text_${number + 1}`)
            if (textToResalt) {
                textToResalt.style.color = 'red'
                textToResalt.style.fontWeight = 'bold'
                const timeOut = setTimeout(() => {
                    textToResalt.style.color = 'black'
                    textToResalt.style.fontWeight = 'normal'
                    number = number + 1
                    initRead(textList, number)
                }, ((Number(text.finish) - Number(text.init)) * 1000));
                setElementTimeout(timeOut)
            }
        }
    }

    const guardarContenido = async () => {
        const lenguajesCache = [...lenguajes]
        lenguajesCache[indexLanguageSelected].listaTexto = textList
        if (!isEdit) {
            const contenido : Contenido = {
                nombreTexto: nombreTexto ? nombreTexto : '',
                relator: '',
                lenguajes: lenguajesCache,
                createdBy: '',
                updatedBy: '',
                state: true,
                nivel: nivelSeleccionado,
                audioEnUrl: audioEnUrl,
                audioEsUrl: audioEsUrl,
                imageUrl: images,
                pdf: PDFs
            }
            await axios.post('/api/contenido/guardarContenido', contenido)
        } else {
            if (data) {
                const contenido : Contenido = {
                    _id: data._id,
                    nombreTexto: nombreTexto ? nombreTexto : '',
                    relator: data.relator,
                    lenguajes: lenguajesCache,
                    createdBy: data.createdBy,
                    updatedBy: data.updatedBy,
                    state: data.state,
                    nivel: nivelSeleccionado,
                    audioEnUrl: audioEnUrl,
                    audioEsUrl: audioEsUrl,
                    imageUrl: images,
                    pdf: PDFs
                }
                await axios.post('/api/contenido/editarContenido', contenido)
            }
        }
        alert('Contenido guardado.')
    }

    const borrarContenido = async () => {
       if (window.confirm('Confirme que borrará el texto') && data) {
            const response = await axios.post('/api/contenido/borrarContenido', {_id: data._id})
            console.log(response)
            closeThisModal()
       }
    }

    const selectLanguageInModal = (e: any) => {
        const contenidoCache = contenido
        if (contenidoCache)
        contenidoCache.lenguajes[indexLanguageSelected].listaTexto = [...textList]
        setContenido(contenidoCache)
        setLanguageSelected(e.target.value)
        const element = document.getElementById('list-container')
        setTimeout(() => {
            if (element)
            element.scroll({ top: element.scrollHeight, behavior: 'smooth' });
        }, 100);
    }

    const deleteItem = (index: number) => {
        if (window.confirm('Confirme que borrará el texto. Este acto no podrá ser recuperado pues se borrará permanentemente.')) {
            const textListCache = [...textList]
            const textListToSave: TextList[] = []
            textListCache.forEach((el, i) => {
                if (i === index) {
                    console.log('Elemento', el, i)
                } else {
                    textListToSave.push(el)
                }
            })
            setTextList(textListToSave)
        }
    }

    const selectNivel = (e: any) => {
        console.log(e)
        setNivelSeleccionado(e.detail.value)
    }

    const saveDocument = async (files: FileList | null) => {
        if (files) {
            const response = await azureStorageRouter.uploadDocument(files[0], 'contenidos/documentos')
            const pdfsCache = [...PDFs]
            pdfsCache.push({
                pdfUrl: response.data.data.url,
                description: response.data.data.description
            })
            setPDFs(pdfsCache)
            alert('Documento cargado.')
        }
    }

    const deleteDocument = async (index: number) => {
        const documentsCache = [...PDFs]
        const documentsToSend : PDFData[] = []
        documentsCache.forEach(async (doc, number) => {
            console.log(doc.description)
            if (index === number) {
                await azureStorageRouter.deleteFile(doc.description, 'documentos')
                console.log('documento borrado')
            } else {
                documentsToSend.push(doc)
            }
            if (number === (documentsCache.length - 1)) {
                setPDFs(documentsToSend)
            }
        })
    }

    const saveImage = async (files: FileList | null) => {
        if (files) {
            const response = await azureStorageRouter.uploadImage(files[0], 'imagenes')
            console.log(response)
            const imagesCache = [...images]
            imagesCache.push({
                url: response.data.data.url,
                description: response.data.data.description
            })
            setImages(imagesCache)
            alert('Imágen cargada.')
        }
    }

    const saveAudioEn = async (files: FileList | null) => {
        if (files) {
            const response = await azureStorageRouter.uploadAudio(files[0], 'audios')
            setAudioEnUrl(response.data.data.url)
        }
    }

    const saveAudioEs = async (files: FileList | null) => {
        if (files) {
            const response = await azureStorageRouter.uploadAudio(files[0], 'audios')
            setAudioEsUrl(response.data.data.url)
        }
    }

    const deleteImage = (index: number) => {
        const imagesCache = [...images]
        const imagesToSave : Image[] = []
        console.log(imagesCache)
        imagesCache.forEach(async (image, number) => {
            if (index === number) {
                try {
                    const response = await azureStorageRouter.deleteFile(image.description, 'imagenes')
                    console.log(response)
                    console.log('imagen borrada')
                } catch (error) {
                    
                }
            } else {
                imagesToSave.push(image)
            }
            if (number === (imagesCache.length - 1)) {
                setImages(imagesToSave)
                alert('Imagen cambiada. Recuerde guardar los cambios.')
            }
        })
    }

    return (
        <IonModal
            isOpen={open}
            backdropDismiss={false}
            className='new-content-modal'
            /* onWillDismiss={closeThisModal} */
        >
            <IonHeader className={'ion-no-border'}>
                <IonToolbar>
                    <IonTitle color={'primary'}>{data ? 'Editar contenido' : 'Crear nuevo contenido'}</IonTitle>
                    <IonItem className={'selection-item'} slot={'end'}>
                        {/* <IonLabel color={'primary'}>Sel. Nivel</IonLabel> */}
                        <IonSelect value={nivelSeleccionado} interface={'popover'} placeholder={'Seleccione Nivel'} onIonChange={selectNivel}>
                            {
                                niveles.map((nivel, index) => {
                                    return (
                                        <IonSelectOption key={index} value={nivel._id}>{nivel.name}</IonSelectOption>
                                    )
                                })
                            }
                        </IonSelect>
                    </IonItem>
                    <IonButtons slot="end">
                        <IonButton color={'primary'} onClick={() => { guardarContenido() }} shape={'round'}>
                            <IonIcon icon={saveOutline} />
                        </IonButton>
                        {isEdit && <IonButton color={'danger'} onClick={() => { borrarContenido() }} shape={'round'}>
                            <IonIcon icon={trashOutline} />
                        </IonButton>}
                        <IonButton color={'primary'} onClick={() => { cambiarAVistaPrevia() }} shape={'round'}>
                            <IonIcon icon={vistaPrevia ? eyeOff : eye} />
                        </IonButton>
                        <IonButton color={'primary'} onClick={closeThisModal} shape={'round'} >
                            <IonIcon icon={closeOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonGrid>
                    <IonRow>
                        <IonCol size="6">
                            <IonSegment value={languageSelected}>
                                {
                                    appLanguages.map((lang, i) => {
                                        return (
                                            
                                                <IonSegmentButton key={i} value={lang.language} onClick={(e) => { selectLanguageInModal(e) }}>
                                                    <IonLabel> <img src={`/assets/images/languages/${lang.language}.png`} alt="" height={20} /> {lang.name}</IonLabel>
                                                </IonSegmentButton>
                                        )
                                    })
                                }
                            </IonSegment>
                            {
                                vistaPrevia
                                ?
                                <div className="list-container">
                                    <p>Vista Previa</p>
                                    <IonGrid>
                                        <IonRow>
                                        {
                                            textToshow.map((el, i) => {
                                                return (
                                                    <p key={i} id={`text_${i + 1}`} dangerouslySetInnerHTML={{__html: el}} />
                                                )
                                            })
                                        }
                                        </IonRow>
                                    </IonGrid>
                                </div>
                                :
                                <div>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol size="4">
                                                <IonButton onClick={newText}>
                                                    <IonIcon icon={add} />
                                                </IonButton>
                                            </IonCol>
                                            <IonCol size="8">
                                                <IonItem>
                                                    <IonLabel position={'floating'}>Nombre del texto</IonLabel>
                                                    <IonInput
                                                        type={'text'}
                                                        value={nombreTexto}
                                                        onIonChange={(e) => {  setNombreTexto(e.detail.value) }}
                                                    />
                                                </IonItem>
                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                    <div className="list-container" id="list-container">
                                    {
                                        textList.map((text, index) => {
                                            return (
                                                <div key={index} className={'item-element'}>
                                                    <IonButton onClick={() => { deleteItem(index) }} shape={'round'} fill={'clear'} size={'small'} color={'primary'} className="button-delete">
                                                        <IonIcon icon={close} />
                                                    </IonButton>
                                                    <IonGrid>
                                                        <IonRow>
                                                            <IonCol size="8">
                                                                <IonTitle>Contenido {text.index}</IonTitle>
                                                                <IonItem>
                                                                    <IonLabel position={'floating'}>Escriba el texto</IonLabel>
                                                                    <IonTextarea
                                                                        onIonChange={(e: any) => { writeText(e, index) }}
                                                                        value={text.text}                                       
                                                                    />
                                                                </IonItem>
                                                            </IonCol>
                                                            <IonCol size="4">
                                                                <IonItem>
                                                                    <IonLabel position={'floating'}>Segundo Inicio</IonLabel>
                                                                    <IonInput
                                                                        onIonChange={(e: any) => { changeSecondInit(e, index) }}
                                                                        value={text.init}
                                                                        type={'number'}
                                                                    />
                                                                </IonItem>
                                                                <IonItem>
                                                                    <IonLabel position={'floating'}>Segundo Final</IonLabel>
                                                                    <IonInput
                                                                        onIonChange={(e: any) => { changeSecondFinish(e, index) }}
                                                                        value={text.finish}
                                                                        type={'number'}
                                                                    />
                                                                </IonItem>
                                                            </IonCol>
                                                        </IonRow>
                                                    </IonGrid>
                                                </div>
                                            )
                                        })
                                    }
                                    </div>
                                </div>
                            }
                        </IonCol>
                        <IonCol size="3">
                            <div>
                                <input style={{ display: 'none' }} type="file"
                                    id="image" name="image"
                                    accept="image/png, image/jpeg"
                                    onChange={(e) => { saveImage(e.target.files) }}
                                />
                                <IonButton fill={'outline'} color={'primary'} disabled={(nombreTexto?.length === 0)||(nivelSeleccionado.length === 0)} onClick={() => {
                                    const buttonImage = document.getElementById('image')
                                    if (buttonImage) {
                                        buttonImage.click()
                                    }
                                }}>
                                    <IonIcon icon={imageOutline} style={{ marginRight: 10 }} /> Upload Image
                                </IonButton>
                                <br />
                                <div /* style={{ height: 230, textAlign: 'center', border: 'var(--ion-color-primary) 2px solid', borderRadius: 8 }} */>
                                    {
                                        (images.length > 0)
                                        ?
                                        <Swiper
                                            modules={[Pagination, Navigation]}
                                            navigation={true}
                                            pagination={{ 
                                                clickable: true,
                                            }}
                                            spaceBetween={2}
                                            slidesPerView={1}
                                            onSlideChange={() => console.log('slide change')}
                                            onSwiper={(swiper) => console.log(swiper)}
                                            style={{ height: 230, textAlign: 'center', border: 'var(--ion-color-primary) 2px solid', borderRadius: 8, position: 'relative' }}
                                            >
                                                {
                                                    images.map((image, index) => {
                                                        return (
                                                            <SwiperSlide key={index}>
                                                                <img key={index} src={image.url} height={'100%'} alt="image-content" style={{ objectFit: 'cover', textAlign: 'center' }}  />
                                                                <IonButton onClick={() => { deleteImage(index) }} fill={'clear'} color={'danger'} style={{ position: 'absolute', top: 10, right: 10 }}>
                                                                    <IonIcon icon={trash} />
                                                                </IonButton>
                                                            </SwiperSlide>
                                                        )
                                                    })
                                                }
                                        </Swiper>
                                        :
                                        <div style={{ width: '100%', padding: 50, textAlign: 'center' }}>No image loaded</div>
                                    }
                                </div>
                                {/* *************************************************************** */}
                                <input style={{ display: 'none' }} type="file"
                                    id="audioEn" name="audioEn"
                                    accept="audio/m4a"
                                    onChange={(e) => { saveAudioEn(e.target.files) }}
                                />
                                <IonButton disabled={audioEnUrl ? true : false} fill={'outline'} color={'primary'} onClick={() => {
                                    const buttonAudioEn = document.getElementById('audioEn')
                                    if (buttonAudioEn) {
                                        buttonAudioEn.click()
                                    }
                                }}>
                                    <IonIcon icon={musicalNotesOutline} style={{ marginRight: 10 }} /> Upload Audio EN
                                </IonButton>
                                <IonButton disabled={audioEnUrl ? false : true} fill={'outline'} color={'danger'} onClick={async () => {
                                    const audio = audioEnUrl?.replace('https://uread.blob.core.windows.net/contenido/audios/', '')
                                    if (audio) {
                                        try {
                                            await azureStorageRouter.deleteFile(audio.replaceAll('%20', ' '), 'audios')
                                            setAudioEnUrl(null)
                                        } catch (error) {
                                            alert(error)
                                        }
                                    }
                                }}>
                                    <IonIcon icon={musicalNotesOutline} style={{ marginRight: 10 }} /> Del Audio EN
                                </IonButton>
                                <br />
                                <div style={{ height: 60 }}>
                                    {audioEnUrl ? 
                                        <div>
                                            <audio id={'audioEnLoaded'} controls style={{ width: '100%'/* , display: 'none' */ }}>
                                                <source src={audioEnUrl} type={'audio/x-m4a'} />
                                            </audio>
                                            <IonButtons hidden={true}>
                                                <IonButton onClick={() => {
                                                    const element = document.getElementById('audioEnLoaded') as HTMLAudioElement
                                                    element.play()
                                                }}>
                                                    <IonIcon icon={playOutline} />
                                                </IonButton>
                                                <IonButton onClick={() => {
                                                    const element = document.getElementById('audioEnLoaded') as HTMLAudioElement
                                                    element.pause()
                                                }}>
                                                    <IonIcon icon={stopOutline} />
                                                </IonButton>
                                                <IonButton onClick={() => {
                                                    const element = document.getElementById('audioEnLoaded') as HTMLAudioElement
                                                    element.load()
                                                }}>
                                                    <IonIcon icon={refreshOutline} />
                                                </IonButton>
                                            </IonButtons>
                                        </div> :
                                        <div style={{ width: '100%', padding: 10, textAlign: 'center' }}>No english audio</div>
                                    }
                                </div>
                                {/* *************************************************************** */}
                                <input style={{ display: 'none' }} type="file"
                                    id="audioEs" name="audioEs"
                                    accept="audio/m4a"
                                    onChange={(e) => { saveAudioEs(e.target.files) }}
                                />
                                <IonButton disabled={audioEsUrl ? true : false} fill={'outline'} color={'primary'} onClick={() => {
                                    const buttonAudioEs = document.getElementById('audioEs')
                                    if (buttonAudioEs) {
                                        buttonAudioEs.click()
                                    }
                                }}>
                                    <IonIcon icon={musicalNotesOutline} style={{ marginRight: 10 }} /> Upload Audio ES
                                </IonButton>
                                <IonButton disabled={audioEsUrl ? false : true} fill={'outline'} color={'danger'} onClick={async () => {
                                    const audio = audioEsUrl?.replace('https://uread.blob.core.windows.net/contenido/audios/', '')
                                    if (audio) {
                                        try {
                                            await azureStorageRouter.deleteFile(audio.replaceAll('%20', ' '), 'audios')
                                            setAudioEsUrl(null)
                                            alert('Audio eliminado')
                                        } catch (error) {
                                            alert(error)
                                        }
                                    }
                                }}>
                                    <IonIcon icon={musicalNotesOutline} style={{ marginRight: 10 }} /> Del Audio ES
                                </IonButton>
                                <br />
                                <div style={{ height: 60 }}>
                                    {audioEsUrl ? 
                                        <div>
                                            <audio id={'audioEsLoaded'} controls style={{ width: '100%'/* , display: 'none' */ }}>
                                                <source src={audioEsUrl} type={'audio/x-m4a'} />
                                            </audio>
                                            <IonButtons hidden={true}>
                                                <IonButton onClick={() => {
                                                    const element = document.getElementById('audioEsLoaded') as HTMLAudioElement
                                                    element.play()
                                                }}>
                                                    <IonIcon icon={playOutline} />
                                                </IonButton>
                                                <IonButton onClick={() => {
                                                    const element = document.getElementById('audioEsLoaded') as HTMLAudioElement
                                                    element.pause()
                                                }}>
                                                    <IonIcon icon={stopOutline} />
                                                </IonButton>
                                                <IonButton onClick={() => {
                                                    const element = document.getElementById('audioEsLoaded') as HTMLAudioElement
                                                    element.load()
                                                }}>
                                                    <IonIcon icon={refreshOutline} />
                                                </IonButton>
                                            </IonButtons>
                                        </div> :
                                        <div style={{ width: '100%', padding: 10, textAlign: 'center' }}>No spanish audio</div>
                                    }
                                </div>
                            </div>
                        </IonCol>
                        <IonCol size="3">
                            <div>
                                <input style={{ display: 'none' }} type="file"
                                    id="documents" name="documents"
                                    accept="application/pdf"
                                    onChange={(e) => { saveDocument(e.target.files) }}
                                />
                                <IonButton disabled={(nombreTexto?.length === 0)||(nivelSeleccionado.length === 0)} fill={'outline'} onClick={() => {
                                    const buttonDocument = document.getElementById('documents')
                                    if (buttonDocument) {
                                        buttonDocument.click()
                                    }                                    
                                }}>
                                    <IonIcon icon={documentAttachOutline} style={{ marginRight: 10 }}/> Upload Document
                                </IonButton>
                                <div style={{ marginTop: 10 }}>
                                {
                                    (PDFs.length > 0) ? PDFs.map((pdfData, index) => {
                                        return (
                                            <IonRow key={index}>
                                                <IonCol size="2">
                                                    <p style={{ color: 'var(--ion-color-primary)' }}>
                                                        {index + 1}.-
                                                    </p>
                                                </IonCol>
                                                <IonCol size="8">
                                                    <p>
                                                        <a href={pdfData.pdfUrl} target={'_blank'} key={index}>
                                                            <img src={'/assets/icon/pdf-icon.png'} height={20} style={{ verticalAlign: 'middle', marginRight: 10 }} />
                                                            {pdfData.description}
                                                        </a>
                                                    </p>
                                                </IonCol>
                                                <IonCol size="2">
                                                    <IonButton fill={'clear'} onClick={() => { deleteDocument(index) }}>
                                                        <IonIcon icon={closeSharp} />
                                                    </IonButton>
                                                </IonCol>
                                            </IonRow>
                                        )
                                    })
                                    :
                                    <div>No hay documentos cargados</div>
                                }
                                </div>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonModal>
    )
}

export default NewContentTextModal
