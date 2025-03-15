"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.grantsRoutes = void 0;
const express_1 = require("express");
const grants_controller_1 = require("./grants.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constants_1 = require("../user/user.constants");
const router = (0, express_1.Router)();
router.post('/create-grants', (0, auth_1.default)(user_constants_1.USER_ROLE.user, user_constants_1.USER_ROLE.admin), grants_controller_1.grantsController.creategrants);
router.patch('/update/:id', grants_controller_1.grantsController.updategrants);
router.get('/user-grants/:userId', grants_controller_1.grantsController.getgrantsByUserId);
router.delete('/:id', grants_controller_1.grantsController.deletegrants);
router.get('/my-grants', (0, auth_1.default)(user_constants_1.USER_ROLE.user, user_constants_1.USER_ROLE.admin), grants_controller_1.grantsController.getMygrantsById);
router.get('/:id', grants_controller_1.grantsController.getgrantsById);
router.get('/', grants_controller_1.grantsController.getAllgrants);
exports.grantsRoutes = router;
