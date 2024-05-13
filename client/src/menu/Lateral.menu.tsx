import { IonContent, IonItem, IonList, IonMenu } from "@ionic/react"
import { IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react'
import { menuOutline } from 'ionicons/icons'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { LoginModal, RegistreModal } from '../components/Modals'
import UserIdb from '../indexedDb/User.idb'
import { User } from '../interfaces/User.interface'
import { menuController } from '@ionic/core/components';

interface ElementNavbar {
    id: number
    name: string
    state: boolean
    access: string
    path: string
}

export const LateralMenu = () => {
    const routerList: ElementNavbar[] = [
        {
            id: 0,
            name: 'Inicio / Home',
            state: true,
            access: 'general',
            path: '/'
        },
        {
            id: 1,
            name: 'Quienes Somos / About Us',
            state: false,
            access: 'general',
            path: '/about-us'
        },
        /* {
            id: 2,
            name: 'Niveles / Levels',
            state: false,
            access: 'no-logged',
            path: '/levels'
        }, */
        {
            id: 4,
            name: 'Biblioteca / Library',
            state: false,
            access: 'logged',
            path: '/library'
        },
        {
            id: 3,
            name: 'Contáctanos / Contact Us',
            state: false,
            access: 'general',
            path: '/contact-us'
        }
    ]
    const history = useHistory()
    /* const [logged, setLogged] = useState(false) */
    const [listLinks, setListLinks] = useState<ElementNavbar[]>([])
    const [openLoginModal, setOpenLoginModal] = useState<boolean>(false)
    const [openRegistreModal, setOpenRegistreModal] = useState<boolean>(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [isAuth, setIsAuth] = useState<boolean>(false)
    const [userData, setUserData] = useState<User>()
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const [inAdmin, setInAdmin] = useState<boolean>(false)
    const [size, setSize] = useState(0)

    useEffect(() => {
        
    }, [])

    useEffect(() => {
        getUserIfIsAuth()
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleWindowResize);
        /* setLogged(window.localStorage.getItem('logged') ? true : false) */
        detectUrl(routerList)
    }, [])
    useEffect(() => {
        routerList.forEach((button, i) => {
            button.state = false
            if (button.path === history.location.pathname) {
                button.state = true
            }
        })
        setListLinks(routerList)
    },[history.location])
    const detectUrl = (buttons_: ElementNavbar[]) => {
        const location = history.location
        const buttonsCacheList = [...buttons_]
        let index = 0
        let inAdminCache = true
        buttonsCacheList.forEach((button, number) => {
            button.state = false
            if (location.pathname.includes(button.path)) {
                index = number
                inAdminCache = true
            } else if (location.pathname === '/') {
                index = 0
                inAdminCache = false
            }
        })
        setInAdmin(inAdminCache)
        if (!inAdminCache)
        buttonsCacheList[index].state = true
        setListLinks(buttonsCacheList)
    }
    useEffect(() => {
        if (isAuth && userData) {
            userDbInit()
            const data = localStorage.getItem('user-uread')
            if ((data === 'admin') || (data === 'SuperAdmin')) {
                setIsAdmin(true)
            }
        }
    }, [userData])

    const userDbInit = async () => {
        const {database} = await UserIdb.init()
        if (userData)
        await UserIdb.update(userData, database)
    }

    const selectItem = async (e: ElementNavbar, index: number) => {
        setInAdmin(false)
        const listLinksCache = [...listLinks]
        listLinksCache.forEach(l => {
            l.state = false
        })
        if (!inAdmin) {
            listLinksCache[index].state = true
        }
        setListLinks(listLinksCache)
        history.push(e.path)
        await menuController.close('lateral-menu');
    }
    const closeLoginModal = () => {
        setOpenLoginModal(false)
    }
    const closeRegistreModal = () => {
        setOpenRegistreModal(false)
    }
    const getDataModal = (data: any) => {
        if (data) {
            setIsAuth(data.isAuth)
            setUserData(data.user)
            localStorage.setItem('id-uread', data.user.id)
            localStorage.setItem('user-uread', data.user.roles[0].name)
        }
    }
    const getUserIfIsAuth = async () => {
        const id = localStorage.getItem('id-uread') || ''
        const {database} = await UserIdb.init()
        const response: {data?: User, state: boolean, error: any} = await UserIdb.readById(id, database)
        if (response.state){
            setIsAuth(true)
            setUserData(response.data)
        }
    }
    const logout = async () => {
        if (window.confirm('Confirme que desea cerrar sesión')) {
            setUserData(undefined)
            setIsAuth(false)
            const {database} = await UserIdb.init()
            const response = await UserIdb.readAll(database)
            response.data.forEach(async (data: any) => {
                await UserIdb.deleteDb(data.id, database)
            })
            localStorage.removeItem('id-uread')
            localStorage.removeItem('user-uread')
            setIsAdmin(false)
            const listLinksCache = [...listLinks]
            listLinksCache.forEach(l => {
                l.state = false
            })
            listLinksCache[0].state = true
            setListLinks(listLinksCache)
            history.replace('/')
            await menuController.close('lateral-menu');
        }
    }
    const toAdmin = async () => {
        history.push('/admin')
        setInAdmin(true)
        const listLinksCache = [...listLinks]
        listLinksCache.forEach(l => {
            l.state = false
        })
        setListLinks(listLinksCache)
        await menuController.close('lateral-menu')
    }
    const toUserPage = () => {
        const id = localStorage.getItem('id-uread') || ''
        history.push(`/user/${id}`)
    }

    return (
        <IonMenu menuId="lateral-menu" contentId="main-content" side="end">
            <LoginModal open={openLoginModal} closeModal={closeLoginModal} getDataModal={getDataModal}/>
            <RegistreModal open={openRegistreModal} closeModal={closeRegistreModal} />
            <IonContent>
                <div style={{paddingTop: 50}}>
                    {
                        isAuth &&
                        <p style={{marginLeft: 10, fontSize: 16, cursor: 'pointer'}} onClick={toUserPage}><strong>{userData?.name} {userData?.lastName}</strong></p>
                        
                    }
                    <IonList>
                    {
                        listLinks.map((e, i) => {
                            return (
                                <IonItem
                                    button
                                    key={i}
                                    hidden={(e.access === 'general') ? false : (!isAuth && (e.access === 'no-logged') ? false : (isAuth && (e.access === 'logged') ? false : true))}
                                    onClick={() => { selectItem(e, i) }}>
                                    {e.name}
                                </IonItem>
                            )
                        })
                    }
                    
                    {
                        !isAuth &&
                        <IonItem button onClick={async () => { setOpenLoginModal(true); await menuController.close('lateral-menu') }}>LOG IN / INGRESA</IonItem>
                    }
                    {
                        isAuth ?
                        <IonItem button onClick={logout}>LOG OUT / CERRAR SESIÓN</IonItem>
                        :
                        <IonItem button onClick={async () => { setOpenRegistreModal(true); await menuController.close('lateral-menu'); }}>SIGN IN / REGISTRATE</IonItem>
                    }
                    {
                        isAdmin &&
                        <IonItem button onClick={() => { toAdmin() }}>Administración</IonItem>
                        
                    }
                    </IonList>
                </div>
            </IonContent>
        </IonMenu>
    )
}