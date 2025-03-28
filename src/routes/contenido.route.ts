import contenidoController from "@/controllers/contenido.controller"
import { Router } from "express"

const router = Router()

router.post(`/guardarContenido`, contenidoController.guardarContenido)
router.post(`/editarContenido`, contenidoController.editarContenido)
router.post(`/borrarContenido`, contenidoController.borrarContenido)
router.post(`/leerContenidos`, contenidoController.leerContenidos)
router.get(`/leerContenidosBasicos`, contenidoController.leerContenidosBasicos)


router.get(`/leerContenidosV2`, contenidoController.leerContenidosV2)
router.post(`/crearContenido`, contenidoController.crearContenidoV2)
router.post(`/editarContenidoV2`, contenidoController.editarContenidoV2)

export default router