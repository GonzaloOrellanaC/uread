"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const gruposNiveles_model_1 = tslib_1.__importDefault(require("../models/gruposNiveles.model"));
const niveles_model_1 = tslib_1.__importDefault(require("../models/niveles.model"));
const express_1 = require("express");
const niveles = niveles_model_1.default;
const router = (0, express_1.Router)();
router.get(`/leerNiveles`, async (req, res, next) => {
    try {
        const nivelesToSend = await niveles.find();
        res.status(200).json({ data: nivelesToSend, message: 'lista de niveles' });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ data: error });
    }
});
router.get('/gruposNiveles', async (req, res, next) => {
    try {
        const gruposNiveles = await gruposNiveles_model_1.default.find().populate('cursos');
        console.log(gruposNiveles);
        res.status(200).json({ gruposNiveles, message: 'lista de niveles' });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ data: error });
    }
});
exports.default = router;
//# sourceMappingURL=niveles.route.js.map