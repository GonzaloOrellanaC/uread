import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonLabel, IonRow, IonTitle } from "@ionic/react"
import { useSocketContext } from "../../context/Socket.context"
import { useEffect, useState } from "react";
import { videocamOffOutline, videocamOutline } from "ionicons/icons";

export const MeetContainer = () => {
    const { answerCall, name, callAccepted, myVideo, userVideo, callEnded, stream, call, setName, leaveCall, callUser, me, setEnableVideo } = useSocketContext()
    const [idToCall, setIdToCall] = useState('');

    useEffect(() => {
        console.log(stream)
    }, [stream])

    const copyToClipboard = () => {
        navigator.clipboard.writeText(me);
        alert("Copied the text: " + me);      
    }

    return (
        <IonContent className='page-container'>
            <div style={{height: '75vh', width: '100%', backgroundColor: 'black', position: 'relative'}}>
                <div style={{position: 'absolute', bottom: 10, right: 10, width: 200, height: 150, backgroundColor: 'white'}}>
                    {stream && <video playsInline muted ref={myVideo} autoPlay width="100%" height={'100%'} />}
                </div>
                <div style={{width: '100%', position: 'absolute', bottom: 10}}>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                
                            </IonCol>
                            <IonCol sizeLg="4">
                                <IonButtons style={{backgroundColor: 'white'}}>
                                    <IonButton onClick={() => {setEnableVideo(stream ? false : true)}}>
                                        <IonIcon icon={stream ? videocamOffOutline: videocamOutline} />
                                    </IonButton>
                                </IonButtons>
                            </IonCol>
                            <IonCol>
                                
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
            </div>
            {/* {
                stream && (
                    <IonGrid>
                        <IonRow>
                            <IonTitle>
                                {name || 'Name'}
                            </IonTitle>
                            <video playsInline muted ref={myVideo} autoPlay width="600" />
                        </IonRow>
                    </IonGrid>
                )
            }
            {
                callAccepted && !callEnded && (
                    <IonGrid>
                        <IonRow>
                            <IonTitle>
                                {call.name || 'Name'}
                            </IonTitle>
                            <video playsInline ref={userVideo} autoPlay width="600" />
                        </IonRow>
                    </IonGrid>
                )
            }
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <IonTitle> Account Info </IonTitle>
                        <IonLabel>Username</IonLabel>
                        <IonInput type='text' value={name} onIonChange={(e) => ( e.target.value && setName(e.target.value.toString()))} style={{width:"100%"}} />
                            <IonButton onClick={copyToClipboard}>
                                Copy ID
                            </IonButton>
                    </IonCol>
                    <IonCol >
                        <IonTitle> Make a Call </IonTitle>
                        <IonLabel> User id to call </IonLabel>
                        <IonInput type='text' value={idToCall} onIonChange={(e) => {e.target.value && setIdToCall(e.target.value.toString())}} style={{width:"100%"}} />
                        {
                            callAccepted && !callEnded ? (
                                <IonButton onClick={leaveCall}>
                                    Hang up
                                </IonButton>
                            ) : (
                                <IonButton onClick={() => callUser(idToCall)}>
                                    Call
                                </IonButton>
                            )
                        }
                    </IonCol>
                </IonRow>
            </IonGrid>
            {call && call.isReceivingCall && !callAccepted && (
                    <IonGrid>
                        <IonTitle > {call.name} is calling </IonTitle>
                        <IonButton onClick={answerCall}>
                            Answer Call
                        </IonButton>
                    </IonGrid>
                )} */}
        </IonContent>
    )
}