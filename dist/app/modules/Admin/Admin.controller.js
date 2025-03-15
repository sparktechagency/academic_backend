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
exports.AdminController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const event_models_1 = __importDefault(require("../event/event.models"));
const jobPost_models_1 = __importDefault(require("../jobPost/jobPost.models"));
const grants_models_1 = __importDefault(require("../grants/grants.models"));
const user_models_1 = require("../user/user.models");
const callForPaper_models_1 = __importDefault(require("../callForPaper/callForPaper.models"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const Admin_service_1 = require("./Admin.service");
const getAllCalCulation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const totalUser = yield user_models_1.User.countDocuments();
    const totalCallForPaper = yield callForPaper_models_1.default.countDocuments();
    const totalEvent = yield event_models_1.default.countDocuments();
    const totalJobPost = yield jobPost_models_1.default.countDocuments();
    const totalGrants = yield grants_models_1.default.countDocuments();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All Count fetched successfully',
        data: {
            totalUser,
            totalCallForPaper,
            totalEvent,
            totalJobPost,
            totalGrants,
        },
    });
}));
const dashboardData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Admin_service_1.AdminService.dashboardData(req === null || req === void 0 ? void 0 : req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        data: result,
        message: 'dashboard data successful',
    });
}));
exports.AdminController = {
    getAllCalCulation,
    dashboardData,
};
