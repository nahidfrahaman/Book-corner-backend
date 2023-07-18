"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const book_route_1 = require("../modules/book/book.route");
const readinglist_route_1 = require("../modules/readinlist/readinglist.route");
const user_routes_1 = require("../modules/user/user.routes");
const wishlist_routes_1 = require("../modules/wishlist/wishlist.routes");
const router = express_1.default.Router();
const routes = [
    {
        path: '/book',
        route: book_route_1.BookRoute,
    },
    {
        path: '/users',
        route: user_routes_1.UserRoute,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/readinglist',
        route: readinglist_route_1.ReadinListRoutes,
    },
    {
        path: '/wishlist',
        route: wishlist_routes_1.WishListRoutes,
    },
];
routes.forEach(route => {
    router.use(route.path, route.route);
});
exports.default = router;
