import { Router } from 'express'
import UsersController from '@controllers/users.controller'
/* import authMiddleware from '@/middlewares/auth.middleware' */

const router = Router()

router.post(`/createAdminSysUser`, /* authMiddleware, */ UsersController.createAdminSysUser)
router.post(`/createUser`, /* authMiddleware, */ UsersController.createUser)
router.post(`/editUser`, /* authMiddleware, */ UsersController.editUser)
router.post(`/getUserById`, /* authMiddleware, */ UsersController.getUserById)
router.post(`/deleteUser`, /* authMiddleware, */ UsersController.deleteUser)
router.get(`/getUsers`, /* authMiddleware, */ UsersController.getUsers)
router.get(`/getAdminUsers`, /* authMiddleware, */ UsersController.getAdminUsers)
router.get('/getAllSystemUser', /* authMiddleware, */ UsersController.getAllSystemUser)
router.post('/getUsersByOrg', /* authMiddleware, */ UsersController.getUsersByOrg)


router.post('/validarUsuario', /* authMiddleware, */ UsersController.validarUsuario)
router.get('/usuarioDesdeToken/:token', /* authMiddleware, */ UsersController.usuarioDesdeToken)
router.post('/habilitarUsuarioDesdeAlumno', /* authMiddleware, */ UsersController.habilitarUsuarioDesdeAlumno)

router.post('/cambiar-password', UsersController.cambiarPassword)
router.get('/alumnos-usuario', UsersController.alumnosUsuario)
router.get('/alumnos', UsersController.leerAlumnos)
router.post('/crearAlumno', UsersController.crearAlumno)
router.post('/edit-alumno', UsersController.editarAlumno)

export default router
