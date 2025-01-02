import { IonCol, IonContent, IonGrid, IonRow } from '@ionic/react'
import { useEffect, useState } from 'react'

interface Level {
    name: string
    niveles: string[]
}

const LevelsContainer = () => {
    const [levels, setLevels] = useState<Level[]>([])
    useEffect(() => {
        init()
    }, [])
    const init = () => {
        const levelData = [
            {
                name: 'Nivel 1',
                niveles: [
                    'PK', '1°', '2°'
                ]
            },
            {
                name: 'Nivel 2',
                niveles: [
                    '3°', '4°', '5°'
                ]
            },
            {
                name: 'Nivel 3',
                niveles: [
                    '6°', '7°', '8°'
                ]
            },
            {
                name: 'Nivel 4',
                niveles: [
                    '+8°'
                ]
            }
        ]
        setLevels(levelData)
        console.log(levelData)
    }
    return (
        <IonContent>
            <IonGrid>
                <IonRow className='content-data content-data-size'>
                <IonCol size='2'></IonCol>
                <IonCol size='8'>
                    <div className='content-data-col'>
                        <div
                            /* className='conten-levels-data' */
                            style={
                                {
                                    width: '100%',
                                    textAlign: 'center'
                                }
                            }
                        >
                            <h2>
                                ESCOGE TU NIVEL <br />
                                CHOOSE YOUR LEVEL
                            </h2>
                            <IonGrid>
                                <IonRow>
                                    {
                                        levels.map((level, number) => {
                                            return (
                                                <IonCol key={number} sizeXl='6' sizeLg='6' sizeMd='8' sizeSm='12' sizeXs='12'>
                                                    <IonRow>
                                                        <IonCol size='4'>
                                                            <div
                                                                style={
                                                                    {
                                                                        width: '100%',
                                                                        height: 50,
                                                                        borderColor: '#9747FF',
                                                                        borderRadius: 5,
                                                                        borderStyle: 'solid',
                                                                        borderWidth: 1,
                                                                        backgroundColor: '#E6D3FF'

                                                                    }
                                                                }
                                                            >

                                                            </div>
                                                        </IonCol>
                                                        <IonCol size='4'>
                                                            <p>
                                                                {level.name}
                                                                <br />
                                                                {level.niveles}
                                                            </p>
                                                        </IonCol>
                                                    </IonRow>
                                                </IonCol>
                                            )
                                        })
                                    }
                                </IonRow>
                            </IonGrid>
                        </div>
                    </div>
                </IonCol>
                <IonCol size='2'></IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}

export default LevelsContainer
