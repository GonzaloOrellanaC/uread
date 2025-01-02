import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonIcon, IonPage, IonRow, IonToolbar } from "@ionic/react"
import { gridOutline, listOutline, pencilOutline, personAddOutline, trashOutline } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { NewUserModal } from "../../../components/Modals"
import UserIdb from "../../../indexedDb/User.idb"
import { User } from "../../../interfaces/User.interface"
import userRouter from "../../../router/user.router"
import xlsx from "json-as-xlsx"
import { useUsersContext } from "../../../context/Users.context"
import {Pagination} from "@mui/material"

const UserAdminComponent = () => {
    const {users, init} = useUsersContext()
    const history = useHistory()
    const [openModal, setOpenModal] = useState(false)
    const [typeUsersList, setTypeUsersList] = useState('column')
    const [user, setUser] = useState<User>()
    const [usersCache, setUsersCache] = useState<User[]>([])

    const [groupUsers, setGroupUsers] = useState<any>()
    const [usersToShow, setUsersToShow] = useState<User[]>([])
    const [usersTable, setUsersTable] = useState(10)
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(0)

    useEffect(() => {
        setUsersCache(users)
    }, [users])
    
    useEffect(() => {
        if (usersCache.length > 0) {
            const usersToRead = usersCache.map((user, index) => {
                return {
                    ...user,
                    id: index + 1
                }
            })
            const usersGroup: any = {}
            let initIndex = 0
            let numberUsersByGroup = usersTable
            const pagesCache = (Math.floor(usersToRead.length / numberUsersByGroup) + 1)
            setPages(pagesCache)
            for (let i = 1; i < (pagesCache + 1); i++) {
                if (!usersGroup[i]) {
                    usersGroup[i] = usersToRead.slice(initIndex, (numberUsersByGroup))
                    initIndex = initIndex + usersTable
                    numberUsersByGroup = numberUsersByGroup + usersTable
                }
            }
            setGroupUsers(usersGroup)
        }
    }, [usersCache, usersTable])

    useEffect(() => {
        if (groupUsers) {
            console.log(groupUsers)
            setUsersToShow(groupUsers[page])
        }
    }, [groupUsers, page])

    useEffect(() => {
        console.log(usersToShow)
    }, [usersToShow])

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

    const changePage = (e: any, value: any) => {
        setPage(Number(value))
    }

    const deleteUser = async (user: User) => {
        if (window.confirm('Confirme que se eliminará el usuario')) {
            const response = await userRouter.deleteUser(user._id)
            if (response) {
                const myUid = localStorage.getItem('id-uread')
                closeModal()
                
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
        <IonPage>
            <IonContent class="ion-padding">
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
                        <div style={{ overflowY: 'auto', backgroundColor: 'transparent', maxHeight: 'calc(440px + 44px + 24.4px)', borderLeft: '#ccc 1px solid', borderRight: '#ccc 1px solid', borderBottom: '#ccc 1px solid' }}>
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
                                usersToShow.map((user) => {
                                    return (
                                        <IonRow key={user.id} style={{ borderTop: '#ccc 1px solid' }}>
                                            <IonCol sizeXs="0.5">
                                            <p style={{ margin: 5, fontSize: 12 }}>{user.id!}</p>
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
                                                    <IonButton fill={'outline'} color={'primary'} onClick={() => { (user.id! > 0) ? editUser(user) : alert('Super Usuario no puede ser editado') }}>
                                                        <IonIcon icon={pencilOutline} style={{ marginRight: 10 }} /> Edit
                                                    </IonButton>
                                                    <IonButton fill={'outline'} color={'danger'} onClick={() => { (user.id! > 0) ? deleteUser(user) : alert('Super Usuario no puede ser eliminado') }}>
                                                        <IonIcon icon={trashOutline} style={{ marginRight: 10 }} /> Delete
                                                    </IonButton>
                                                </IonButtons>
                                            </IonCol>
                                        </IonRow>
                                    )
                                })
                            }
                            <Pagination
                                style={{
                                    position:'absolute',
                                    right: 20,
                                    bottom: 20
                                }}
                                count={pages}
                                page={page}
                                onChange={changePage}
                                color="primary"
                            />
                            </div>
                        </div>
                    }
                </IonGrid>
                <NewUserModal open={openModal} closeModal={closeModal} user={user} deleteUser={deleteUser} />
            </IonContent>
        </IonPage>
    )
}

export default UserAdminComponent
