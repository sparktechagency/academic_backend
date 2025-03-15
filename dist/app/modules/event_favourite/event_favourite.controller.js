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
exports.event_favouriteController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const event_favourite_service_1 = require("./event_favourite.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
// Create Event Favourite
const createevent_favourite = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
    req.body.userId = userId;
    const newFavourite = yield event_favourite_service_1.event_favouriteService.createevent_favourite(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'event favourite created successfully',
        data: newFavourite,
    });
}));
// Get All Event Favourites
const getAllevent_favourite = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const favourites = yield event_favourite_service_1.event_favouriteService.getAllevent_favourite(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'event favourite fetched successfully',
        data: favourites,
    });
}));
// Get Event Favourite by ID
const getevent_favouriteById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const favourite = yield event_favourite_service_1.event_favouriteService.getevent_favouriteById(id, req.query);
    if (!favourite) {
        return res.status(404).json({
            status: 'fail',
            message: 'Favourite not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'event favourite fetched successfully',
        data: favourite,
    });
}));
// Get Event Favourite by ID
const getMyevent_favouriteById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const favourite = yield event_favourite_service_1.event_favouriteService.getMyevent_favouriteById(id, req.query);
    if (!favourite) {
        return res.status(404).json({
            status: 'fail',
            message: 'Favourite not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'event favourite fetched successfully',
        data: favourite,
    });
}));
// Update Event Favourite
const updateevent_favourite = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { eventId } = req.body;
    const updatedFavourite = yield event_favourite_service_1.event_favouriteService.updateevent_favourite(id, eventId);
    if (!updatedFavourite) {
        return res.status(404).json({
            status: 'fail',
            message: 'Favourite not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'event favourite updated successfully',
        data: updatedFavourite,
    });
}));
// Delete Event Favourite
const deleteevent_favourite = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedFavourite = yield event_favourite_service_1.event_favouriteService.deleteevent_favourite(id);
    if (!deletedFavourite) {
        return res.status(404).json({
            status: 'fail',
            message: 'Favourite not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'event favourite removed successfully',
        data: deletedFavourite,
    });
}));
const getevent_favouriteByUserId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const event_favourite = yield event_favourite_service_1.event_favouriteService.getEventFavouriteByUserId(userId, req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'event favourite retrieved successfully',
        data: event_favourite,
    });
}));
exports.event_favouriteController = {
    createevent_favourite,
    getAllevent_favourite,
    getevent_favouriteById,
    updateevent_favourite,
    deleteevent_favourite,
    getMyevent_favouriteById,
    getevent_favouriteByUserId,
};
