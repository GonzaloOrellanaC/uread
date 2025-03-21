import { IonAccordion, IonAccordionGroup, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonModal, IonRow, IonToolbar } from "@ionic/react"
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button } from "@mui/material"
import { camera, close, eye, eyeOffOutline, eyeOutline, pencil } from "ionicons/icons";
import { useEffect, useState } from "react";
/* import { Edit } from "../icons"; */
import { useAuthContext } from "../../../context/Auth.context";
import { useUsersContext } from "../../../context/Users.context";
import { User } from "../../../interfaces/User.interface";
import userRouter from "../../../router/user.router";

export const ProfileModal = ({open, handleClose}:{open: boolean, handleClose: () => void}) => {
    const {userData, setUserData} = useAuthContext()
    const {editUser} = useUsersContext()
    const [userToEdit, setUserToEdit] = useState<User>()
    const [editing, setIsEditing] = useState(false)
    const [dataEdited, setDataEdited] = useState(false)

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [openCurrentPassword, setOpenCurrentPassword] = useState(false)
    const [openNewPassword, setOpenNewPassword] = useState(false)
    const [openConformNewPassword, setOpenConformNewPassword] = useState(false)

    const [imageProfileFile, setImageProfileFile] = useState<any>()
    const [imageProfileBase64, setImageProfileBase64] = useState<string | ArrayBuffer | null>()


    useEffect(() => {
        setUserToEdit(userData)
    }, [userData])

    const editPassword = async () => {
        if (currentPassword.length > 0) {
            if (newPassword.length > 0) {
                if (confirmNewPassword.length > 0) {
                    if (newPassword === confirmNewPassword) {
                        const response = await userRouter.cambiarPassword(userData!._id, newPassword)
                        alert(response.msg)
                        setCurrentPassword('')
                        setNewPassword('')
                        setConfirmNewPassword('')
                        setOpenCurrentPassword(false)
                        setOpenNewPassword(false)
                        setOpenConformNewPassword(false)
                    } else {
                        alert('Nueva contraseña y su confirmación deben ser iguales.')
                    }
                } else {
                    alert('Debe ingresar la confirmación de su nueva contraseña')
                }
            } else {
                alert('Debe ingresar una nueva contraseña')
            }
        } else {
            alert('Debe ingresar contraseña actual')
        }
    }

    const encodeImageFileAsURL = (element: any) => {
        if (element.target.files[0]) {
            const file = element.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setDataEdited(true)
                setImageProfileFile(element.target.files[0])
                console.log('RESULT', reader.result)
                setImageProfileBase64(reader.result)
            }
            reader.readAsDataURL(file);
        }
    }

      

    return (
        <IonModal
            isOpen={open}
            onWillDismiss={() => {handleClose(); setDataEdited(false); setUserToEdit(undefined)}}
            backdropDismiss={false}
            className='profile-management-modal'
        >
            <IonContent>
                <IonToolbar>
                    <IonButtons slot='end'>
                        <IonButton onClick={() => {handleClose()}}>
                            <IonIcon icon={close} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
                <IonAccordionGroup>
                    <IonAccordion value="first">
                        <IonItem slot="header" color="light">
                        <p style={{fontWeight: 'bold', fontSize: 16}}>
                            Perfil
                        </p>
                        </IonItem>
                        <div className="ion-padding" slot="content">
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="5">
                                        <div style={{position: 'relative'}}>
                                            <img src={userToEdit?.profileImage ? userToEdit.profileImage : imageProfileBase64 ? imageProfileBase64.toString() : `/assets/images/user-profile-default.svg`} style={{borderRadius: '50%', zIndex: 1}} width={114} height={114} alt="" />
                                            {/* {editing && <button onClick={() => {
                                                const imageInput = document.getElementById('image-profile')
                                                imageInput?.click()
                                            }} style={{position: 'absolute', top: 0, left: 0, backgroundColor: '#00000035', borderRadius: '50%', width: 114, height: 114, zIndex: 2}}>
                                                <IonIcon src={camera} style={{color: 'white', fontSize: 50, opacity: 1}} />
                                            </button>} */}
                                            <input onChange={encodeImageFileAsURL} id={'image-profile'} type={'file'} multiple={false} accept="image/jpeg" style={{display: 'none'}} />
                                        </div>
                                        <p style={{color:'#858585', fontSize: 12}}>
                                            Pronto podrás poner tu imagen de perfil acá :).
                                        </p>
                                        {/* <p style={{color:'#858585', fontSize: 12}}>
                                            La imagen cargada debe tener 500 px de ancho y 500 px de largo.
                                        </p> */}
                                    </IonCol>
                                    <IonCol size="7">
                                        <div>
                                            <p style={{fontWeight: 'bold', fontSize: 16}}>Nombre</p>
                                            {
                                                editing ?
                                                <input style={{
                                                    width: '100%',
                                                    minHeight: 31,
                                                    borderRadius: 10,
                                                    border: '1px solid #E0E0E0'
                                                }} type="text"
                                                onChange={(e) => {
                                                    setDataEdited(true)
                                                    setUserToEdit({
                                                        ...userToEdit!,
                                                        name: e.target.value
                                                    })
                                                }}
                                                value={userToEdit?.name} />
                                                :
                                                <p style={{minHeight: 31}}>
                                                    {userToEdit?.name}
                                                </p>
                                            }
                                        </div>
                                        <div>
                                            <p style={{fontWeight: 'bold', fontSize: 16}}>Apellido</p>
                                            {
                                                editing ?
                                                <input style={{
                                                    width: '100%',
                                                    minHeight: 31,
                                                    borderRadius: 10,
                                                    border: '1px solid #E0E0E0'
                                                }}
                                                onChange={(e) => {
                                                    setDataEdited(true)
                                                    setUserToEdit({
                                                        ...userToEdit!,
                                                        lastName: e.target.value
                                                    })
                                                }}
                                                type="text" value={userToEdit?.lastName} />
                                                :
                                                <p style={{minHeight: 31}}>
                                                    {userToEdit?.lastName}
                                                </p>
                                            }
                                        </div>
                                        <div>
                                            <p style={{fontWeight: 'bold', fontSize: 16}}>Email</p>
                                            {
                                                editing ?
                                                <input style={{
                                                    width: '100%',
                                                    minHeight: 31,
                                                    borderRadius: 10,
                                                    border: '1px solid #E0E0E0'
                                                }} type="email"
                                                onChange={(e) => {
                                                    setDataEdited(true)
                                                    setUserToEdit({
                                                        ...userToEdit!,
                                                        email: e.target.value
                                                    })
                                                }}
                                                value={userToEdit?.email} />
                                                :
                                                <p style={{minHeight: 31}}>
                                                    {userToEdit?.email}
                                                </p>
                                            }
                                        </div>
                                        
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        <br />
                        {!editing ? <IonToolbar>
                                <IonButtons slot={'end'}>
                                    <IonButton onClick={() => {setIsEditing(true)}}>
                                        <IonIcon src={pencil} /> Editar
                                    </IonButton>
                                </IonButtons>
                            </IonToolbar>
                            :
                            <div style={{width: '100%', textAlign: 'center', minHeight: 56}}>
                                <button 
                                onClick={() => {userToEdit && editUser(userToEdit)}}
                                style={{
                                    backgroundColor: '#41507A',
                                    minWidth: 200,
                                    minHeight: 48,
                                    borderRadius: 10,
                                    border: 'transparent',
                                    fontSize: 14,
                                    color: 'white'
                                }}>
                                    Guardar Cambios
                                </button>  
                            </div>  
                        }
                        </div>
                    </IonAccordion>
                    <IonAccordion value="second">
                        <IonItem slot="header" color="light">
                        <p style={{fontWeight: 'bold', fontSize: 16}}>
                            Cambiar Contraseña
                        </p>
                        </IonItem>
                        <div className="ion-padding" slot="content">
                            <p style={{fontWeight: 'bold', fontSize: 16, margin: '5px 0px'}}>Contraseña Actual</p>
                            <div style={{position: 'relative'}}>
                                <input style={{
                                    width: '100%',
                                    minHeight: 31,
                                    borderRadius: 10,
                                    border: '1px solid #E0E0E0'
                                }} type={openCurrentPassword ? 'text' : 'password'} value={currentPassword} onChange={(e) =>{setCurrentPassword(e.target.value)}} />
                                <button
                                    style={{position: 'absolute', right: 10, top: 5, backgroundColor: 'transparent'}}
                                    onClick={() => {
                                        setOpenCurrentPassword(openCurrentPassword ? false : true)
                                    }}
                                >
                                    <IonIcon style={{fontSize: 22, color: '#ccc'}} icon={openCurrentPassword ? eyeOffOutline : eyeOutline} />
                                </button>
                            </div>
                            <p style={{fontWeight: 'bold', fontSize: 16, margin: '5px 0px'}}>Nueva Contraseña</p>
                            <div style={{position: 'relative'}}>
                                <input style={{
                                    width: '100%',
                                    minHeight: 31,
                                    borderRadius: 10,
                                    border: '1px solid #E0E0E0'
                                }} type={openNewPassword ? 'text' : 'password'} value={newPassword} onChange={(e) =>{setNewPassword(e.target.value)}} />
                                <button
                                    style={{position: 'absolute', right: 10, top: 5, backgroundColor: 'transparent'}}
                                    onClick={() => {
                                        setOpenNewPassword(openNewPassword ? false : true)
                                    }}
                                >
                                    <IonIcon style={{fontSize: 22, color: '#ccc'}} icon={openCurrentPassword ? eyeOffOutline : eyeOutline} />
                                </button>
                            </div>
                            <p style={{fontWeight: 'bold', fontSize: 16, margin: '5px 0px'}}>Confirme Contraseña</p>
                            <div style={{position: 'relative'}}>
                                <input style={{
                                    width: '100%',
                                    minHeight: 31,
                                    borderRadius: 10,
                                    border: '1px solid #E0E0E0'
                                }} type={openConformNewPassword ? 'text' : 'password'} value={confirmNewPassword} onChange={(e) =>{setConfirmNewPassword(e.target.value)}} />
                                <button
                                    style={{position: 'absolute', right: 10, top: 5, backgroundColor: 'transparent'}}
                                    onClick={() => {
                                        setOpenConformNewPassword(openConformNewPassword ? false : true)
                                    }}
                                >
                                    <IonIcon style={{fontSize: 22, color: '#ccc'}} icon={openCurrentPassword ? eyeOffOutline : eyeOutline} />
                                </button>
                            </div>
                            <br />
                            <div style={{width: '100%', textAlign: 'center', minHeight: 56}}>
                                <button 
                                onClick={() => {editPassword() }}
                                style={{
                                    backgroundColor: '#41507A',
                                    minWidth: 200,
                                    minHeight: 48,
                                    borderRadius: 10,
                                    border: 'transparent',
                                    fontSize: 14,
                                    color: 'white'
                                }}>
                                    Guardar Nueva Contraseña
                                </button>  
                            </div> 
                        </div>
                    </IonAccordion>
                </IonAccordionGroup>
            </IonContent>
        </IonModal>
    )
}