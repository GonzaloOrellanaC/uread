"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calendar_controller_1 = require("../controllers/calendar.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post(`/createMeeting`, calendar_controller_1.createMeeting);
router.get(`/getMeetings`, calendar_controller_1.getMeetings);
exports.default = router;
//# sourceMappingURL=calendar.route.js.map