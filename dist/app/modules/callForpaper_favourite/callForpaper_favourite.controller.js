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
exports.callForpaper_favouriteController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const callForpaper_favourite_service_1 = require("./callForpaper_favourite.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
// Create Call for Paper Favourite
const createcallForpaper_favourite = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
    req.body.userId = userId;
    const newFavourite = yield callForpaper_favourite_service_1.callForpaper_favouriteService.createcallForpaper_favourite(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'callForpaper favourite successfully',
        data: newFavourite,
    });
}));
// Get All Call for Paper Favourites
const getAllcallForpaper_favourite = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const favourites = yield callForpaper_favourite_service_1.callForpaper_favouriteService.getAllcallForpaper_favourite(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'ALL callForpaper favourite successfully',
        data: favourites,
    });
}));
// Get Call for Paper Favourite by ID
const getcallForpaper_favouriteById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const favourite = yield callForpaper_favourite_service_1.callForpaper_favouriteService.getcallForpaper_favouriteById(id, req.query);
    if (!favourite) {
        return res.status(404).json({
            status: 'fail',
            message: 'Favourite not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single callForpaper favourite successfully',
        data: favourite,
    });
}));
const getMycallForpaper_favouriteById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const favourite = yield callForpaper_favourite_service_1.callForpaper_favouriteService.getMycallForpaper_favouriteById(id, req.query);
    if (!favourite) {
        return res.status(404).json({
            status: 'fail',
            message: 'Favourite not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'My callForpaper favourite successfully',
        data: favourite,
    });
}));
// Update Call for Paper Favourite
const updatecallForpaper_favourite = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { callForPaperId } = req.body;
    const updatedFavourite = yield callForpaper_favourite_service_1.callForpaper_favouriteService.updatecallForpaper_favourite(id, callForPaperId);
    if (!updatedFavourite) {
        return res.status(404).json({
            status: 'fail',
            message: 'Favourite not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'callForpaper favourite updated successfully',
        data: updatedFavourite,
    });
}));
// Delete Call for Paper Favourite
const deletecallForpaper_favourite = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedFavourite = yield callForpaper_favourite_service_1.callForpaper_favouriteService.deletecallForpaper_favourite(id);
    if (!deletedFavourite) {
        return res.status(404).json({
            status: 'fail',
            message: 'Favourite not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'callForpaper favourite removed successfully',
        data: deletedFavourite,
    });
}));
const getcallForpaper_favouriteByUserId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const callForPaper_favourite = yield callForpaper_favourite_service_1.callForpaper_favouriteService.getCallForPaperFavouriteByUserId(userId, req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'callForpaper favourite retrieved successfully',
        data: callForPaper_favourite,
    });
}));
exports.callForpaper_favouriteController = {
    createcallForpaper_favourite,
    getAllcallForpaper_favourite,
    getcallForpaper_favouriteById,
    updatecallForpaper_favourite,
    deletecallForpaper_favourite,
    getMycallForpaper_favouriteById,
    getcallForpaper_favouriteByUserId,
};
