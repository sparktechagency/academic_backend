"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleRoutes = void 0;
const express_1 = require("express");
const article_controller_1 = require("./article.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constants_1 = require("../user/user.constants");
const router = (0, express_1.Router)();
router.post('/create-article', (0, auth_1.default)(user_constants_1.USER_ROLE.user), article_controller_1.articleController.createarticle);
router.get('/folder/:id', article_controller_1.articleController.getArticlesByFolderId);
router.patch('/update/:id', article_controller_1.articleController.updatearticle);
router.delete('/:id', article_controller_1.articleController.deletearticle);
router.get('/:id', article_controller_1.articleController.getarticleById);
router.get('/', article_controller_1.articleController.getAllarticle);
exports.articleRoutes = router;
