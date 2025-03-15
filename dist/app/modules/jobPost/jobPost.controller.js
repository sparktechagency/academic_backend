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
exports.jobPostController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const jobPost_service_1 = require("./jobPost.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const createjobPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    req.body.userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const jobPost = yield jobPost_service_1.jobPostService.createjobPost(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'jobPost created successfully',
        data: jobPost,
    });
}));
const getAlljobPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jobPosts = yield jobPost_service_1.jobPostService.getAlljobPost(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'jobPost fetched successfully',
        data: jobPosts,
    });
}));
const getjobPostById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jobPost = yield jobPost_service_1.jobPostService.getjobPostById(req.params.id, req.query);
    if (!jobPost) {
        return res
            .status(404)
            .json({ status: 'fail', message: 'Job Post not found' });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'jobPost fetched successfully',
        data: jobPost,
    });
}));
const getMyjobPostById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const jobPost = yield jobPost_service_1.jobPostService.getMyjobPostById(id, req.query);
    if (!jobPost) {
        return res
            .status(404)
            .json({ status: 'fail', message: 'Job Post not found' });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'My jobPost fetched successfully',
        data: jobPost,
    });
}));
const updatejobPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jobPost = yield jobPost_service_1.jobPostService.updatejobPost(req.params.id, req.body);
    if (!jobPost) {
        return res
            .status(404)
            .json({ status: 'fail', message: 'Job Post not found' });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'jobPost updated successfully',
        data: jobPost,
    });
}));
const deletejobPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jobPost = yield jobPost_service_1.jobPostService.deletejobPost(req.params.id);
    if (!jobPost) {
        return res
            .status(404)
            .json({ status: 'fail', message: 'Job Post not found' });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'jobPost deleted successfully',
        data: jobPost,
    });
}));
const getJobPostByUserId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const JobPosts = yield jobPost_service_1.jobPostService.getJobPostByUserId(userId, req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Call for Papers retrieved successfully',
        data: JobPosts,
    });
}));
exports.jobPostController = {
    createjobPost,
    getAlljobPost,
    getjobPostById,
    updatejobPost,
    deletejobPost,
    getMyjobPostById,
    getJobPostByUserId,
};
