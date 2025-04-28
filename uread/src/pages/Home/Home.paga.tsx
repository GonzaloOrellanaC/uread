import { IonPage } from '@ionic/react'
import { HomeContainer } from '../../containers'
import { Menu } from '../../menu/Menu'

const HomePage = () => {
    return (
        <>
        <Menu menuId={'menu-home'} contentId='main-content' />
        <IonPage id="main-content" >
                <HomeContainer />
        </IonPage>
        </>
        
    )
}

export default HomePage
