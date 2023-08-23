import { ObjectId } from "mongoose"

export interface Contenido {
    _id: ObjectId
    nombreTexto: string
    audioEnUrl: string
    audioEsUrl: string
    imageUrl: Image[]
    relator: ObjectId
    lenguajes: Lenguajes[]
    createdBy: ObjectId
    updatedBy: ObjectId
    createdAt: Date
    updatedAt: Date
    state: boolean,
    nivel: ObjectId
    pdf: PDFData[]
}

export interface PDFData {
    pdfUrl: string
    description: string
}

export interface Image {
    url: string
    description: string
}

export interface Lenguajes {
    lenguaje: string
    listaTexto: TextList[]
    urlAudio: string
}

export interface ListaLenguajes {
    _id: string
    name: string
    language: string
}

export interface TextList {
    text: string
    init: number
    finish: number
    index: number
    createdBy?: string
    updatedBy?: string
    createdAt?: string
    updatedAt?: string
}