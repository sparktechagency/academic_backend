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
exports.ImageUploadService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const s3_1 = require("../../utils/s3");
const imageUpload_models_1 = __importDefault(require("./imageUpload.models"));
const createimageUpload = (payload, files) => __awaiter(void 0, void 0, void 0, function* () {
    if (files) {
        const { images } = files;
        payload.images = [{ url: '', key: '' }];
        if (images === null || images === void 0 ? void 0 : images.length) {
            const imgsArray = [];
            images === null || images === void 0 ? void 0 : images.map((image) => __awaiter(void 0, void 0, void 0, function* () {
                imgsArray.push({
                    file: image,
                    path: `images/ImageUpload/images/${Math.floor(100000 + Math.random() * 900000)}`,
                });
            }));
            payload.images = yield (0, s3_1.uploadManyToS3)(imgsArray);
        }
        else {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Upload minimum 1 image');
        }
    }
    const result = yield imageUpload_models_1.default.create(payload);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create ImageUpload');
    }
    return result;
});
const getAllimageUpload = () => __awaiter(void 0, void 0, void 0, function* () { });
const getimageUploadById = () => __awaiter(void 0, void 0, void 0, function* () { });
const updateimageUpload = () => __awaiter(void 0, void 0, void 0, function* () { });
const deleteimageUpload = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.ImageUploadService = {
    createimageUpload,
    getAllimageUpload,
    getimageUploadById,
    updateimageUpload,
    deleteimageUpload,
};
