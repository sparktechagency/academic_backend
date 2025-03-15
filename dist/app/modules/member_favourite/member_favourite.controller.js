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
exports.member_favouriteController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const member_favourite_service_1 = require("./member_favourite.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
// Create Member Favourite
const createmember_favourite = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // const { memberId } = req.body;
    req.body.userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const newFavourite = yield member_favourite_service_1.member_favouriteService.createmember_favourite(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Member favourite created successfully',
        data: newFavourite,
    });
}));
// Get All Member Favourites
const getAllmember_favourite = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const favourites = yield member_favourite_service_1.member_favouriteService.getAllmember_favourite(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Member favourites fetched successfully',
        data: favourites,
    });
}));
// Get Member Favourite by ID
const getmember_favouriteById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const favourite = yield member_favourite_service_1.member_favouriteService.getmember_favouriteById(id, req.query);
    if (!favourite) {
        return res.status(404).json({
            status: 'fail',
            message: 'Favourite not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Member favourites fetched successfully',
        data: favourite,
    });
}));
// Get Member Favourite by ID
const getMymember_favouriteById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const favourite = yield member_favourite_service_1.member_favouriteService.getMymember_favouriteById(id, req.query);
    if (!favourite) {
        return res.status(404).json({
            status: 'fail',
            message: 'Favourite not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'My Member favourites fetched successfully',
        data: favourite,
    });
}));
// Update Member Favourite
const updatemember_favourite = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { memberId } = req.body;
    const updatedFavourite = yield member_favourite_service_1.member_favouriteService.updatemember_favourite(id, memberId);
    if (!updatedFavourite) {
        return res.status(404).json({
            status: 'fail',
            message: 'Favourite not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Member favourites updated successfully',
        data: updatedFavourite,
    });
}));
// Delete Member Favourite
const deletemember_favourite = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedFavourite = yield member_favourite_service_1.member_favouriteService.deletemember_favourite(id);
    if (!deletedFavourite) {
        return res.status(404).json({
            status: 'fail',
            message: 'Favourite not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Member favourites deleted successfully',
        data: deletedFavourite,
    });
}));
const getMember_favouriteByUserId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const member_favourite = yield member_favourite_service_1.member_favouriteService.getMemberFavouriteByUserId(userId, req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'event favourite retrieved successfully',
        data: member_favourite,
    });
}));
exports.member_favouriteController = {
    createmember_favourite,
    getAllmember_favourite,
    getmember_favouriteById,
    updatemember_favourite,
    deletemember_favourite,
    getMymember_favouriteById,
    getMember_favouriteByUserId,
};
