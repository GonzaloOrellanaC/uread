import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonIcon, IonRow, IonToolbar } from '@ionic/react'
import { useContext, useEffect, useState } from 'react'
import { ContenidoContext } from '../../context/Contenido.context'
import { Contenido, Image } from '../../interfaces/Contenido.interface'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { TextList } from '../../interfaces/TextList.interface';
import { pauseOutline, playOutline, stopOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';

const LibraryContainer = () => {
    const history = useHistory()
    const {contenido} = useContext(ContenidoContext)
    const [element, setElement] = useState<Contenido>()
    const [listaContenido, setListaContenido] = useState<Contenido[]>([])
    const [botones, setBotones] = useState<any[]>([])
    const [indexLenguaje, setIndexLenguaje] = useState(0)
    const [lenguageSelected, setLenguageSelected] = useState<any>()
    const [images, setImages] = useState<Image[]>()
    const [pdfs, setPdfs] = useState<{description: string, pdfUrl: string}[]>()
    const [timeOut, setElementTimeout] = useState<any>()

    const [isPaused, setIsPaused] = useState(true)
    const [listaTexto, setListaTexto] = useState([])
    let timeoutId: any = null
    let stoped = true

    useEffect(() => {
        history.goBack()
    }, [])


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

    const elementSelected = (index: number) => {
        setBotones([])
        setElement(contenido[index])
        const listaContenidoCache = [...listaContenido]
        listaContenidoCache.map((contenido) => {
            contenido.state = false
        })
        listaContenidoCache[index].state = true
        setListaContenido(listaContenidoCache)
        changeToFirst()
    }

    useEffect(() => {
        console.log(indexLenguaje)
    },[indexLenguaje])

    useEffect(() => {
        setLenguageSelected(botones[indexLenguaje])
    }, [botones, element])

    useEffect(() => {
        if (element) {
            const botonesCache: any[] = [...element.lenguajes]
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

    const changeToFirst = () => {
        const sliderEl: any = document.getElementById('images-slider')
        if (sliderEl) {
            sliderEl.swiper.slideTo(0)
        }
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


    return (
        <IonContent className='page-container'>
            <IonGrid>
                <IonRow className='content-data-size'>
                    <IonCol sizeMd='4'>
                        <div style={{ height: 'calc(100vh - 190px)', overflowY: 'auto', backgroundColor: 'white'/* 'rgb(243, 193, 27)' */, padding: 10 }}>
                            {
                                listaContenido.map((elemento, index) => {
                                    console.log(elemento.imageUrl)
                                    return (
                                        <IonCard
                                            key={index}
                                            style={{'--background': elemento.state ? 'var(--ion-color-primary)' : 'var(--ion-color-primary-tint)'}}
                                            button
                                            onClick={() => {
                                                elementSelected(index)
                                            }}
                                        >
                                            <IonCardContent>
                                                <p style={{ fontSize: 12, color: 'white', fontWeight: 'bold', textShadow: '1px 1px 2px #ccc' }}>
                                                    <img
                                                        src={(elemento.imageUrl && elemento.imageUrl[0] && elemento.imageUrl[0].url) ? elemento.imageUrl[0].url : 'https://imkchat.blob.core.windows.net/extras/noimage.jpg'}
                                                        height={60}
                                                        width={60}
                                                        style={{
                                                            objectFit: 'cover',
                                                            verticalAlign: 'middle',
                                                            marginRight: 10,
                                                            border: 'var(--ion-color-primary) 1px solid',
                                                            borderRadius: 8,
                                                            backgroundColor: 'white'
                                                        }}
                                                        alt={`image-${index}`}
                                                    />
                                                    {elemento.nombreTexto}
                                                </p>
                                            </IonCardContent>
                                        </IonCard>
                                    )
                                })
                            }
                        </div>
                    </IonCol>
                    <IonCol sizeMd='4'>
                        {
                            element
                            ?
                            <div style={{ textAlign: 'center', fontSize: 14, height: 'calc(100vh - 190px)', overflowY: 'auto' }}>
                                <h1>{element.nombreTexto}</h1>
                                    {
                                        listaTexto.map((content: any, num: number) => {
                                            return(
                                                <p key={num} id={`text_${num + 1}`}/*  dangerouslySetInnerHTML={{__html: content}} */>
                                                    {content.text}
                                                </p>
                                            )
                                        })
                                    }
                                
                            </div>
                            :
                            <div>
                                <h2>Seleccione una actividad</h2>
                            </div>
                        }
                    </IonCol>
                    <IonCol sizeMd='4'>
                        <IonToolbar>
                            <IonButtons slot='end'>
                                {
                                    botones.map((leng, num) => {
                                        return (
                                            <IonButton key={num} fill={leng.state ? 'solid' : 'outline'} color={'primary'} onClick={() => { selectButton(num) }}>
                                                <img
                                                    src={`./assets/images/languages/${leng.lenguaje}.png`}
                                                    height={20}
                                                    alt={`flag-${leng.lenguaje}`}
                                                    style={{marginRight: 10}}
                                                />
                                                {leng.lenguaje.toUpperCase()}
                                            </IonButton>
                                        )
                                    })
                                }
                            </IonButtons>
                        </IonToolbar>
                        <div style={{ height: 60 }}>
                            {
                                botones.length > 0
                                &&
                                <>
                                    <IonButtons>
                                        <IonButton title='play' fill={'solid'} color={'primary'} disabled={!isPaused} onClick={playAudioBook}>
                                            <IonIcon style={{marginRight: 10}} icon={playOutline} /> Play
                                        </IonButton>
                                        <IonButton title='stop' fill={'solid'} color={'primary'} disabled={isPaused} onClick={stopAudioBook}>
                                            <IonIcon style={{marginRight: 10}} icon={stopOutline} /> Stop
                                        </IonButton>
                                    </IonButtons>
                                </>
                            }
                            {
                                (botones.length > 0) &&
                                botones.map((leng, num) => {
                                    const audio = (leng.lenguaje === 'es') ? element?.audioEsUrl : ((leng.lenguaje === 'en') && element?.audioEnUrl )
                                    return (
                                        <audio key={num} id={`audio${leng.lenguaje}`} controls style={{ width: '100%', display: /* leng.state ? 'block' : */ 'none' }}>
                                            <source src={audio?.toString()} type={'audio/x-m4a'} />
                                        </audio>
                                    )
                                })
                            }
                        </div>
                        <div style={{ height: 227 }}>
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
                                        height: 230,
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
                        </div>
                        <IonGrid>
                            <IonRow>
                                {
                                    (pdfs && pdfs.length > 0)
                                    &&
                                    pdfs.map((len, index) => {
                                        return (
                                            <IonCol key={index} size='6'>
                                                <IonCard button href={len.pdfUrl} target={'_blank'}>
                                                    <div style={{ width: '100%', textAlign: 'center'}}>
                                                        <img src="/assets/icon/pdf-icon.png" alt={`pdf_${index}`} height={80} />
                                                        <p>
                                                            {len.description}
                                                        </p>
                                                    </div>
                                                </IonCard>
                                            </IonCol>
                                        )
                                    })
                                }
                            </IonRow>
                        </IonGrid>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>

    )
}

export default LibraryContainer
