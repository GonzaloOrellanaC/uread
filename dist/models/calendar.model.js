"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const calendarSchema = new mongoose_1.Schema({
    date: {
        type: mongoose_1.Schema.Types.Date
    },
    title: {
        type: mongoose_1.Schema.Types.String
    },
    description: {
        type: mongoose_1.Schema.Types.String
    },
    users: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    teachers: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    state: {
        type: mongoose_1.Schema.Types.Boolean
    },
    urlMeeting: {
        type: mongoose_1.Schema.Types.String
    }
}, {
    timestamps: true,
    id: false
});
const calendarModel = (0, mongoose_1.model)('Calendar', calendarSchema);
exports.default = calendarModel;
//# sourceMappingURL=calendar.model.js.map