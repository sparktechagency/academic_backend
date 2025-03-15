"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.make_folderController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const make_folder_service_1 = require("./make_folder.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
// Create Make Folder
const createmake_folder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId; // Assuming user ID is retrieved from the token
    const newFolder = yield make_folder_service_1.make_folderService.createmake_folder(userId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'folder created successfully',
        data: newFolder,
    });
}));
// Get All Make Folders
const getAllmake_folder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const userId = req?.user?.userId; // Assuming user ID is retrieved from the token
    const folders = yield make_folder_service_1.make_folderService.getAllmake_folder();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All folders fetched successfully',
        data: folders,
    });
}));
// Get Make Folder by ID
const getmake_folderById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const folder = yield make_folder_service_1.make_folderService.getmake_folderById(id);
    if (!folder) {
        return res.status(404).json({
            status: 'fail',
            message: 'Folder not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Folders fetched successfully',
        data: folder,
    });
}));
// Update Make Folder
const updatemake_folder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { isPrivate } = req.body;
    const updatedFolder = yield make_folder_service_1.make_folderService.updatemake_folder(id, isPrivate);
    if (!updatedFolder) {
        return res.status(404).json({
            status: 'fail',
            message: 'Folder not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Folder updated successfully',
        data: updatedFolder,
    });
}));
// Delete Make Folder
const deletemake_folder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedFolder = yield make_folder_service_1.make_folderService.deletemake_folder(id);
    if (!deletedFolder) {
        return res.status(404).json({
            status: 'fail',
            message: 'Folder not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Folder deleted successfully',
        data: deletedFolder,
    });
}));
const getMyFolders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const folders = yield make_folder_service_1.make_folderService.getMyFolders(userId);
    res.status(200).json({
        status: 'success',
        data: folders,
    });
}));
const getPublicFoldersByUserId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId; // Get user ID from request parameters
    const folders = yield make_folder_service_1.make_folderService.getPublicFoldersByUserId(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Public folders fetched successfully',
        data: folders,
    });
}));
exports.make_folderController = {
    createmake_folder,
    getAllmake_folder,
    getmake_folderById,
    updatemake_folder,
    deletemake_folder,
    getMyFolders,
    getPublicFoldersByUserId,
};
