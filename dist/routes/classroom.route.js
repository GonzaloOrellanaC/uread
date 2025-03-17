"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classroom_controller_1 = require("../controllers/classroom.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post(`/guardar-classrooms`, classroom_controller_1.guardarClassroom);
router.get(`/get-classrooms`, classroom_controller_1.getClassrooms);
router.get(`/leer-classrooms-por-nivel-plan`, classroom_controller_1.leerClassroomsPorNivelPlan);
exports.default = router;
//# sourceMappingURL=classroom.route.js.map