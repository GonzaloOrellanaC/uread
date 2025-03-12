import { postDatosFormulario } from "@/controllers/inscripcion.controller";
import { Router } from "express";

const router = Router()

router.post('/', postDatosFormulario)

export default router