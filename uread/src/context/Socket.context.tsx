import { createContext, useContext, useEffect, useRef, useState } from "react";
import { api } from '../configuration/environments'
import Peer from 'simple-peer';

import {io} from 'socket.io-client'

interface SocketContextValues {
    call: any
    callAccepted: boolean
    callEnded: boolean
    myVideo: any
    userVideo: any
    stream: any
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    me: string
    callUser: (id: any) => void
    leaveCall: () => void
    answerCall: () => void
    setEnableVideo: React.Dispatch<React.SetStateAction<boolean>>
    setEnableAudio: React.Dispatch<React.SetStateAction<boolean>>
}
const socket = io(api.url);

export const SocketContext = createContext<SocketContextValues>({} as SocketContextValues)

export const SocketProvider = (props: any) => {
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState<any>();
    const [name, setName] = useState('');
    const [call, setCall] = useState<any>();
    const [me, setMe] = useState('');
    const [enableVideo, setEnableVideo] = useState(true)
    const [enableAudio, setEnableAudio] = useState(true)
    const myVideo: any = useRef();
    const userVideo: any = useRef();
    const connectionRef: any = useRef();

    useEffect(() => {
        if (!enableVideo) {
            if (stream) {
                stream.getTracks().forEach((track: any) => {
                    track.stop();
                });
                setStream(undefined)
            }
        }
    }, [enableVideo])
    
    useEffect(() => {
        if (enableAudio || enableVideo) {
            /* navigator.mediaDevices.getUserMedia({ video: enableVideo, audio: enableAudio })
            .then((currentStream) => {
                setStream(currentStream);
                if (currentStream) {
                    if (myVideo && myVideo.current) {
                        myVideo.current.srcObject = currentStream;
                        console.log(myVideo)
                    }
                }
            }); */
        }
        
        socket.on('me', (id) => setMe(id));
        socket.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
    }, [enableVideo, enableAudio]);

    
    
    const answerCall = () => {
        if (call) {
            setCallAccepted(true);
            const peer = new Peer({ initiator: false, trickle: false, stream });
            peer.on('signal', (data: any) => {
                socket.emit('answerCall', { signal: data, to: call.from });
            });
            peer.on('stream', (currentStream: any) => {
                userVideo.current.srcObject = currentStream;
            });
            peer.signal(call.signal);
            connectionRef.current = peer;
        }
    };
    
    const callUser = (id: any) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });
        peer.on('signal', (data: any) => {
                socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
        });
        peer.on('stream', (currentStream: any) => {
            userVideo.current.srcObject = currentStream;
        });
        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });
        connectionRef.current = peer;
    };
    
    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
        window.location.reload();
    };

    const provider: SocketContextValues = {
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        setEnableVideo,
        setEnableAudio
    }

    return (
        <SocketContext.Provider value={provider}>
            {props.children}
        </SocketContext.Provider>
    )
}

export const useSocketContext = () => useContext(SocketContext)