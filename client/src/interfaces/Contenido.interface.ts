import { TextList } from "./TextList.interface"

export interface Contenido {
    _id?: string
    nombreTexto: string
    audioEnUrl?: string | null
    audioEsUrl?: string | null
    imageUrl?: Image[]
    relator: string
    lenguajes: Lenguajes[]
    createdBy: string
    updatedBy: string
    createdAt?: Date
    updatedAt?: Date
    state: boolean
    nivel: string
    pdf?: PDFData[]
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
    urlAudio?: string
}

export interface ListaLenguajes {
    _id: string
    name: string
    language: string
}