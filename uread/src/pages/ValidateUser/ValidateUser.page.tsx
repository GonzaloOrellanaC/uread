import { IonCol, IonContent, IonGrid, IonPage, IonRow, IonSpinner } from "@ionic/react"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import userRouter from "../../router/user.router"

const ValidateUserPage = () => {
    const [verificando, setVerificando] = useState(true)
    const [message, setMessage] = useState('')
    const history = useHistory()
    useEffect(() => {
        console.log(history.location)
        if (history.location.search.includes('?token=')) {
            const token = history.location.search.replace('?token=', '')
            verifyUser(token)
        }
    },[history.location])
    const verifyUser = async (token: string) => {
        try {
            const response = await userRouter.veryfyUser(token)
            console.log(response)
            if (response.message === 'verified') {
                setMessage('Usuario verificado correctamente. La página se redirigirá al inicio.')
                setTimeout(() => {
                    history.replace('/')
                }, 3000);
            } else {
                setMessage('Usuario no verificado.')
            }
            setVerificando(false)
        } catch (error: any) {
            console.log(error)
            if (error.response.data.message === 'jwt malformed') {
                setMessage('Error del formato del token. No se pudo generar la validación.')
            }
            setVerificando(false)
        }
    }
    return (
        <IonPage>
            <IonContent className='page-container'>
                <IonGrid>
                    <IonRow className='content-data content-data-size'>
                        <IonCol sizeXl='8' sizeLg='8' sizeMd='8' sizeSm='12' sizeXs='12'>
                            {
                                verificando
                                ?
                                <IonSpinner />
                                :
                                <h1>
                                    {message}
                                </h1>
                            }
                        </IonCol>
                        <IonCol sizeXl='4' sizeLg='4' sizeMd='4' sizeSm='12' sizeXs='12'>
                            
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default ValidateUserPage
