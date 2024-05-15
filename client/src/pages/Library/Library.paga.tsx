import { IonContent, IonPage } from '@ionic/react'
import { LibraryContainerV2 } from '../../containers/Library/Library_v2.container'
import { useAuthContext } from '../../context/Auth.context'
import { useState } from 'react'
import { LibraryContainer } from '../../containers'
/* import { LibraryContainer } from '../../containers' */

const LibraryPage = () => {
    const {isAdmin} = useAuthContext()
    const [state, setState] = useState('activa')
    return (
        <IonPage id="main-content">
            <IonContent>
                {isAdmin && <div style={{position: 'relative', width: '100%', zIndex: 100}}>
                    <button style={{position: 'absolute', top: 150, right: 50, border: '1px solid #fff', padding: 5}} onClick={() => {setState((state==='activa') ? 'inactiva' : 'activa')}}>
                        V2 {state}
                    </button>
                </div>}
                {
                    (state === 'inactiva') ?

                        <LibraryContainer />

                        :

                        <LibraryContainerV2 />
                    
                }
            </IonContent>
        </IonPage>
    )
}

export default LibraryPage
