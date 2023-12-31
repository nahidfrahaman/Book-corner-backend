"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishList = exports.WishListSchema = void 0;
const mongoose_1 = require("mongoose");
exports.WishListSchema = new mongoose_1.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    bookId: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.WishList = (0, mongoose_1.model)(' WishList', exports.WishListSchema);
