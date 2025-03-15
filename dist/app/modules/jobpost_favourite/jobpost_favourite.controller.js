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
exports.jobpost_favouriteController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const jobpost_favourite_service_1 = require("./jobpost_favourite.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
// Create Job Post Favourite
const createjobpost_favourite = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
    req.body.userId = userId;
    const newFavourite = yield jobpost_favourite_service_1.jobpost_favouriteService.createjobpost_favourite(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'jobPost favourite created successfully',
        data: newFavourite,
    });
}));
// Get All Job Post Favourites
const getAlljobpost_favourite = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const favourites = yield jobpost_favourite_service_1.jobpost_favouriteService.getAlljobpost_favourite(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'jobPost favourite fetched successfully',
        data: favourites,
    });
}));
// Get Job Post Favourite by ID
const getjobpost_favouriteById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const favourite = yield jobpost_favourite_service_1.jobpost_favouriteService.getjobpost_favouriteById(id, req.query);
    if (!favourite) {
        return res.status(404).json({
            status: 'fail',
            message: 'Favourite not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'jobPost favourite fetched successfully',
        data: favourite,
    });
}));
// Get Job Post Favourite by ID
const getMyjobpost_favouriteById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const favourite = yield jobpost_favourite_service_1.jobpost_favouriteService.getMyjobpost_favouriteById(id, req.query);
    if (!favourite) {
        return res.status(404).json({
            status: 'fail',
            message: 'Favourite not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'My jobPost favourite fetched successfully',
        data: favourite,
    });
}));
// Update Job Post Favourite
const updatejobpost_favourite = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { jobpostId } = req.body;
    const updatedFavourite = yield jobpost_favourite_service_1.jobpost_favouriteService.updatejobpost_favourite(id, jobpostId);
    if (!updatedFavourite) {
        return res.status(404).json({
            status: 'fail',
            message: 'Favourite not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'jobPost favourite updated successfully',
        data: updatedFavourite,
    });
}));
// Delete Job Post Favourite
const deletejobpost_favourite = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedFavourite = yield jobpost_favourite_service_1.jobpost_favouriteService.deletejobpost_favourite(id);
    if (!deletedFavourite) {
        return res.status(404).json({
            status: 'fail',
            message: 'Favourite not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'jobPost favourite deleted successfully',
        data: deletedFavourite,
    });
}));
const getjobpost_favouriteByUserId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const jobpost_favourite = yield jobpost_favourite_service_1.jobpost_favouriteService.getJobPostFavouriteByUserId(userId, req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'jobPost favourite retrieved successfully',
        data: jobpost_favourite,
    });
}));
exports.jobpost_favouriteController = {
    createjobpost_favourite,
    getAlljobpost_favourite,
    getjobpost_favouriteById,
    updatejobpost_favourite,
    deletejobpost_favourite,
    getMyjobpost_favouriteById,
    getjobpost_favouriteByUserId,
};
