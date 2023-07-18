"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = exports.BookSchema = void 0;
const mongoose_1 = require("mongoose");
exports.BookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    publicationDate: {
        type: Date,
        required: true,
    },
    reviews: {
        type: [],
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Book = (0, mongoose_1.model)('Book', exports.BookSchema);
