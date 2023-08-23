"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    idUser: {
        type: Number
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Lastname is required']
    },
    secondLastName: {
        type: String,
        required: false
    },
    run: {
        type: String,
        required: false
    },
    phone: {
        type: String
    },
    direction: {
        type: String
    },
    region: {
        type: String
    },
    city: {
        type: String
    },
    nacionality: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    emailVerifiedAt: {
        type: Date,
        default: null,
        required: false
    },
    state: {
        type: Boolean,
        default: true
    },
    profileImage: {
        type: String,
        required: false
    },
    levelUser: {
        type: Number,
        required: false
    },
    premium: {
        type: Boolean,
        required: true
    },
    roles: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Role'
        }
    ],
    organization: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Organization'
        }
    ],
    users: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, {
    timestamps: true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});
const userModel = (0, mongoose_1.model)('User', userSchema);
exports.default = userModel;
//# sourceMappingURL=users.model.js.map