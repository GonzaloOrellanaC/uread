import { IonCol, IonContent, IonGrid, IonRow } from "@ionic/react"

const OnDevelopmentPage = () => {
    return (
        <IonContent className='page-container'>
            <IonGrid>
                <IonRow className='content-data content-data-size'>
                    <IonCol sizeXl='12' sizeLg='12' sizeMd='12' sizeSm='12' sizeXs='12'>
                        <div style={{ textAlign: "center", fontFamily: "Comic Sans MS" }}>
                            <h1>Estamos desarrollando el entorno de usuarios.</h1>
                            <h4>Pronto habrá novedades para ti.</h4>
                            <img src="./assets/images/en-desarrollo.jpg" width={500} alt="" />
                        </div>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}

export default OnDevelopmentPage
