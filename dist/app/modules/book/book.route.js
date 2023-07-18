"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.post('/create-book', (0, auth_1.default)(), book_controller_1.BookController.createBook);
router.get('/get-books', book_controller_1.BookController.getAllBook);
router.get('/all-books', book_controller_1.BookController.getAllOfBooks);
router.patch('/update/:id', (0, auth_1.default)(), book_controller_1.BookController.updateBook);
router.delete('/delete/:id', book_controller_1.BookController.deleteBook);
router.get('/get-books/:id', book_controller_1.BookController.getSingleBook);
router.post('/comment/:id', book_controller_1.BookController.postComments);
router.get('/comment/:id', book_controller_1.BookController.getComments);
exports.BookRoute = router;
