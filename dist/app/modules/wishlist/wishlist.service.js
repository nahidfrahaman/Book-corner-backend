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
exports.WishListService = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const wishlist_model_1 = require("./wishlist.model");
const addBooKToWishList = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield wishlist_model_1.WishList.create(payload);
    if (!results) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'user can not created');
    }
    return results;
});
const getBooKsOfWishList = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail } = payload;
    const results = yield wishlist_model_1.WishList.find({
        userEmail: userEmail,
    });
    if (!results) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'user can not created');
    }
    return results;
});
exports.WishListService = {
    addBooKToWishList,
    getBooKsOfWishList,
};
