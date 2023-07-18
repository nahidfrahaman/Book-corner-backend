"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadingList = exports.ReadinListSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ReadinListSchema = new mongoose_1.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    bookId: {
        type: String,
        required: true,
    },
    readingStatus: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.ReadingList = (0, mongoose_1.model)('Readinglist', exports.ReadinListSchema);
