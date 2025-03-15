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
exports.articleController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const article_service_1 = require("./article.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
// Create Article
const createarticle = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const newArticle = yield article_service_1.articleService.createarticle(Object.assign(Object.assign({}, req.body), { userId }));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Article created successfully',
        data: newArticle,
    });
}));
// Get All Articles
const getAllarticle = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const articles = yield article_service_1.articleService.getAllarticle();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Article fetched successfully',
        data: articles,
    });
}));
// Get Article by ID
const getarticleById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const article = yield article_service_1.articleService.getarticleById(id);
    if (!article) {
        return res.status(404).json({
            status: 'fail',
            message: 'Article not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Article fetched successfully',
        data: article,
    });
}));
// Get Articles by Folder ID
const getArticlesByFolderId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const articles = yield article_service_1.articleService.getArticlesByFolderId(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Folder Article fetched successfully',
        data: articles,
    });
}));
// Update Article
const updatearticle = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedArticle = yield article_service_1.articleService.updatearticle(id, req.body);
    if (!updatedArticle) {
        return res.status(404).json({
            status: 'fail',
            message: 'Article not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Folder Article updated successfully',
        data: updatedArticle,
    });
}));
// Delete Article
const deletearticle = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedArticle = yield article_service_1.articleService.deletearticle(id);
    if (!deletedArticle) {
        return res.status(404).json({
            status: 'fail',
            message: 'Article not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Folder Article deleted successfully',
        data: deletedArticle,
    });
}));
exports.articleController = {
    createarticle,
    getAllarticle,
    getarticleById,
    getArticlesByFolderId,
    updatearticle,
    deletearticle,
};
