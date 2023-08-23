import contenidoController from "@/controllers/contenido.controller"
import { Router } from "express"

const router = Router()

router.post(`/guardarContenido`, contenidoController.guardarContenido)
router.post(`/editarContenido`, contenidoController.editarContenido)
router.post(`/borrarContenido`, contenidoController.borrarContenido)
router.get(`/leerContenidos`, contenidoController.leerContenidos)
router.get(`/leerContenidosBasicos`, contenidoController.leerContenidosBasicos)

export default router