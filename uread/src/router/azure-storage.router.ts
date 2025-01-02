import axios from "axios";
import { api } from "../configuration/environments";

const uploadImage = async (image: any, typeImage: string ) => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('typeImage', typeImage)
    const config = {
        headers: { "Content-Type": "multipart/form-data" },
    }
    const response = await axios.post(api.url + '/api/azure-storage/uploadImageStorage', formData, config)
    return response
}

const uploadAudio = async (audio: any, typeAudio: string ) => {
    const formData = new FormData();
    formData.append('audio', audio);
    formData.append('typeAudio', typeAudio)
    const config = {
        headers: { "Content-Type": "multipart/form-data" },
    }
    const response = await axios.post(api.url + '/api/azure-storage/uploadAudioStorage', formData, config)
    return response
}

const uploadDocument = async (document: any, typeDocument: string ) => {
    const formData = new FormData();
    formData.append('document', document);
    formData.append('typeDocument', typeDocument)
    const config = {
        headers: { "Content-Type": "multipart/form-data" },
    }
    const response = await axios.post(api.url + '/api/azure-storage/uploadDocumentStorage', formData, config)
    return response
}

const deleteFile = async (blobName: string, typeBlob: string) => {
    const response = await axios.post(api.url + '/api/azure-storage/deleteFileStorage', {
        blobName: blobName,
        typeBlob: typeBlob
    })
    return response
}

export default {
    uploadImage,
    uploadAudio,
    uploadDocument,
    deleteFile
}