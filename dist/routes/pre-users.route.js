"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const excelToJson_service_1 = tslib_1.__importDefault(require("../services/excelToJson.service"));
const router = (0, express_1.Router)();
router.post(`/loadPreUserExcel`, excelToJson_service_1.default.loadPreUserExcel);
router.get(`/getPreUsers`, excelToJson_service_1.default.getPreUsers);
router.post(`/findPreUserByRun`, excelToJson_service_1.default.findPreUserByRun);
exports.default = router;
//# sourceMappingURL=pre-users.route.js.map