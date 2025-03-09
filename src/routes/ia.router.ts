import { createNewContent, editContent } from "@/controllers/ia.controller";
import { Router } from "express";

const router = Router()

router.post('/create-new-content', createNewContent)
router.post('/edit-content', editContent)

export default router