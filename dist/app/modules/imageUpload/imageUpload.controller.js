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
exports.imageUploadController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const imageUpload_service_1 = require("./imageUpload.service");
const createimageUpload = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    req.body.userId = userId;
    if (!userId) {
        return (0, sendResponse_1.default)(res, {
            statusCode: 400,
            success: false,
            message: 'User not authenticated.',
            data: {},
        });
    }
    const result = yield imageUpload_service_1.ImageUploadService.createimageUpload(req.body, req.files);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'ImageUpload created successfully',
        data: result,
    });
}));
const getAllimageUpload = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
const getimageUploadById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
const updateimageUpload = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
const deleteimageUpload = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
exports.imageUploadController = {
    createimageUpload,
    getAllimageUpload,
    getimageUploadById,
    updateimageUpload,
    deleteimageUpload,
};
