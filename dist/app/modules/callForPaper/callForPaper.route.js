"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callForPaperRoutes = void 0;
const express_1 = require("express");
const callForPaper_controller_1 = require("./callForPaper.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constants_1 = require("../user/user.constants");
const router = (0, express_1.Router)();
router.post('/create-callForPaper', (0, auth_1.default)(user_constants_1.USER_ROLE.user, user_constants_1.USER_ROLE.admin), callForPaper_controller_1.callForPaperController.createcallForPaper);
router.patch('/update/:id', callForPaper_controller_1.callForPaperController.updatecallForPaper);
router.get('/user-callForPaper/:userId', callForPaper_controller_1.callForPaperController.getCallForPaperByUserId);
router.delete('/:id', callForPaper_controller_1.callForPaperController.deletecallForPaper);
router.get('/my-callForPaper', (0, auth_1.default)(user_constants_1.USER_ROLE.user, user_constants_1.USER_ROLE.admin), callForPaper_controller_1.callForPaperController.getMycallForPaperById);
router.get('/:id', callForPaper_controller_1.callForPaperController.getcallForPaperById);
router.get('/', callForPaper_controller_1.callForPaperController.getAllcallForPaper);
exports.callForPaperRoutes = router;
