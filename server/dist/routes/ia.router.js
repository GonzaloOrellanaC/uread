"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ia_controller_1 = require("../controllers/ia.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/create-new-content', ia_controller_1.createNewContent);
router.post('/edit-content', ia_controller_1.editContent);
exports.default = router;
//# sourceMappingURL=ia.router.js.map