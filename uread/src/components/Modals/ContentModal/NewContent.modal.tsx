import { IonContent, IonItem, IonLabel, IonModal, IonToggle } from "@ionic/react"
import { ModalData } from "../../../interfaces/ModalData.interface"
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useRef, useState } from "react";

const NewContentModal = ({open, closeModal, getDataModal}: ModalData) => {
    const commands: any[] = [
        {
          command: "open *",
          callback: (website: any) => {
            window.open("http://" + website.split(" ").join(""));
          },
        },
        {
          command: "change background colour to *",
          callback: (color: string) => {
            document.body.style.background = color;
          },
        },
        {
          command: "reset",
          callback: () => {
            handleReset();
          },
        },
        ,
        {
          command: "reset background colour",
          callback: () => {
            document.body.style.background = `rgba(0, 0, 0, 0.8)`;
          },
        },
      ];
    const { transcript, resetTranscript } = useSpeechRecognition({commands});
    const [isListening, setIsListening] = useState(false);
    const microphoneRef = useRef<any>(null);
    const [language, setLanguage] = useState('en-US')
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return (
        <div className="mircophone-container">
            Browser is not Support Speech Recognition.
        </div>
        );
    }
    const handleListing = () => {
        setIsListening(true);
        if (microphoneRef.current)
        microphoneRef.current.classList.add("listening");
        SpeechRecognition.startListening({
            continuous: true,
            language: language    
        });
    };
    const stopHandle = () => {
        setIsListening(false);
        microphoneRef.current.classList.remove("listening");
        SpeechRecognition.stopListening();
    };
    const handleReset = () => {
        stopHandle();
        resetTranscript();
    };

    return (
        <IonModal
            isOpen={open}
            onWillDismiss={closeModal}
        >
            <IonContent className="ion-padding">
            <div /* className="microphone-wrapper" */>
            <IonItem>
                <IonLabel>{(language==='en-US') ? 'English' : 'Spanish'}</IonLabel>
                <IonToggle slot="end" checked={(language==='en-US') ? true : false} onIonChange={() => {
                    if(language==='en-US') {
                        setLanguage('es-CL')
                    } else {
                        setLanguage('en-US')
                    }
                }}></IonToggle>
            </IonItem>
                <div className="mircophone-container">
                    <div
                    className="microphone-icon-container"
                    ref={microphoneRef}
                    onClick={handleListing}
                    >
                    <img src={'https://cdn-icons-png.flaticon.com/512/1436/1436746.png'} className="microphone-icon" />
                    </div>
                    <div className="microphone-status">
                    {isListening ? "Listening........." : "Click to start Listening"}
                    </div>
                    {isListening && (
                    <button className="microphone-stop btn" onClick={stopHandle}>
                        Stop
                    </button>
                    )}
                </div>
                {transcript && (
                    <div className="microphone-result-container">
                    <div className="microphone-result-text">{transcript}</div>
                    <button className="microphone-reset btn" onClick={handleReset}>
                        Reset
                    </button>
                    </div>
                )}
                </div>
            </IonContent>
        </IonModal>
    )
}

export default NewContentModal
