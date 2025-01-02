import { IonButton, IonButtons, IonHeader, IonIcon, IonMenuButton, IonTitle, IonToolbar } from '@ionic/react'
import { menuOutline } from 'ionicons/icons'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { LoginModal, RegistreModal } from '../components/Modals'
import UserIdb from '../indexedDb/User.idb'
import { User } from '../interfaces/User.interface'
import { menuController } from '@ionic/core/components';
import { LateralMenu } from './Lateral.menu'

interface ElementNavbar {
    id: number
    name: string
    state: boolean
    access: string
    path: string
}

const Menu = () => {
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
        },
        {
            id: 5,
            name: 'Tus clases',
            state: false,
            access: 'logged',
            path: '/meet'
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
        if (windowWidth > 890) {
            menuController.enable(false, 'lateral-menu')
        } else {
            menuController.enable(true, 'lateral-menu')
        }
    }, [windowWidth])
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

    const selectItem = (e: ElementNavbar, index: number) => {
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
        }
    }
    const toAdmin = () => {
        history.push('/admin')
        setInAdmin(true)
        const listLinksCache = [...listLinks]
        listLinksCache.forEach(l => {
            l.state = false
        })
        setListLinks(listLinksCache)
    }
    const toUserPage = () => {
        const id = localStorage.getItem('id-uread') || ''
        history.push(`/user/${id}`)
    }

    const openMenu = async () => {
        console.log('OPEN MENU')
        await menuController.open('lateral-menu');
    }
    return (
        <IonHeader>
            <LoginModal open={openLoginModal} closeModal={closeLoginModal} getDataModal={getDataModal}/>
            <RegistreModal open={openRegistreModal} closeModal={closeRegistreModal} />
            <IonToolbar className='menu-header'>
                <IonButtons slot='start' hidden={(windowWidth > 890) ? true : false}>
                    {/* <IonMenuButton></IonMenuButton> */}
                    <IonButton onClick={openMenu}>
                        <IonIcon slot='icon-only' icon={menuOutline} style={{ color: 'transparent' }} />
                    </IonButton>
                </IonButtons>
                <IonTitle slot={(windowWidth > 890) ? 'start' : ''} className='icon-logo-container'>
                    <img src={'/assets/icon/uread/uread_logo_transparente.png'} width={80} alt="logo-uread" />
                    <div hidden={(windowWidth < 768) ? true : false}>
                        <p className='title size-title'>Mamás en Acción <br /> por la Lectura</p>
                        {/* <p className='subTitle size-subTitle'>Read, Master, Succed.</p> */}
                    </div>
                </IonTitle>
                <IonButtons className='login-buttons' slot='end' hidden={(windowWidth > 1163) ? false : true}>
                    {
                        listLinks.map((e, i) => {
                            return (
                                <IonButton
                                    key={i}
                                    hidden={(e.access === 'general') ? false : (!isAuth && (e.access === 'no-logged') ? false : (isAuth && (e.access === 'logged') ? false : true))}
                                    color={e.state ? 'primary' : 'tertiary'}
                                    fill={e.state ? 'outline' : 'clear'}
                                    expand={'block'}
                                    onClick={() => { selectItem(e, i) }}>
                                    {e.name}
                                </IonButton>
                            )
                        })
                    }
                </IonButtons>
                <IonButtons slot='end' hidden={(windowWidth > 1163) ? true : false}>
                    <IonButton onClick={openMenu}>
                        <IonIcon slot='icon-only' icon={menuOutline} />
                    </IonButton>
                </IonButtons>
                <IonTitle className='login-buttons' slot='end'>
                    {
                        isAuth ?
                        <p className='heade-login' onClick={toUserPage}><strong>{userData?.name} {userData?.lastName}</strong></p>
                        :
                        <p className='heade-login' onClick={() => { setOpenLoginModal(true) }}>LOG IN / INGRESA</p>}
                    {
                        isAuth ?
                        <p className='heade-login' onClick={logout}>LOG OUT / CERRAR SESIÓN</p>
                        :
                        <p className='heade-login' onClick={() => { setOpenRegistreModal(true) }}>SIGN IN / REGISTRATE</p>
                    }
                    {
                        isAdmin ?
                        <IonButton size={'small'} fill={inAdmin ? 'outline' : 'clear'} color={'primary'} onClick={() => { toAdmin() }}>Administración</IonButton>
                        :
                        <p className='heade-login-premium'>URead Premium</p>
                    }
                </IonTitle>
            </IonToolbar>
        </IonHeader>
    )
}

export default Menu
