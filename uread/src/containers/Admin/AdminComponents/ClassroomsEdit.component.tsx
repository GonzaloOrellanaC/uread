import { IonAccordion, IonAccordionGroup, IonButton, IonButtons, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { add, arrowBack, close, save } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import classroomRouter from "../../../router/classroom.router"
import { useContenidoContext } from "../../../context/Contenido.context"

export const ClassRoomsComponent = () => {
    const history = useHistory()
    const {niveles} = useContenidoContext()
    const planes = [
            {
                index: 0,
                name: 'A',
                checked: false
            },
            {
                index: 1,
                name: 'B',
                checked: false
            },
            {
                index: 2,
                name: 'C',
                checked: false
            }
        ]
    const [classRoomList, setClassRoomList] = useState<any[]>([])

    useEffect(() => {
        leerLosClassrooms()
    }, [])

    const leerLosClassrooms = async () => {
        const response = await classroomRouter.obteneClassrooms()
        setClassRoomList(response.list.map((c: any) => {
            c.planes.map((plan: any) => {
                plan.id = (plan.name === 'A') ? 0 : (plan.name === 'B') ? 1 : 2
                return plan
            })
            if (!c.niveles || c.niveles.length === 0) {
                c.niveles = niveles.map(nivel => {
                    nivel.checked = false
                    return nivel
                })
            }
            return c
        }))
    }
  
    const addClassRoom = () => {
        const newClassRoom = {
            name: '',
            url: '',
            planes: planes,
            niveles: niveles.map(nivel => {
                nivel.checked = false
                return nivel
            })
        }
        setClassRoomList([...classRoomList, newClassRoom])
    }

    const editClassroom = (e: any, index: number) => {
        const value = e.target.value;
        const name = e.target.name;
        const classRoomListCache = [...classRoomList].map((item, num) => {
            if (num === index) {
                item[name] = value
            }
            return item
        })
        setClassRoomList(classRoomListCache)
    }

    const removeItem = (index: number) => {
        const classRoomListCache: any[] = []
        classRoomList.forEach((item, num) => {
            if (num !== index) {
                classRoomListCache.push(item)
            }
        })
        setClassRoomList(classRoomListCache)
    }

    const detectAllCecked = (cNiveles: any[]) => {
        const cNivelesCache: any[] = []
        cNiveles.forEach((n) => {
            if (n.checked) {
                cNivelesCache.push(n)
            }
        })
        if (cNivelesCache.length === planes.length) {
            return true
        } else {
            return false
        }
    }

    const detectAllNivelesCecked = (cNiveles: any[]) => {
        const cNivelesCache: any[] = []
        cNiveles.forEach((n) => {
            if (n.checked) {
                cNivelesCache.push(n)
            }
        })
        if (cNivelesCache.length === niveles.length) {
            return true
        } else {
            return false
        }
    }

    const selectCheckbox = (e: any, plan: any, index: number) => {
        const classRoomListCache = classRoomList.map((c, i) => {
            if (i === index) {
                c.planes.map((p: any) => {
                    if (p.id === plan.id) {
                        p.checked = e.target.checked
                    }
                    return p
                })
                return c
            } else {
                return c
            }
        })
        setClassRoomList(classRoomListCache)
    }

    const selectNivelCheckbox = (e: any, nivel: any, index: number) => {
        const classRoomListCache = classRoomList.map((c, i) => {
            if (i === index) {
                c.niveles.map((p: any) => {
                    if (p._id === nivel._id) {
                        p.checked = e.target.checked
                    }
                    return p
                })
                return c
            } else {
                return c
            }
        })
        setClassRoomList(classRoomListCache)
    }

    const setAllSelected = (cPlanes: any, index: number, checked: boolean) => {
        const planesCache = cPlanes.map((n: any) => {
            n.checked = checked
            return n
        })
        const classRoomListCache = [...classRoomList]
        classRoomListCache[index].planes = planesCache
        setClassRoomList(classRoomListCache)
    }

    const setAllNivelesSelected = (cNiveles: any, index: number, checked: boolean) => {
        const nivelesCache = cNiveles.map((n: any) => {
            n.checked = checked
            return n
        })
        const classRoomListCache = [...classRoomList]
        classRoomListCache[index].niveles = nivelesCache
        setClassRoomList(classRoomListCache)
    }

    const guardarTodo = async () => {
        let revision = true
        classRoomList.forEach((c) => {
            if (c.name.length === 0 || c.url.length === 0) {
                revision = false
            }
        })
        if (revision) {
            const response = await classroomRouter.guardarClassroom(classRoomList)
            console.log(response)
            setClassRoomList(response.list.map((c: any) => {
                c.planes.map((plan: any) => {
                    plan.id = (plan.name === 'A') ? 0 : (plan.name === 'B') ? 1 : 2
                    return plan
                })
                if (!c.niveles || c.niveles.length === 0) {
                    c.niveles = niveles.map(nivel => {
                        nivel.checked = false
                        return nivel
                    })
                }
                return c
            }))
        } else {
            alert('Hay datos obligatorios que no están rellenados.')
        }
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot={'start'}>
                        <IonButton onClick={() => {history.goBack()}}>
                            <IonIcon icon={arrowBack} />
                        </IonButton>
                    </IonButtons>
                    <IonButtons slot={'end'}>
                        <IonButton onClick={guardarTodo}>
                            <IonIcon icon={save} />
                        </IonButton>
                        <IonButton onClick={addClassRoom}>
                            <IonIcon icon={add} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol />
                        <IonCol sizeXl="10" sizeLg="10" sizeMd="12" sizeSm="12" sizeXs="12">
                            {
                                classRoomList.map((c, index) => {
                                    return (
                                        <div key={index} style={{paddingTop: 10, paddingBottom: 30, borderBottom: '1px solid #ccc'}}>
                                            <IonToolbar>
                                            <IonTitle slot="start">Classroom {index + 1}</IonTitle>
                                            <IonButtons slot="end">
                                                <IonButton onClick={() => {removeItem(index)}}>
                                                    <IonIcon icon={close} />
                                                </IonButton>
                                            </IonButtons>
                                            </IonToolbar>
                                            <IonRow>
                                                <IonCol sizeXl="4" sizeLg="4" sizeMd="12" sizeSm="12" sizeXs="12">
                                                    <IonItem lines="none">
                                                        <IonInput 
                                                            fill={'outline'}
                                                            label="Nombre *" 
                                                            labelPlacement={'floating'} 
                                                            name="name"
                                                            value={c.name}
                                                            onIonChange={(e) => {editClassroom(e, index)}} />
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol sizeXl="8" sizeLg="8" sizeMd="12" sizeSm="12" sizeXs="12">
                                                    <IonItem lines="none">
                                                        <IonInput 
                                                            fill={'outline'}
                                                            label="URL *" 
                                                            labelPlacement={'floating'} 
                                                            name="url"
                                                            value={c.url}
                                                            onIonChange={(e) => {editClassroom(e, index)}} />
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size="12">
                                                    <IonAccordionGroup>
                                                        <IonAccordion value="first">
                                                            <IonItem slot="header" color="light">
                                                                <IonLabel>Planes</IonLabel>
                                                            </IonItem>
                                                            <div className="ion-padding" slot="content">
                                                                <IonRow>
                                                                    <IonCol sizeXl="3" sizeLg="3" sizeMd="12" sizeSm="12" sizeXs="12">
                                                                        <IonItem>
                                                                            <IonCheckbox
                                                                                style={{marginRight: 10}}
                                                                                labelPlacement="fixed"
                                                                                checked={detectAllCecked(c.planes)}
                                                                                onIonChange={(e) => {setAllSelected(c.planes, index, e.target.checked)}}
                                                                            ></IonCheckbox>
                                                                            <IonLabel>Todos</IonLabel>
                                                                        </IonItem>
                                                                    </IonCol>
                                                                    {
                                                                        c.planes.map((plan: any, n: number) => {
                                                                            return (
                                                                            <IonCol key={n} size="3">
                                                                                <IonItem>
                                                                                    <IonCheckbox 
                                                                                        labelPlacement="fixed"
                                                                                        checked={plan.checked}
                                                                                        onIonChange={(e) => {selectCheckbox(e, plan, index)}}
                                                                                    ></IonCheckbox>
                                                                                    <IonLabel>{plan.name}</IonLabel>
                                                                                </IonItem>
                                                                            </IonCol>  
                                                                            )
                                                                        })
                                                                    }
                                                                </IonRow>
                                                            </div>
                                                        </IonAccordion>
                                                        <IonAccordion value="second">
                                                            <IonItem slot="header" color="light">
                                                                <IonLabel>Niveles</IonLabel>
                                                            </IonItem>
                                                            <div className="ion-padding" slot="content">
                                                                <IonRow>
                                                                    <IonCol sizeXl="3" sizeLg="3" sizeMd="12" sizeSm="12" sizeXs="12">
                                                                        <IonItem>
                                                                            <IonCheckbox
                                                                                style={{marginRight: 10}}
                                                                                labelPlacement="fixed"
                                                                                checked={detectAllNivelesCecked(c.niveles)}
                                                                                onIonChange={(e) => {setAllNivelesSelected(c.niveles, index, e.target.checked)}}
                                                                            ></IonCheckbox>
                                                                            <IonLabel>Todos</IonLabel>
                                                                        </IonItem>
                                                                    </IonCol>
                                                                    {
                                                                        c.niveles.map((plan: any, n: number) => {
                                                                            return (
                                                                            <IonCol key={n} size="3">
                                                                                <IonItem>
                                                                                    <IonCheckbox 
                                                                                        labelPlacement="fixed"
                                                                                        checked={plan.checked}
                                                                                        onIonChange={(e) => {selectNivelCheckbox(e, plan, index)}}
                                                                                    ></IonCheckbox>
                                                                                    <IonLabel>{plan.name}</IonLabel>
                                                                                </IonItem>
                                                                            </IonCol>  
                                                                            )
                                                                        })
                                                                    }
                                                                </IonRow>
                                                            </div>
                                                        </IonAccordion>
                                                    </IonAccordionGroup>
                                                </IonCol>
                                            </IonRow> 
                                        </div>
                                    )
                                })
                            }
                        </IonCol>
                        <IonCol />
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}