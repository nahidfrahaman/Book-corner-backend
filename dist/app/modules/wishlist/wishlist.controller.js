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
exports.WishListController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const customResponse_1 = require("../../../shared/customResponse");
const wishlist_service_1 = require("./wishlist.service");
const addBooKTWishList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createdBookData = req.body;
    const results = yield wishlist_service_1.WishListService.addBooKToWishList(createdBookData);
    (0, customResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book added reading list Successfuly',
        data: results,
    });
}));
const getBooKsOWishList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const email = id;
    const results = yield wishlist_service_1.WishListService.getBooKsOfWishList(email);
    (0, customResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'reading list retrive Successfuly',
        data: results,
    });
}));
exports.WishListController = {
    addBooKTWishList,
    getBooKsOWishList,
};
