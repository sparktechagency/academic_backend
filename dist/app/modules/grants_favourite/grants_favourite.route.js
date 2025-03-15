"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.grants_favouriteRoutes = void 0;
const express_1 = require("express");
const grants_favourite_controller_1 = require("./grants_favourite.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constants_1 = require("../user/user.constants");
const router = (0, express_1.Router)();
router.post('/create-grants_favourite', (0, auth_1.default)(user_constants_1.USER_ROLE.user, user_constants_1.USER_ROLE.admin), grants_favourite_controller_1.grants_favouriteController.creategrants_favourite);
router.patch('/update/:id', grants_favourite_controller_1.grants_favouriteController.updategrants_favourite);
router.get('/user-grants_favourite/:userId', grants_favourite_controller_1.grants_favouriteController.getgrants_favouriteByUserId);
router.delete('/:id', grants_favourite_controller_1.grants_favouriteController.deletegrants_favourite);
router.get('/my-grants_favourite', (0, auth_1.default)(user_constants_1.USER_ROLE.user, user_constants_1.USER_ROLE.admin), grants_favourite_controller_1.grants_favouriteController.getMygrants_favouriteById);
router.get('/:id', grants_favourite_controller_1.grants_favouriteController.getgrants_favouriteById);
router.get('/', grants_favourite_controller_1.grants_favouriteController.getAllgrants_favourite);
exports.grants_favouriteRoutes = router;
