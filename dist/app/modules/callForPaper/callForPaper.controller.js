"use strict";
// Controller
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
exports.callForPaperController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const callForPaper_service_1 = require("./callForPaper.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
// Create Call for Paper
const createcallForPaper = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    req.body.userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const newCallForPaper = yield callForPaper_service_1.callForPaperService.createcallForPaper(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'callForPaper created successfully',
        data: newCallForPaper,
    });
}));
// Get All Call for Papers
const getAllcallForPaper = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const callForPaperList = yield callForPaper_service_1.callForPaperService.getAllcallForPaper(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All callForPaper successfully',
        data: callForPaperList,
    });
}));
// Get Call for Paper by ID
const getcallForPaperById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const callForPaper = yield callForPaper_service_1.callForPaperService.getcallForPaperById(id, req.query);
    if (!callForPaper) {
        return res.status(404).json({
            status: 'fail',
            message: 'Call for Paper not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'single callForPaper successfully',
        data: callForPaper,
    });
}));
// Get Call for Paper by ID
const getMycallForPaperById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const callForPaper = yield callForPaper_service_1.callForPaperService.getMycallForPaperById(id, req.query);
    if (!callForPaper) {
        return res.status(404).json({
            status: 'fail',
            message: 'Call for Paper not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'my callForPaper successfully',
        data: callForPaper,
    });
}));
// Update Call for Paper
const updatecallForPaper = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedCallForPaper = yield callForPaper_service_1.callForPaperService.updatecallForPaper(id, req.body);
    if (!updatedCallForPaper) {
        return res.status(404).json({
            status: 'fail',
            message: 'Call for Paper not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'callForPaper updated successfully',
        data: updatedCallForPaper,
    });
}));
// Delete Call for Paper
const deletecallForPaper = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedCallForPaper = yield callForPaper_service_1.callForPaperService.deletecallForPaper(id);
    if (!deletedCallForPaper) {
        return res.status(404).json({
            status: 'fail',
            message: 'Call for Paper not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'callForPaper deleted successfully',
        data: deletedCallForPaper,
    });
}));
const getCallForPaperByUserId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const callForPapers = yield callForPaper_service_1.callForPaperService.getCallForPaperByUserId(userId, req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Call for Papers retrieved successfully',
        data: callForPapers,
    });
}));
exports.callForPaperController = {
    createcallForPaper,
    getAllcallForPaper,
    getcallForPaperById,
    updatecallForPaper,
    deletecallForPaper,
    getMycallForPaperById,
    getCallForPaperByUserId,
};
