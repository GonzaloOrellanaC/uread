import { Router } from 'express'
import AuthController from '@controllers/auth.controller'

const router = Router()

router.post(`/signup`, AuthController.signUp)
router.post(`/login`, AuthController.logIn)
router.post(`/logout`, AuthController.logOut)
router.post(`/verify`, AuthController.verifyUserEmail)
router.post(`/resendVerification`, AuthController.resendVerification)
router.post(`/forgot-password`, AuthController.forgotPassword)
router.post(`/reset-password`, AuthController.resetPassword)

export default router
