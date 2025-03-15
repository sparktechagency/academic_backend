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
exports.grants_favouriteController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const grants_favourite_service_1 = require("./grants_favourite.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
// Create Grants Favourite
const creategrants_favourite = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
    req.body.userId = userId;
    const newFavourite = yield grants_favourite_service_1.grants_favouriteService.creategrants_favourite(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Grant favourite created successfully',
        data: newFavourite,
    });
}));
// Get All Grants Favourites
const getAllgrants_favourite = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const favourites = yield grants_favourite_service_1.grants_favouriteService.getAllgrants_favourite(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Grant favourite fetched successfully',
        data: favourites,
    });
}));
// Get Grants Favourite by ID
const getgrants_favouriteById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const favourite = yield grants_favourite_service_1.grants_favouriteService.getgrants_favouriteById(id, req.query);
    if (!favourite) {
        return res.status(404).json({
            status: 'fail',
            message: 'Favourite not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Grant fetched successfully',
        data: favourite,
    });
}));
// Get Grants Favourite by ID
const getMygrants_favouriteById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const favourite = yield grants_favourite_service_1.grants_favouriteService.getMygrants_favouriteById(id, req.query);
    if (!favourite) {
        return res.status(404).json({
            status: 'fail',
            message: 'Favourite not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'My Grant fetched successfully',
        data: favourite,
    });
}));
// Update Grants Favourite
const updategrants_favourite = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { grantsId } = req.body;
    const updatedFavourite = yield grants_favourite_service_1.grants_favouriteService.updategrants_favourite(id, grantsId);
    if (!updatedFavourite) {
        return res.status(404).json({
            status: 'fail',
            message: 'Favourite not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Grant favourite updated successfully',
        data: updatedFavourite,
    });
}));
// Delete Grants Favourite
const deletegrants_favourite = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedFavourite = yield grants_favourite_service_1.grants_favouriteService.deletegrants_favourite(id);
    if (!deletedFavourite) {
        return res.status(404).json({
            status: 'fail',
            message: 'Favourite not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Grant favourite deleted successfully',
        data: deletedFavourite,
    });
}));
const getgrants_favouriteByUserId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const grants_favourite = yield grants_favourite_service_1.grants_favouriteService.getgrants_FavouriteByUserId(userId, req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Grant favourite retrieved successfully',
        data: grants_favourite,
    });
}));
exports.grants_favouriteController = {
    creategrants_favourite,
    getAllgrants_favourite,
    getgrants_favouriteById,
    updategrants_favourite,
    deletegrants_favourite,
    getMygrants_favouriteById,
    getgrants_favouriteByUserId,
};
