"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calenderRoutes = void 0;
const express_1 = require("express");
const calender_controller_1 = require("./calender.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constants_1 = require("../user/user.constants");
const router = (0, express_1.Router)();
router.get('/show-calender', (0, auth_1.default)(user_constants_1.USER_ROLE.user, user_constants_1.USER_ROLE.admin), calender_controller_1.calenderController.getUserFavouriteCalendar);
// router.patch('/update/:id', calenderController.updatecalender);
// router.delete('/:id', calenderController.deletecalender);
// router.get('/:id', calenderController.getcalender);
// router.get('/', calenderController.getcalender);
exports.calenderRoutes = router;
