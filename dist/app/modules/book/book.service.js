"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
const book_constant_1 = require("./book.constant");
const book_model_1 = require("./book.model");
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield book_model_1.Book.create(payload);
    return results;
});
const getAllBook = (filters, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(paginationOption);
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: book_constant_1.BookSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const results = yield book_model_1.Book.find(whereCondition).skip(skip).limit(limit);
    const total = yield book_model_1.Book.countDocuments();
    return {
        meta: {
            page: page,
            limit: limit,
            total: total,
        },
        data: results,
    };
});
const getAllofBook = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: book_constant_1.BookSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const results = yield book_model_1.Book.find(whereCondition);
    return results;
});
const updateBook = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield book_model_1.Book.findOneAndUpdate({ _id: id }, updatedData, {
        new: true,
    });
    if (!results) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'updated failed');
    }
    return results;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield book_model_1.Book.findByIdAndDelete(id);
    return results;
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield book_model_1.Book.findById(id);
    return results;
});
const postComments = (id, comments) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield book_model_1.Book.findOneAndUpdate({ _id: id }, { $push: { reviews: comments.reviews } });
    let updatedResults;
    if (results) {
        updatedResults = yield book_model_1.Book.findById(id);
    }
    return updatedResults;
});
const getComments = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = new mongoose_1.default.Types.ObjectId(id);
    const agg = [
        {
            $match: {
                _id: ids,
            },
        },
        {
            $project: {
                _id: 0,
                reviews: 1,
            },
        },
    ];
    const results = yield book_model_1.Book.aggregate(agg);
    return results[0];
});
exports.BookService = {
    createBook,
    getAllBook,
    getAllofBook,
    getSingleBook,
    updateBook,
    deleteBook,
    postComments,
    getComments,
};
