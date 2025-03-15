"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobpost_favouriteRoutes = void 0;
const express_1 = require("express");
const jobpost_favourite_controller_1 = require("./jobpost_favourite.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constants_1 = require("../user/user.constants");
const router = (0, express_1.Router)();
router.post('/create-jobpost_favourite', (0, auth_1.default)(user_constants_1.USER_ROLE.user, user_constants_1.USER_ROLE.admin), jobpost_favourite_controller_1.jobpost_favouriteController.createjobpost_favourite);
router.patch('/update/:id', jobpost_favourite_controller_1.jobpost_favouriteController.updatejobpost_favourite);
router.get('/user-jobpost_favourite/:userId', jobpost_favourite_controller_1.jobpost_favouriteController.getjobpost_favouriteByUserId);
router.delete('/:id', jobpost_favourite_controller_1.jobpost_favouriteController.deletejobpost_favourite);
router.get('/my-jobpost_favourite', (0, auth_1.default)(user_constants_1.USER_ROLE.user, user_constants_1.USER_ROLE.admin), jobpost_favourite_controller_1.jobpost_favouriteController.getMyjobpost_favouriteById);
router.get('/:id', jobpost_favourite_controller_1.jobpost_favouriteController.getjobpost_favouriteById);
router.get('/', jobpost_favourite_controller_1.jobpost_favouriteController.getAlljobpost_favourite);
exports.jobpost_favouriteRoutes = router;
