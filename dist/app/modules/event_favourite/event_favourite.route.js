"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.event_favouriteRoutes = void 0;
const express_1 = require("express");
const event_favourite_controller_1 = require("./event_favourite.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constants_1 = require("../user/user.constants");
const router = (0, express_1.Router)();
router.post('/create-event_favourite', (0, auth_1.default)(user_constants_1.USER_ROLE.user, user_constants_1.USER_ROLE.admin), event_favourite_controller_1.event_favouriteController.createevent_favourite);
router.patch('/update/:id', event_favourite_controller_1.event_favouriteController.updateevent_favourite);
router.get('/user-event_favourite/:userId', event_favourite_controller_1.event_favouriteController.getevent_favouriteByUserId);
router.delete('/:id', event_favourite_controller_1.event_favouriteController.deleteevent_favourite);
router.get('/my-event_favourite', (0, auth_1.default)(user_constants_1.USER_ROLE.user, user_constants_1.USER_ROLE.admin), event_favourite_controller_1.event_favouriteController.getMyevent_favouriteById);
router.get('/:id', event_favourite_controller_1.event_favouriteController.getevent_favouriteById);
router.get('/', event_favourite_controller_1.event_favouriteController.getAllevent_favourite);
exports.event_favouriteRoutes = router;
