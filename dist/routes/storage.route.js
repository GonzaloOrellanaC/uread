"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const azure_storage_service_1 = tslib_1.__importDefault(require("../services/azure-storage.service"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post(`/uploadImageStorage`, azure_storage_service_1.default.uploadImage);
router.post(`/uploadAudioStorage`, azure_storage_service_1.default.uploadAudio);
router.post(`/uploadDocumentStorage`, azure_storage_service_1.default.uploadDocument);
router.post(`/deleteFileStorage`, azure_storage_service_1.default.deleteFile);
exports.default = router;
//# sourceMappingURL=storage.route.js.map