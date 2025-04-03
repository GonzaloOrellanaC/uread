import { ObjectId } from "mongoose";
import { Transcription } from "openai/resources/audio/transcriptions";
export interface Contenido {
    _id: ObjectId;
    nombreTexto: string;
    descripcion?: string;
    audioEnUrl: string;
    audioEsUrl: string;
    imageUrl: Image[];
    relator: ObjectId;
    lenguajes: Lenguajes[];
    createdBy: ObjectId;
    updatedBy: ObjectId;
    createdAt: Date;
    updatedAt: Date;
    state: boolean;
    nivel: ObjectId;
    nivelData: any;
    pdf: PDFData[];
    idContenido?: number;
}
export interface PDFData {
    pdfUrl: string;
    description: string;
}
export interface Image {
    url: string;
    description: string;
}
export interface Lenguajes {
    lenguaje: Transcription;
    listaTexto?: TextList[];
    urlAudio: string;
    contenido?: string;
    transcripcion?: Object;
}
export interface ListaLenguajes {
    _id: string;
    name: string;
    language: string;
}
export interface TextList {
    text: string;
    init: number;
    finish: number;
    index: number;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
}
