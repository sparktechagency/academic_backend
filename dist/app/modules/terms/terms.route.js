"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.termsRoutes = void 0;
const express_1 = require("express");
const terms_controller_1 = require("./terms.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constants_1 = require("../user/user.constants");
const router = (0, express_1.Router)();
router.post('/create-terms', terms_controller_1.termsController.createterms);
router.patch('/update', (0, auth_1.default)(user_constants_1.USER_ROLE.admin), terms_controller_1.termsController.updateterms);
router.delete('/:id', terms_controller_1.termsController.deleteterms);
router.get('/:id', terms_controller_1.termsController.gettermsById);
router.get('/', terms_controller_1.termsController.getAllterms);
exports.termsRoutes = router;
