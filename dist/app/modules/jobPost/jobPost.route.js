"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobPostRoutes = void 0;
const express_1 = require("express");
const jobPost_controller_1 = require("./jobPost.controller");
const user_constants_1 = require("../user/user.constants");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = (0, express_1.Router)();
router.post('/create-jobPost', (0, auth_1.default)(user_constants_1.USER_ROLE.user, user_constants_1.USER_ROLE.admin), jobPost_controller_1.jobPostController.createjobPost);
router.patch('/update/:id', jobPost_controller_1.jobPostController.updatejobPost);
router.get('/user-jobPost/:userId', jobPost_controller_1.jobPostController.getJobPostByUserId);
router.delete('/:id', jobPost_controller_1.jobPostController.deletejobPost);
router.get('/my-jobpost', (0, auth_1.default)(user_constants_1.USER_ROLE.user, user_constants_1.USER_ROLE.admin), jobPost_controller_1.jobPostController.getMyjobPostById);
router.get('/:id', jobPost_controller_1.jobPostController.getjobPostById);
router.get('/', jobPost_controller_1.jobPostController.getAlljobPost);
exports.jobPostRoutes = router;
