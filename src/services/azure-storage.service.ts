import { env } from '@/configs';
import { BlobServiceClient  } from '@azure/storage-blob';
import { Response, Request, NextFunction } from 'express';

const blobServiceClient = BlobServiceClient.fromConnectionString(env.storageApi.accessKeys);

const createContainerIfNotExist = (containerName: string) => {
    return new Promise<boolean>(resolve => {
        blobServiceClient.createContainer(containerName)
        .then(ele=>{

            resolve(true)
        },err => {
            resolve(false)
        })
    })
}

const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    /* const { typeImage } = req.body */
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            })
        } else {
            let image = req.files[0];
            /* console.log(req.body, image) */
            const containerName = `contenido`
            const createContainer = await createContainerIfNotExist(containerName)
            if(createContainer) {

            }else{

            }
            const nameFile = `${Date.now()}.${image.mimetype.replace('image/', '')}`
            const blobName = `imagenes/${nameFile}`
            /* console.log(blobName) */
            const containerClient = blobServiceClient.getContainerClient(containerName)
            const blockBlobClient = containerClient.getBlockBlobClient(blobName)
            const uploadBlobResponse = await blockBlobClient.uploadData(image.buffer)
            if(uploadBlobResponse) {
                const blobClient = containerClient.getBlobClient(blobName)
                const downloadBlockBlobResponse = blobClient.url
                res.send({
                    status: true,
                    message: 'Imagen is uploaded',
                    data: {
                        url: downloadBlockBlobResponse,
                        description: nameFile
                    }
                })
            }
        }
    } catch(err) {
        res.status(500).send(err)
    }
}

const uploadAudio = async (req: Request, res: Response, next: NextFunction) => {
    /* const { typeAudio } = req.body */
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let audio = req.files[0]
            const containerName = `contenido`
            const createContainer = await createContainerIfNotExist(containerName)
            if(createContainer) {

            }else{

            };
            const blobName = `audios/${audio.originalname}`
            console.log(blobName)
            const containerClient = blobServiceClient.getContainerClient(containerName)
            const blockBlobClient = containerClient.getBlockBlobClient(blobName)
            const uploadBlobResponse = await blockBlobClient.uploadData(audio.buffer)
            if(uploadBlobResponse) {
                const blobClient = containerClient.getBlobClient(blobName)
                const downloadBlockBlobResponse = blobClient.url
                res.send({
                    status: true,
                    message: 'Audio is uploaded',
                    data: {
                        url: downloadBlockBlobResponse,
                        description: audio.originalname
                    }
                })
            }
        }
    } catch(err) {

        res.status(500).send(err)
    }
}

const uploadDocument = async (req: Request, res: Response, next: NextFunction) => {
    /* const { typeDocument } = req.body */
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let doc = req.files[0]
            const containerName = `contenido`
            const createContainer = await createContainerIfNotExist(containerName)
            if(createContainer) {

            }else{

            };
            const blobName = `documentos/${doc.originalname}`
            console.log(blobName)
            const containerClient = blobServiceClient.getContainerClient(containerName)
            const blockBlobClient = containerClient.getBlockBlobClient(blobName)
            const uploadBlobResponse = await blockBlobClient.uploadData(doc.buffer)
            if(uploadBlobResponse) {
                const blobClient = containerClient.getBlobClient(blobName)
                const downloadBlockBlobResponse = blobClient.url
                res.send({
                    status: true,
                    message: 'Document is uploaded',
                    data: {
                        url: downloadBlockBlobResponse,
                        description: doc.originalname
                    }
                })
            }
        }
    } catch(err) {

        res.status(500).send(err)
    }
}

const deleteFile = async (req: Request, res: Response, next: NextFunction) => {
    const { blobName, typeBlob } = req.body
    console.log(`${typeBlob}/${blobName}`)
    try {
        const containerName = `contenido`
        const containerClient = blobServiceClient.getContainerClient(`${containerName}`)
        const blockBlobClient = containerClient.getBlockBlobClient(`${typeBlob}/${blobName}`)
        console.log(blockBlobClient)
        const blobDeleteResponse = await blockBlobClient.delete()
        if (blobDeleteResponse) {
            res.send({
                status: true,
                message: 'Document is deleted'
            })
        }
    } catch(err) {
        res.status(500).send(err)
    }
}

export default {
    uploadImage,
    uploadAudio,
    uploadDocument,
    deleteFile
}