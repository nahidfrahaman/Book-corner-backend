"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = void 0;
const mongoose_1 = require("mongoose");
const AuthSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.AuthUser = (0, mongoose_1.model)('AuthUser', AuthSchema);
