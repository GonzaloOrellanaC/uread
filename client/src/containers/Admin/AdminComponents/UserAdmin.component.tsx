import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonGrid, IonIcon, IonRow, IonToolbar } from "@ionic/react"
import { gridOutline, listOutline, pencilOutline, personAddOutline, trashOutline } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { NewUserModal } from "../../../components/Modals"
import UserIdb from "../../../indexedDb/User.idb"
import { User } from "../../../interfaces/User.interface"
import userRouter from "../../../router/user.router"
import xlsx from "json-as-xlsx"

const UserAdminComponent = () => {
    const history = useHistory()
    const [openModal, setOpenModal] = useState(false)
    const [users, setUsers] = useState<User[]>([])
    const [typeUsersList, setTypeUsersList] = useState('column')
    const [user, setUser] = useState<User>()
    
    useEffect(() => {
        init()
    }, [])

    const changeView = () => {
        if (typeUsersList==='column') {
            setTypeUsersList('list')
        } else {
            setTypeUsersList('column')
        }
    }

    const toExcel = () => {
        if (users.length > 0) {
            const data = [
                {
                  sheet: "Adults",
                  columns: [
                    { label: "ID", value: "id" },
                    { label: "Nombre", value: "name" },
                    { label: "Email", value: "email" },
                    { label: "Rol", value: "rol" }
                  ],
                  content: [],
                },
            ]
            const contenido: {
                id: number,
                name: string,
                email: string,
                rol: string
            }[] = []
            users.forEach((user, index) => {
                let roles = ''
                user.roles.forEach((rol, i) => {
                    if (user.roles.length > 1) {
                        if (i < (user.roles.length -1)) {
                            roles += `${rol.name}, `
                        } else {
                            roles += rol.name
                        }
                    } else {
                        roles += rol.name
                    }
                    
                })
                const dataContenido: {
                    id: number,
                    name: string,
                    email: string,
                    rol: string
                } = {
                    id: index+1,
                    name: `${user.name} ${user.lastName}`,
                    email: `${user.email}`,
                    rol: roles
                }
                contenido.push(dataContenido)
            })
            data[0].content = contenido as any
            xlsx(data, {
                fileName: `${Date.now()}`
            })
        }
    }

    const init = async () => {
        const response = await userRouter.getUsers()
        setUsers(response.data)
    }

    const closeModal = () => {
        setOpenModal(false)
        init()
    }

    const openNewUserModal = () => {
        setUser(undefined)
        setOpenModal(true)
    }

    const editUser = (user: User) => {
        setUser(user)
        setOpenModal(true)
    }

    const deleteUser = async (user: User) => {
        if (window.confirm('Confirme que se eliminará el usuario')) {
            const response = await userRouter.deleteUser(user._id)
            if (response) {
                const myUid = localStorage.getItem('id-uread')
                closeModal()
                setUsers([])
                if (myUid === user._id) {
                    const {database} = await UserIdb.init()
                    const res = await UserIdb.readAll(database)
                    res.data.forEach(async (data: any) => {
                        console.log(data)
                        await UserIdb.deleteDb(data.id, database)
                    })
                    localStorage.removeItem('id-uread')
                    localStorage.removeItem('user-uread')
                    history.replace('/')
                    window.location.reload()
                } else {
                    init()
                }
            }
        }
    }

    return (
        <div style={{overflowY: 'auto', height: 'calc(100vh - 240px)'}}>
            <IonToolbar className='toolbar-personalized'>
                <h2>Usuarios</h2>
                <IonButtons slot={'end'}>
                    <IonButton fill={'outline'} color={'primary'} slot="end" onClick={toExcel}>
                        Exportar a excel
                    </IonButton>
                    {/* <IonButton fill={'outline'} color={'primary'} slot="end" onClick={changeView}>
                        <IonIcon icon={(typeUsersList==='column') ? listOutline : gridOutline} style={{ marginRight: 10 }}/> {(typeUsersList==='column') ? 'Ver Listado' : 'Ver Tarjetas'}
                    </IonButton> */}
                    <IonButton fill={'outline'} color={'primary'} slot="end" onClick={openNewUserModal}>
                        <IonIcon icon={personAddOutline} style={{ marginRight: 10 }}/> Nuevo Usuario
                    </IonButton>
                </IonButtons>
            </IonToolbar>
            <IonGrid>
                {
                    /* (typeUsersList === 'column')
                    ?
                    <IonRow>
                        {
                            users.map((user, index) => {
                                return (
                                    <IonCol key={index} sizeXs={'12'} sizeSm={'12'} sizeMd={'6'} sizeLg={'4'}>
                                        <IonCard button onClick={() => { (index > 0) ? editUser(user) : alert('Super Usuario no puede ser editado') }}>
                                            <IonCardContent>
                                                <IonRow>
                                                    <IonCol>
                                                        <h1>
                                                            {user.name} {user.lastName}
                                                        </h1>
                                                    </IonCol>
                                                    <IonCol>
                                                        <div className="image-avatar">
                                                            <img src={user.profileImage ? user.profileImage : './assets/images/user-profile-default.svg'} height={75} alt="" />
                                                        </div>
                                                    </IonCol>
                                                </IonRow>
                                                <div className="userData">
                                                    <p>
                                                        R.U.N.: {user.run}
                                                    </p>
                                                    <p>
                                                        Email: {user.email}
                                                    </p>
                                                    <p>
                                                        Roles:
                                                    </p>
                                                    {user.roles.map((role, i) => {
                                                        return (
                                                            <p key={i} style={{ display: 'inline-block', margin: 5 }}>
                                                                {`${role.name}`}{(i === (user.roles.length - 1)) ? '' : ', '}
                                                            </p>
                                                        )
                                                    })}
                                                    <p>
                                                        Nivel: {user.levelUser}
                                                    </p>
                                                    <p style={{ color: user.premium ? 'green' : 'brown', fontWeight: 'bold' }}>
                                                        Acceso: {user.premium ? 'Premium' : 'Free'}
                                                    </p>
                                                </div>
                                            </IonCardContent>
                                        </IonCard>
                                    </IonCol>
                                )
                            })
                        }
                    </IonRow>
                    : */
                    <div style={{ overflowY: 'auto', backgroundColor: 'transparent', height: 'calc(100vh - 315px)', borderLeft: '#ccc 1px solid', borderRight: '#ccc 1px solid', borderBottom: '#ccc 1px solid' }}>
                        <IonRow style={{ borderTop: '#ccc 1px solid' }}>
                            <IonCol sizeXs="0.5" style={{ textAlign: 'center', borderRight: '#ccc 1px solid' }}>
                                
                            </IonCol>
                            <IonCol sizeXs="0.5" style={{ textAlign: 'center', borderRight: '#ccc 1px solid' }}>
                                
                            </IonCol>
                            <IonCol sizeXs="2" style={{ textAlign: 'center', borderRight: '#ccc 1px solid' }}>
                                <p style={{ margin: 0, fontSize: 12 }}>Nombre</p>
                            </IonCol>
                            <IonCol sizeXs="1" style={{ textAlign: 'center', borderRight: '#ccc 1px solid' }}>
                                <p style={{ margin: 0, fontSize: 12 }}>Nivel</p>
                            </IonCol>
                            <IonCol sizeXs="3" style={{ textAlign: 'center', borderRight: '#ccc 1px solid' }}>
                                <p style={{ margin: 0, fontSize: 12 }}>Email</p>
                            </IonCol>
                            <IonCol sizeXs="2" style={{ textAlign: 'center', borderRight: '#ccc 1px solid' }}>
                                <p style={{ margin: 0, fontSize: 12 }}>Roles</p>
                            </IonCol>
                            <IonCol sizeXs="2" style={{ textAlign: 'center'}}>
                                <p style={{ margin: 0, fontSize: 12 }}>Actions</p>
                            </IonCol>
                        </IonRow>
                        <div>
                        {
                            users.map((user, index) => {
                                return (
                                    <IonRow key={index} style={{ borderTop: '#ccc 1px solid' }}>
                                        <IonCol sizeXs="0.5">
                                        <p style={{ margin: 5, fontSize: 12 }}>{index+1}</p>
                                        </IonCol>
                                        <IonCol sizeXs="0.5" style={{ textAlign: 'center', borderRight: '#ccc 1px solid' }}>
                                            <img className="image-profile-list" src={user.profileImage ? user.profileImage : './assets/images/user-profile-default.svg'} height={30} alt="" />
                                        </IonCol>
                                        <IonCol sizeXs="2" style={{ textAlign: 'center', borderRight: '#ccc 1px solid' }}>
                                            <p style={{ margin: 5, fontSize: 12 }}>{user.name} {user.lastName}</p>
                                        </IonCol>
                                        <IonCol sizeXs="1" style={{ textAlign: 'center', borderRight: '#ccc 1px solid' }}>
                                            <p style={{ margin: 5, fontSize: 12 }}>{user.levelUser}</p>
                                        </IonCol>
                                        <IonCol sizeXs="3" style={{ textAlign: 'center', borderRight: '#ccc 1px solid' }}>
                                            <p style={{ margin: 5, fontSize: 12 }}>{user.email}</p>
                                        </IonCol>
                                        <IonCol sizeXs="2" style={{ textAlign: 'center', borderRight: '#ccc 1px solid' }}>
                                            {user.roles.map((role, i) => {
                                                return (
                                                    <p key={i} style={{ display: 'inline-block', margin: 5, fontSize: 12 }}>
                                                        {`${role.name}`}{(i === (user.roles.length - 1)) ? '' : ', '}
                                                    </p>
                                                )
                                            })}
                                        </IonCol>
                                        <IonCol sizeXs="2" style={{ textAlign: 'center' }}>
                                            <IonButtons>
                                                <IonButton fill={'outline'} color={'primary'} onClick={() => { (index > 0) ? editUser(user) : alert('Super Usuario no puede ser editado') }}>
                                                    <IonIcon icon={pencilOutline} style={{ marginRight: 10 }} /> Edit
                                                </IonButton>
                                                <IonButton fill={'outline'} color={'danger'} onClick={() => { (index > 0) ? deleteUser(user) : alert('Super Usuario no puede ser eliminado') }}>
                                                    <IonIcon icon={trashOutline} style={{ marginRight: 10 }} /> Delete
                                                </IonButton>
                                            </IonButtons>
                                        </IonCol>
                                    </IonRow>
                                )
                            })
                        }
                        </div>
                    </div>
                }
            </IonGrid>
            <NewUserModal open={openModal} closeModal={closeModal} user={user} deleteUser={deleteUser} />
        </div>
    )
}

export default UserAdminComponent
