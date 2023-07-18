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
exports.AuthService = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const http_status_codes_1 = require("http-status-codes");
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelper_1 = require("../../../helper/jwtHelper");
const user_model_1 = require("../user/user.model");
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = payload;
    const isUserExist = yield user_model_1.User.isUserExist(userName);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'User does not find');
    }
    const isPassMatched = yield user_model_1.User.isPasswordMatched(password, isUserExist.password);
    if (!isPassMatched) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'unAuthorized password does not match');
    }
    const { userName: UserName, email } = isUserExist;
    // create jwt access token and refresh token
    const accessToken = jwtHelper_1.JwtHelpers.createToken({ UserName, email }, config_1.default.jwt.jwt_secret, config_1.default.jwt.jwt_expired);
    const refreshToken = jwtHelper_1.JwtHelpers.createToken({ UserName, email }, config_1.default.jwt.jwt_refresh_secret, config_1.default.jwt.jwt_refresh_expired);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    //verify token
    let verifyToken = null;
    try {
        verifyToken = jwtHelper_1.JwtHelpers.verifyToken(token, config_1.default.jwt.jwt_refresh_secret);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, ' invalid refresh token');
    }
    const { UserName, email } = verifyToken;
    const isUserExist = yield user_model_1.User.isUserExist(UserName);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'forbidden user not found');
    }
    //generate access token  not : refreshtoken access token nibe
    const newAccessToken = jwtHelper_1.JwtHelpers.createToken({ userName: isUserExist.userName, email: isUserExist.email }, config_1.default.jwt.jwt_secret, config_1.default.jwt.jwt_expired);
    return {
        accessToken: newAccessToken,
    };
});
exports.AuthService = {
    login,
    refreshToken,
};
