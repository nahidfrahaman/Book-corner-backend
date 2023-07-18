"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadinListRoutes = void 0;
const express_1 = __importDefault(require("express"));
const readinglist_controller_1 = require("./readinglist.controller");
const router = express_1.default.Router();
router.post('/add', readinglist_controller_1.ReadingListController.addBooKToReadingList);
router.get('/get/:id', readinglist_controller_1.ReadingListController.getBooKsOfReadingList);
exports.ReadinListRoutes = router;
