"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callForpaper_favouriteRoutes = void 0;
const express_1 = require("express");
const callForpaper_favourite_controller_1 = require("./callForpaper_favourite.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constants_1 = require("../user/user.constants");
const router = (0, express_1.Router)();
router.post('/create-callForpaper_favourite', (0, auth_1.default)(user_constants_1.USER_ROLE.user, user_constants_1.USER_ROLE.admin), callForpaper_favourite_controller_1.callForpaper_favouriteController.createcallForpaper_favourite);
router.patch('/update/:id', callForpaper_favourite_controller_1.callForpaper_favouriteController.updatecallForpaper_favourite);
router.get('/user-callForpaper_favourite/:userId', callForpaper_favourite_controller_1.callForpaper_favouriteController.getcallForpaper_favouriteByUserId);
router.delete('/:id', callForpaper_favourite_controller_1.callForpaper_favouriteController.deletecallForpaper_favourite);
router.get('/my-callForpaper_favourite', (0, auth_1.default)(user_constants_1.USER_ROLE.user), callForpaper_favourite_controller_1.callForpaper_favouriteController.getMycallForpaper_favouriteById);
router.get('/:id', callForpaper_favourite_controller_1.callForpaper_favouriteController.getcallForpaper_favouriteById);
router.get('/', callForpaper_favourite_controller_1.callForpaper_favouriteController.getAllcallForpaper_favourite);
exports.callForpaper_favouriteRoutes = router;
