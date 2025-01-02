"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeetings = exports.createMeeting = void 0;
const tslib_1 = require("tslib");
const calendar_model_1 = (0, tslib_1.__importDefault)(require("../models/calendar.model"));
const createMeeting = async (req, res) => {
    try {
        const data = req.body;
        const response = await calendar_model_1.default.create(Object.assign(Object.assign({}, data), { state: true }));
        res.status(200).json({
            state: true,
            data: response
        });
    }
    catch (error) {
        res.status(400).json({
            state: false,
            error
        });
    }
};
exports.createMeeting = createMeeting;
const getMeetings = async (req, res) => {
    try {
        const response = await calendar_model_1.default.find({ state: true });
        res.status(200).json({
            state: true,
            data: response
        });
    }
    catch (error) {
        res.status(400).json({
            state: false,
            error
        });
    }
};
exports.getMeetings = getMeetings;
//# sourceMappingURL=calendar.controller.js.map