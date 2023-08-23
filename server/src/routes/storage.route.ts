import azureStorageService from '@/services/azure-storage.service'
import { Router } from 'express'

const router = Router()

router.post(`/uploadImageStorage`, azureStorageService.uploadImage)
router.post(`/uploadAudioStorage`, azureStorageService.uploadAudio)
router.post(`/uploadDocumentStorage`, azureStorageService.uploadDocument)
router.post(`/deleteFileStorage`, azureStorageService.deleteFile)

export default router