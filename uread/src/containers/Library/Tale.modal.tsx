import { IonButton, IonButtons, IonCard, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonModal, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { close, pencil, playOutline, stopOutline } from "ionicons/icons"
import { useEffect, useState } from "react"
import { TextList } from "../../interfaces/TextList.interface"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { Image } from "../../interfaces/Contenido.interface";
import { useAuthContext } from "../../context/Auth.context";

export const TaleModal = ({closeModal, isOpen, item}: any) => {
    const {isAdmin} = useAuthContext()
    const [listaTexto, setListaTexto] = useState([])
    const [lenguageSelected, setLenguageSelected] = useState<any>()
    const [indexLenguaje, setIndexLenguaje] = useState(0)
    const [botones, setBotones] = useState<any[]>([])
    const [element, setElement] = useState<any>()
    const [isPaused, setIsPaused] = useState(true)
    const [timeOut, setElementTimeout] = useState<any>()
    const [images, setImages] = useState<Image[]>()
    const [pdfs, setPdfs] = useState<{description: string, pdfUrl: string}[]>()
    const [widthScreen, setWidthScreen] = useState(window.innerWidth)

    const [openEdit, setOpenEdit] = useState(false)

    let timeoutId: any = null
    let stoped = true

    useEffect(() => {
        window.onresize = function(event: any) {
            console.log(event.currentTarget.innerWidth)
            setWidthScreen(event.currentTarget.innerWidth)
        };
        
    }, [])

    useEffect(() => {
        if (item) {
            setElement(item)
        }
    }, [item])

    useEffect(() => {
        if (element) {
            const botonesCache: any[] = [...item.lenguajes]
            botonesCache.forEach((boton: any) => {
                boton.state = false
            })
            botonesCache[0].state = true
            console.log(botonesCache)
            setBotones(botonesCache)
            setImages(element.imageUrl)
            setPdfs(element.pdf)
        }
    }, [element])
    useEffect(() => {
        if (lenguageSelected) {
            console.log(lenguageSelected)
            setListaTexto(lenguageSelected.listaTexto)
        }
    }, [lenguageSelected])
    useEffect(() => {
        setLenguageSelected(botones[indexLenguaje])
    }, [botones, element])

    const selectButton = (index: number) => {
        const botonesCache = [...botones]
        botonesCache.forEach(boton => {
            boton.state = false
        })
        botonesCache[index].state = true
        setBotones(botonesCache)
        setIndexLenguaje(index)
    }
    const playAudioBook = () => {
        setIsPaused(false)
        stoped = false
        const element = document.getElementById(`audio${lenguageSelected.lenguaje}`) as HTMLAudioElement
        element.play()
        const n = 0
        initRead(listaTexto, n)
    }

    const stopAudioBook = () => {
        setIsPaused(true)
        stoped = true
        const element = document.getElementById(`audio${lenguageSelected.lenguaje}`) as HTMLAudioElement
        element.load()
        if (timeoutId)
        clearTimeout(timeoutId)
        clearTimeout(timeOut)
        setTimeout(() => {
            setListaTexto(lenguageSelected.listaTexto)
            timeoutId = null
            setElementTimeout(null)
        }, 500);
        const listaTextoCache = [...listaTexto]
        listaTextoCache.forEach((texto, i) => {
            const textToClear = document.getElementById(`text_${i + 1}`)
            if (textToClear) {
                textToClear.style.color = 'black'
                textToClear.style.fontWeight = 'normal'
            }
        })
    }
    

    const initRead = (textList: TextList[], number: number) => {
        if (number === (textList.length - 1)) {

        } else {
            const text = textList[number]
            console.log(text)
            console.log(parseFloat(text.init.toString()), parseFloat(text.finish.toString()))
            const textToResalt = document.getElementById(`text_${number + 1}`)
            console.log(textToResalt)
            if (textToResalt) {
                textToResalt.style.color = 'red'
                textToResalt.style.fontWeight = 'bold'
            }
            timeoutId = setTimeout(() => {
                if (textToResalt) {
                    textToResalt.style.color = 'black'
                    textToResalt.style.fontWeight = 'normal'
                }
                number = number + 1
                initRead(textList, number)
            }, ((parseFloat(text.finish.toString())-parseFloat(text.init.toString()))*1000))
            setElementTimeout(timeoutId)
        }
    }

    const openUrl = (url: string) => {
        window.open(url, '_blank')
    }

    return (
        <IonModal isOpen={isOpen} className="item-container">
            {
                openEdit && <IonModal isOpen={openEdit} onWillDismiss={() => {setOpenEdit(false)}}>
                        <IonContent style={{border: '1px #ccc solid'}} class="ion-padding">
                            <IonToolbar>
                                <IonButtons slot={'end'}>
                                    <IonButton onClick={() => {setOpenEdit(false)}}>
                                        <IonIcon icon={close} />
                                    </IonButton>
                                </IonButtons>
                            </IonToolbar>
                            <IonGrid>
                                <IonRow>
                                    <IonCol />
                                    <IonCol sizeXl="10" sizeLg="10" sizeMd="12" sizeSm="12" sizeXs="12">
                                        <IonItem>
                                            <IonInput label="Nearpod" labelPlacement={'floating'} value={element.nearpod} onIonChange={(e) => {
                                                setElement({...element, nearpod: e.target.value})
                                            }} />
                                        </IonItem>
                                        <IonItem>
                                            <IonInput label="Kahoot" labelPlacement={'floating'} value={element.kahoot} onIonChange={(e) => {
                                                setElement({...element, kahoot: e.target.value})
                                            }} />
                                        </IonItem>
                                        <IonItem>
                                            <IonCheckbox
                                                checked={element.state}
                                                justify="start"
                                                onIonChange={(e) => {setElement({...element, state: e.target.checked })}}>Habilitado</IonCheckbox>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol />
                                </IonRow>
                            </IonGrid>
                        </IonContent>
                    </IonModal>
            }
          <IonHeader className="ion-no-border">
            <IonToolbar>
              <IonTitle>{element && element.nombreTexto}</IonTitle>
              <IonButtons slot="end">
                {
                    isAdmin && <IonButton onClick={() => {setOpenEdit(true)}}>
                        <IonIcon icon={pencil} />
                    </IonButton>
                }
                {element && element.kahoot && <IonButton onClick={() => {openUrl(element.kahoot)}}>
                    <img height={'30px'} src={'./assets/images/kahoot-logo.png'} />
                </IonButton>}
                {element && element.nearpod && <IonButton onClick={() => {openUrl(element.nearpod)}}>
                    <img height={'30px'} src={'./assets/images/nearpod-logo.webp'} />
                </IonButton>}
                <IonButton onClick={() => closeModal()}>
                    <IonIcon icon={close} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding" style={{'--padding-top': 0}}>
            <IonGrid>
                <IonRow>
                    <IonCol sizeXs="12" sizeMd="6" sizeLg="6" sizeXl="6">
                        <div className='text-container'>
                            {
                                (element && listaTexto.length > 0) && listaTexto.map((content: any, num: number) => {
                                    return(
                                        <p key={num} id={`text_${num + 1}`}/*  dangerouslySetInnerHTML={{__html: content}} */>
                                            {content.text}
                                        </p>
                                    )
                                })
                            }
                        </div>
                    </IonCol>
                    <IonCol sizeXs="12" sizeMd="6" sizeLg="6" sizeXl="6">
                        <IonToolbar>
                            <IonButtons slot='start'>
                                {
                                    botones.map((leng, num) => {
                                        return (
                                            <IonButton key={num} fill={leng.state ? 'solid' : 'outline'} color={'primary'} onClick={() => { selectButton(num) }}>
                                                <img
                                                    src={`./assets/images/languages/${leng.lenguaje}.png`}
                                                    height={15}
                                                    alt={`flag-${leng.lenguaje}`}
                                                    style={{marginRight: 10}}
                                                />
                                                {leng.lenguaje.toUpperCase()}
                                            </IonButton>
                                        )
                                    })
                                }
                                {
                                    botones.length > 0 &&
                                    <>
                                    <IonButton style={{fontSize: 12}} title='play' fill={'solid'} color={'primary'} disabled={!isPaused} onClick={playAudioBook}>
                                        <IonIcon style={{marginRight: 10}} icon={playOutline} /> Play
                                    </IonButton>
                                    <IonButton style={{fontSize: 12}} title='stop' fill={'solid'} color={'primary'} disabled={isPaused} onClick={stopAudioBook}>
                                        <IonIcon style={{marginRight: 10}} icon={stopOutline} /> Stop
                                    </IonButton>
                                    </>
                                }
                            </IonButtons>
                        </IonToolbar>
                        <div /* style={{ height: 60 }} */>
                            {
                                (botones.length > 0) &&
                                botones.map((leng, num) => {
                                    const audio = (leng.lenguaje === 'es') ? element?.audioEsUrl : ((leng.lenguaje === 'en') && element?.audioEnUrl )
                                    return (
                                        <audio key={num} id={`audio${leng.lenguaje}`} controls style={{ width: '100%', display:  'none' }}>
                                            <source src={audio?.toString()} type={'audio/x-m4a'} />
                                        </audio>
                                    )
                                })
                            }
                        </div>
                        <IonRow>
                            <IonCol sizeXs="12" sizeMd="12" sizeLg="12" sizeXl="12">
                            {
                                (images && images.length > 0)
                                ?
                                <Swiper
                                    id="images-slider"
                                    modules={[Pagination, Navigation]}
                                    navigation={true}
                                    pagination={{ 
                                        clickable: true,
                                    }}
                                    spaceBetween={2}
                                    slidesPerView={1}
                                    onSlideChange={() => console.log('slide change')}
                                    onSwiper={(swiper) => console.log(swiper)}
                                    
                                    style={{
                                        height: (widthScreen > 991) ? '40vh' : '20vh',
                                        textAlign: 'center',
                                        border: 'var(--ion-color-primary) 2px solid',
                                        borderRadius: 8,
                                        position: 'relative'
                                    }}
                                    >
                                        {
                                            images.map((image, index) => {
                                                return (
                                                    <SwiperSlide key={index}>
                                                        <img
                                                            key={index}
                                                            src={image.url}
                                                            height={'100%'}
                                                            alt="image-content"
                                                            style={{ objectFit: 'cover', textAlign: 'center' }}
                                                        />
                                                    </SwiperSlide>
                                                )
                                            })
                                        }
                                </Swiper>
                                :
                                <div>

                                </div>
                            }
                            </IonCol>
                            <IonCol>
                                <IonRow>
                                {
                                    (pdfs && pdfs.length > 0)
                                    &&
                                    pdfs.map((len, index) => {
                                        return (
                                            <IonCol size="6" key={index} >
                                                <IonCard button href={len.pdfUrl} target={'_blank'}>
                                                    <div style={{ width: '100%', textAlign: 'center'}}>
                                                        <img src="/assets/icon/pdf-icon.png" alt={`pdf_${index}`} height={40} />
                                                        <p style={{fontSize: '70%'}}>
                                                            {len.description}
                                                        </p>
                                                    </div>
                                                </IonCard>
                                            </IonCol>
                                        )
                                    })
                                }
                                </IonRow>
                            </IonCol>
                        </IonRow>
                    </IonCol>
                </IonRow>
            </IonGrid>            
          </IonContent>
        </IonModal>
    )
}