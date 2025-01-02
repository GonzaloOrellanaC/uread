import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { AboutPage, AdminPage, ContactUsPage, HomePage, LevelsPage, LibraryPage, LoginPage, RegistrePage, RessetPasswordPage, ValidateUserPage } from './pages';
import './App.style.css'
/* import { useEffect, useState } from 'react'; */
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import UserPage from './pages/User/User.page';
import RestorePasswordPage from './pages/RestorePassword/RestorePassword.page';
import { AuthProvider } from './context/Auth.context';
import { UsersProvider } from './context/Users.context';
import { ContenidoProvider } from './context/Contenido.context';
import { DataPolicyPage } from './pages/DataPolicy/DataPolicy.page';
import { MeetPage } from './pages/Meet/Meet.page';
import { MeetListPage } from './pages/Meet/MeetList.page';
import { SocketProvider } from './context/Socket.context';
import { CalendarProvider } from './context/Calendar.context';
import UserAdminComponent from './containers/Admin/AdminComponents/UserAdmin.component';
import SubirContenidoComponent from './containers/Admin/AdminComponents/SubirContenido.component';
import { CalendarComponent } from './containers/Admin/AdminComponents/Calendar.component';
import { SubirContenidoV2Component } from './containers/Admin/AdminComponents/SubirContenidoV2.component';

setupIonicReact();

const ReactIonApp = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <SocketProvider>
          <AuthProvider>
            <UsersProvider>
              <ContenidoProvider>
                <CalendarProvider>
                  <IonRouterOutlet>
                    <Route exact path='/'>
                      <Redirect to='/login' />
                    </Route>
                    <Route exact path='/home'>
                      <HomePage />
                    </Route>
                    <Route exact path='/restore-password'>
                      <RestorePasswordPage />
                    </Route>
                    <Route exact path='/reset-password/:token'>
                      <RessetPasswordPage />
                    </Route>
                    <Route exact path={'/validate-password/:token'}>
                      <ValidateUserPage />
                    </Route>
                    <Route exact path='/about-us'>
                      <AboutPage />
                    </Route>
                    <Route exact path='/contact-us'>
                      <ContactUsPage />
                    </Route>
                    <Route exact path='/library'>
                      <LibraryPage />
                    </Route>
                    <Route exact path='/levels'>
                      <LevelsPage />
                    </Route>
                    <Route exact path='/login'>
                      <LoginPage />
                    </Route>
                    <Route exact path='/registre'>
                      <RegistrePage />
                    </Route>
                    <Route exact path='/admin'>
                      <AdminPage />
                    </Route>
                    <Route exact path='/usuarios'>
                        <UserAdminComponent />
                    </Route>
                    <Route exact path='/subir-contenido'>
                        <SubirContenidoComponent />
                    </Route>
                    <Route exact path='/subir-contenido-v2'>
                        <SubirContenidoV2Component />
                    </Route>
                    <Route exact path='/calendario'>
                        <CalendarComponent />
                    </Route>
                    <Route exact path='/user/:id'>
                      <UserPage />
                    </Route>
                    <Route exact path='/data-policy'>
                      <DataPolicyPage />
                    </Route>
                    <Route exact path='/meet'>
                      <MeetListPage />
                    </Route>
                    <Route exact path='/meet/:id'>
                      <MeetPage />
                    </Route>
                  </IonRouterOutlet>
                </CalendarProvider>
              </ContenidoProvider>
            </UsersProvider>
          </AuthProvider>
        </SocketProvider>
      </IonReactRouter>
    </IonApp>
  )
}

const App: React.FC = () => (
  <ReactIonApp />
);

export default App;
