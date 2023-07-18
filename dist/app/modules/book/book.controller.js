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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const customResponse_1 = require("../../../shared/customResponse");
const pick_1 = __importDefault(require("../../../shared/pick"));
const book_constant_1 = require("./book.constant");
const book_service_1 = require("./book.service");
const createBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createdBookData = req.body;
    const results = yield book_service_1.BookService.createBook(createdBookData);
    (0, customResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book created Successfuly',
        data: results,
    });
}));
const getAllBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOption = (0, pick_1.default)(req.query, book_constant_1.paginationOptions);
    const filtersData = (0, pick_1.default)(req.query, [
        'searchTerm',
        'genre',
        'publicationDate',
    ]);
    const results = yield book_service_1.BookService.getAllBook(filtersData, paginationOption);
    (0, customResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: ' book  data retrive Successfuly',
        data: results,
    });
}));
const getAllOfBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filtersData = (0, pick_1.default)(req.query, [
        'searchTerm',
        'genre',
        'publicationDate',
    ]);
    const results = yield book_service_1.BookService.getAllofBook(filtersData);
    (0, customResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'book data retrive Successfuly',
        data: results,
    });
}));
const updateBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    const results = yield book_service_1.BookService.updateBook(id, updateData);
    (0, customResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book updated Successfuly',
        data: results,
    });
}));
const deleteBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const results = yield book_service_1.BookService.deleteBook(id);
    (0, customResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book deleted Successfuly',
        data: results,
    });
}));
const getSingleBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const results = yield book_service_1.BookService.getSingleBook(id);
    (0, customResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book deleted Successfuly',
        data: results,
    });
}));
const postComments = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const comments = req.body;
    const results = yield book_service_1.BookService.postComments(id, comments);
    (0, customResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'comment posted Successfuly',
        data: results,
    });
}));
const getComments = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const results = yield book_service_1.BookService.getComments(id);
    (0, customResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'comment posted Successfuly',
        data: results,
    });
}));
exports.BookController = {
    createBook,
    getAllBook,
    getAllOfBooks,
    getSingleBook,
    updateBook,
    deleteBook,
    postComments,
    getComments,
};
