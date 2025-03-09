"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const organizationSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String
    },
    state: {
        type: Boolean,
        default: true
    },
    users: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    contracts: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Contract'
        }
    ],
    imageBgLoginUrl: [
        {
            type: String
        }
    ],
    themes: [
        {
            type: String
        }
    ],
    idOrg: {
        type: Number
    },
    logoUrl: {
        type: String
    },
    phone: {
        type: String
    },
    nation: {
        type: String
    },
    email: {
        type: String
    },
    region: {
        type: String
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    coords: {
        type: Object
    }
}, {
    timestamps: true,
    id: false
});
const organizationModel = (0, mongoose_1.model)('Organization', organizationSchema);
exports.default = organizationModel;
//# sourceMappingURL=organizations.model.js.map