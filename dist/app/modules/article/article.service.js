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
exports.articleService = void 0;
const article_models_1 = __importDefault(require("./article.models"));
// Create Article
const createarticle = (articleData) => __awaiter(void 0, void 0, void 0, function* () {
    const newArticle = yield article_models_1.default.create(articleData);
    return newArticle;
});
// Get All Articles
const getAllarticle = () => __awaiter(void 0, void 0, void 0, function* () {
    const articles = yield article_models_1.default.find();
    return articles;
});
// Get Article by ID
const getarticleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const article = yield article_models_1.default.findById(id);
    return article;
});
// Get Articles by Folder ID
const getArticlesByFolderId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const articles = yield article_models_1.default.find({ folderId: id });
    return articles;
});
// Update Article
const updatearticle = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedArticle = yield article_models_1.default.findByIdAndUpdate(id, updateData, {
        new: true,
    });
    return updatedArticle;
});
// Delete Article
const deletearticle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedArticle = yield article_models_1.default.findByIdAndDelete(id);
    return deletedArticle;
});
exports.articleService = {
    createarticle,
    getAllarticle,
    getarticleById,
    getArticlesByFolderId,
    updatearticle,
    deletearticle,
};
