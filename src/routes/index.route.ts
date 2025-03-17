import { Router } from 'express'
import AuthRouter from './auth.route'
import UsersRouter from './users.route'
import OrganizationRouter from './organizations.route'
import RolesRouter from './roles.route'
import PreUsersRouter from './pre-users.route'
import SurveysRouter from './surveys.route'
import SurveysResponseRouter from './surveys-response.route'
import ContenidoRouter from './contenido.route'
import LenguajeRouter from './languages.route'
import NivelesRouter from './niveles.route'
import StorageRouter from './storage.route'
import CalendarRouter from './calendar.route'
import IaRouter from './ia.router'
import InscripcionRouter from './inscripcion.route'
import ClassroomRouter from './classroom.route'

const router = Router()

router.use('/api', AuthRouter)
router.use('/api/users', UsersRouter)
router.use('/api/organizations', OrganizationRouter)
router.use('/api/roles', RolesRouter)
router.use('/api/preUsers', PreUsersRouter)
router.use('/api/survey', SurveysRouter)
router.use('/api/survey-response', SurveysResponseRouter)
router.use('/api/contenido', ContenidoRouter)
router.use('/api/lenguajes', LenguajeRouter)
router.use('/api/niveles', NivelesRouter)
router.use('/api/azure-storage', StorageRouter)
router.use('/api/calendar', CalendarRouter)
router.use('/api/ia', IaRouter)
router.use('/api/form', InscripcionRouter)
router.use('/api/classroom', ClassroomRouter)

export default router
