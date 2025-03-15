"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.member_favouriteRoutes = void 0;
const express_1 = require("express");
const member_favourite_controller_1 = require("./member_favourite.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constants_1 = require("../user/user.constants");
const router = (0, express_1.Router)();
router.post('/create-member_favourite', (0, auth_1.default)(user_constants_1.USER_ROLE.user, user_constants_1.USER_ROLE.admin), member_favourite_controller_1.member_favouriteController.createmember_favourite);
router.patch('/update/:id', member_favourite_controller_1.member_favouriteController.updatemember_favourite);
router.get('/user-member_favourite/:userId', member_favourite_controller_1.member_favouriteController.getMember_favouriteByUserId);
router.delete('/:id', member_favourite_controller_1.member_favouriteController.deletemember_favourite);
router.get('/my-member_favourite', (0, auth_1.default)(user_constants_1.USER_ROLE.user, user_constants_1.USER_ROLE.admin), member_favourite_controller_1.member_favouriteController.getMymember_favouriteById);
router.get('/:id', member_favourite_controller_1.member_favouriteController.getmember_favouriteById);
router.get('/', member_favourite_controller_1.member_favouriteController.getAllmember_favourite);
exports.member_favouriteRoutes = router;
