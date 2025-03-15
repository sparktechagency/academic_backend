"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRoutes = void 0;
const express_1 = require("express");
const event_controller_1 = require("./event.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constants_1 = require("../user/user.constants");
const router = (0, express_1.Router)();
router.post('/create-event', (0, auth_1.default)(user_constants_1.USER_ROLE.user, user_constants_1.USER_ROLE.admin), event_controller_1.eventController.createevent);
router.patch('/update/:id', event_controller_1.eventController.updateevent);
router.get('/user-event/:userId', event_controller_1.eventController.getEventByUserId);
router.delete('/:id', event_controller_1.eventController.deleteevent);
router.get('/my-event', (0, auth_1.default)(user_constants_1.USER_ROLE.user, user_constants_1.USER_ROLE.admin), event_controller_1.eventController.getMyeventById);
router.get('/:id', event_controller_1.eventController.geteventById);
router.get('/', event_controller_1.eventController.getAllevent);
exports.eventRoutes = router;
