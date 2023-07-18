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
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const customResponse_1 = require("./shared/customResponse");
// Import routes
const app = (0, express_1.default)();
// parse data
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use('/api/v1/', routes_1.default);
app.use(globalErrorHandler_1.default);
// Testing route
app.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const responseData = {
        message: 'Welcome to Express API template',
        data: null,
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
// Global error handler
// Forbidden routes
app.all('*', (req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        status: 'false',
        message: `No API endpoint found for ${req.method} ${req.originalUrl}`,
        errorMessages: [
            {
                message: `No API endpoint found for ${req.method} ${req.originalUrl}`,
                path: req.originalUrl,
            },
        ],
        stack: '',
    });
});
exports.default = app;
