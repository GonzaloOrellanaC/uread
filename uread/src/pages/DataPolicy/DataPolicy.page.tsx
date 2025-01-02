import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react"

export const DataPolicyPage = () => {
    return (
        <IonPage id="main-content">
        <IonContent className='ion-padding'>
            <IonGrid>
                <IonRow className='content-data content-data-size'>
                    <IonCol sizeXl='12' sizeSm='12' sizeXs='12'>
                        <div className="page-container" style={{textAlign: 'justify'}}>
                        <h1>Registro y Su Cuenta.</h1>
                        <p>Para registrarse para utilizar nuestros Servicios, debe crear un nombre de 
                            usuario y una contraseña y proporcionarnos la información solicitada en el proceso 
                            de registro. Debe proporcionar toda la información solicitada durante el proceso de 
                            registro y actualizará su información para garantizar que siga siendo precisa.
                        </p>
                        <h1>Datos</h1>
                        <p>
                            <strong>(a)</strong> Usted se asegurará de que sus datos y el uso que haga de ellos cumplan con este Acuerdo 
                            y cualquier ley aplicable. Si incluye información del titular de la tarjeta de pago en su uso de los Servicios 
                            en la nube, <strong>URead</strong> mantendrá todos los requisitos aplicables del Estándar de seguridad de 
                            datos de la industria de tarjetas de pago. Podemos desactivar su cuenta <strong>URead</strong> si no lo 
                            usa durante 150 días, luego de lo cual haremos todos los esfuerzos comercialmente razonables 
                            para permitirle reactivar el clúster si nos lo solicita.
                        </p>
                        <p>
                            <strong>(b) Procesamiento de datos .</strong>  Las partes cumplirán con el Acuerdo de procesamiento de 
                            datos de <strong>URead</strong> disponible en https://uread.cl/servicio , que se incorpora a este Acuerdo.
                        </p>
                        <p>  
                            <strong>(c) Seguridad .</strong> Cada parte tiene obligaciones con respecto a la seguridad de los Servicios 
                            en la Nube.
                        </p>
                        </div>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
        </IonPage>
    )
}