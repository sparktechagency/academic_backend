"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.make_folderRoutes = void 0;
const express_1 = require("express");
const make_folder_controller_1 = require("./make_folder.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constants_1 = require("../user/user.constants");
const router = (0, express_1.Router)();
router.post('/create-make_folder', (0, auth_1.default)(user_constants_1.USER_ROLE.user), make_folder_controller_1.make_folderController.createmake_folder);
router.patch('/update/:id', make_folder_controller_1.make_folderController.updatemake_folder);
router.delete('/:id', make_folder_controller_1.make_folderController.deletemake_folder);
router.get('/my-make_folder', (0, auth_1.default)(user_constants_1.USER_ROLE.user), make_folder_controller_1.make_folderController.getMyFolders);
router.get('/public/:userId', make_folder_controller_1.make_folderController.getPublicFoldersByUserId);
router.get('/:id', make_folder_controller_1.make_folderController.getmake_folderById);
router.get('/', make_folder_controller_1.make_folderController.getAllmake_folder);
exports.make_folderRoutes = router;
