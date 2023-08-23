import { IonPage } from '@ionic/react'
import { LibraryContainer/* , OnDevelopmentPage */ } from '../../containers'

const LibraryPage = () => {
    /* console.log(process.env) */
    return (
        <IonPage>
            {
                /* (process.env.NODE_ENV === 'development')
                ? */
                <LibraryContainer />
                /* :
                <OnDevelopmentPage /> */
            }
        </IonPage>
    )
}

export default LibraryPage
