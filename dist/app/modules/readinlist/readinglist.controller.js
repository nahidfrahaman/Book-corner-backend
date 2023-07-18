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
exports.ReadingListController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const customResponse_1 = require("../../../shared/customResponse");
const readinglist_service_1 = require("./readinglist.service");
const addBooKToReadingList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createdBookData = req.body;
    const results = yield readinglist_service_1.ReadingListService.addBooKToReadingList(createdBookData);
    (0, customResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book added reading list Successfuly',
        data: results,
    });
}));
const getBooKsOfReadingList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestedData = req.body;
    console.log(requestedData);
    const results = yield readinglist_service_1.ReadingListService.getBooKsOfReadingList(requestedData);
    (0, customResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'reading list retrive Successfuly',
        data: results,
    });
}));
exports.ReadingListController = {
    addBooKToReadingList,
    getBooKsOfReadingList,
};
