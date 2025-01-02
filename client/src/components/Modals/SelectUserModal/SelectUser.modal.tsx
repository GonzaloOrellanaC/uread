import { IonButton, IonButtons, IonCheckbox, IonContent, IonIcon, IonItem, IonLabel, IonModal, IonSearchbar } from "@ionic/react"
import { useEffect, useState } from "react"
import { useUsersContext } from "../../../context/Users.context"
import { close } from "ionicons/icons"

export const SelectUserModal = ({usuariosOpenPopover, setUsuariosOpenPopover, setUsuariosSeleccionados, usuariosSeleccionados, reunion, setReunion, closeModal}: any) => {
    const {usuarios} = useUsersContext()
    const [usuariosCache, setUsuariosCache] = useState<any[]>([])
    const [usuariosParaMostrar, setUsuariosParaMostrar] = useState<any[]>([])

    const [nombreFiltrado, setNombreFiltrado] = useState('')

    const [seleccionarTodos, setSeleccionarTodos] = useState<boolean>(false)


    useEffect(() => {
        console.log(usuarios.map(usuario => {
            return {
                ...usuario,
                checked: seleccionarTodos
            }
        }))
        setUsuariosCache(usuarios.map(usuario => {
            return {
                ...usuario,
                checked: seleccionarTodos
            }
        }))
        
    }, [usuarios, seleccionarTodos])

    useEffect(() => {
        if (nombreFiltrado.length > 0) {
            setUsuariosParaMostrar([...usuariosCache].filter((usuario) => {
                return (`${usuario.name} ${usuario.lastName}`.toLowerCase().match(nombreFiltrado.toLowerCase()))
            }))
        } else {
            setUsuariosParaMostrar([...usuariosCache])
        }
    }, [usuariosCache, nombreFiltrado])

    const filtrarUsuarios = (e: any) => {
        console.log(e.detail.value)
        setNombreFiltrado(e.detail.value)
        
    }


    const seleccionarUsuario = (index: number) => {
        const findUser = usuariosParaMostrar[index]
        const usuariosCambiados = [...usuariosCache].map(usuario => {
            if (usuario._id === findUser._id) {
                return {
                    ...usuario,
                    checked: findUser.checked ? false : true
                }
            } else {
                return usuario
            }
        })
        setUsuariosCache(usuariosCambiados)
        if (nombreFiltrado.length > 0) {
            setUsuariosParaMostrar(usuariosCambiados.filter((usuario) => {
                return (`${usuario.name} ${usuario.lastName}`.toLowerCase().match(nombreFiltrado.toLowerCase()))
            }))
        } else {
            setUsuariosParaMostrar(usuariosCambiados)
        }
    }

    const ordenPorNombre = (a: any, b: any) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1
        }
        return 0
    }
    
    const seleccionarUsuarios = () => {
        const usuariosSeleccionadosCache = [...usuariosCache].filter(usuario => {
            return usuario.checked
        })
        setUsuariosSeleccionados(usuariosSeleccionadosCache)
        const reunionCache: any = {...reunion, usuarios: usuariosSeleccionadosCache.map(usuario => {return usuario._id})}
        console.log(reunionCache)
        setReunion(reunionCache)
        closeModal()
    }
    return (
        <IonModal isOpen={usuariosOpenPopover} onDidDismiss={() => setUsuariosOpenPopover(false)}>
            <IonContent class="ion-padding">
                <IonButtons style={{position: 'absolute', top: 10, right: 10}}>
                    <IonButton onClick={closeModal}>
                        <IonIcon icon={close} />
                    </IonButton>
                </IonButtons>
                <div style={{padding: '0px 50px 0px 0px'}}>
                    <IonItem>
                        <IonLabel>
                            Buscar
                        </IonLabel>
                        <IonSearchbar onIonChange={filtrarUsuarios} />
                    </IonItem>
                </div>
                <div>
                    <IonItem button onClick={() => {setSeleccionarTodos(seleccionarTodos ? false : true)}}>
                        <IonCheckbox checked={seleccionarTodos}/>
                        <IonLabel style={{marginLeft: 10}}>
                            Seleccionar todos
                        </IonLabel>
                    </IonItem>
                </div>
                <div style={{maxHeight: 250, overflowY: 'auto'}}>
                    {
                        usuariosParaMostrar.sort(ordenPorNombre).map((usuario, index) => {
                            return (
                                <IonItem key={`${usuario.name}_${index}`} button onClick={() => {seleccionarUsuario(index)}}>
                                    <IonCheckbox checked={usuario.checked} /* value={usuario.checked} */ />
                                    <IonLabel style={{marginLeft: 10}}>
                                        {usuario.name} {usuario.lastName}
                                    </IonLabel>
                                </IonItem>
                            )
                        })
                    }
                </div>
                <br />
                <div>
                    Usuarios seleccionados: {usuariosSeleccionados.length}
                </div>
                <br />
                <IonButton onClick={() => {seleccionarUsuarios()}}>
                    Validar
                </IonButton>
            </IonContent>
        </IonModal>
    )
}