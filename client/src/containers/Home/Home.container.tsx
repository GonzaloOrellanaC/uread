import { IonCol, IonContent, IonGrid, IonRow } from '@ionic/react'
import { UseUreadContainer } from '../../components/Containers'

const HomeContainer = () => {
    return (
        <IonContent>
            <div className='page-container'>
                <IonGrid>
                    <IonRow className='content-data content-data-size'>
                        <IonCol sizeXl='8' sizeLg='8' sizeMd='8' sizeSm='12' sizeXs='12'>
                            <div className='content-data-col'>
                                <IonRow>
                                    <IonCol size='4'>
                                        <img src="/assets/images/einstein.svg" width={'100%'} alt="einstein" />
                                    </IonCol>
                                    <IonCol size='8'>
                                        <div className='presentation-text' style={{overflowY:'auto', height:'58vh'}}>
                                            <p><strong>URead</strong> para practicar y desarrollar la habilidad de Comprensión Lectora y Auditiva Bilingüe (Inglés y Español)</p>
                                            <p><strong>URead</strong> es una plataforma de lectura innovadora y accesible, diseñada por educadoras con el objetivo de mejorar las habilidades de Comprensión Lectora Bilingüe tanto en jóvenes estudiantes como en personas de todas las edades.</p>
                                            <p>Este recurso educativo integra de manera perfecta la tecnología para crear una experiencia de aprendizaje súper genial.</p>
                                            <p>En <strong>URead</strong> encontrarás atractivo contenido bilingüe creado por mamás y docentes que motivará la curiosidad de los estudiantes y de toda la familia.</p>
                                            <p>Con <strong>URead</strong>, el camino hacia una mayor competencia lectora se vuelve cautivador y efectivo para todos.</p>
                                            <p>Mediante la comprensión lectora, nuestro objetivo es inspirar el amor por el conocimiento y fomentar el uso de los idiomas español e inglés como herramientas para mejorar las habilidades comunicativas, promover el diálogo, estimular el aprendizaje y motivar la exploración más allá de lo digital.</p>
                                            <p>Aspiramos cultivar un hábito lector que impulse a los usuarios a descubrir nuevas perspectivas y enriquecer su experiencia educativa, trascendiendo las fronteras del mundo virtual. Con <strong>URead</strong>, el placer por aprender se fusiona con la maravilla de sumergirse en el fascinante universo de las letras.</p>
                                            <p>En colaboración, podemos convertir la lectura en un hábito autónomo y, de esta manera, estimular la imaginación de toda la familia, pues como bien afirmó Albert Einstein: "La lógica te lleva de A a B, pero la imaginación te llevará a cualquier parte".</p>
                                        </div>
                                    </IonCol>
                                </IonRow>
                            </div>
                        </IonCol>
                        <IonCol sizeXl='4' sizeLg='4' sizeMd='4' sizeSm='12' sizeXs='12'>
                            <UseUreadContainer />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </div>
        </IonContent>
    )
}

export default HomeContainer
