import { IonCol, IonContent, IonGrid, IonRow } from "@ionic/react"
import { useAuthContext } from "../../context/Auth.context"
import HomeContainer from "./Home.container"
import { useUsersContext } from "../../context/Users.context"

export const DashboardContainer = () => {
    const {apoderado, userData, isAdmin} = useAuthContext()
    const {alumnos} = useUsersContext()
    return (
        <IonContent>
            <div className="dashboard-container">
                <h1>Dashboard</h1>
                <p>Bienvenido al dashboard</p>
                {
                    apoderado &&
                    <div>
                        <h2>Hola {userData!.name} {userData!.lastName}</h2>
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <h3>Alumnos</h3>
                                    {
                                        alumnos.map((alumno: any) => {
                                            return (
                                                <div key={alumno._id}>
                                                    <p>{alumno.name} {alumno.lastName}</p>
                                                </div>
                                            )       
                                        })
                                    }
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </div>
                }
                {
                    isAdmin &&
                    <div>
                        <h2>Hola Administrador</h2>
                        <p>Dashboard disponible próximamente</p>
                    </div>
                }
            </div>
            <HomeContainer />
        </IonContent>
    )
}