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
exports.eventController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const event_service_1 = require("./event.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
// Create Event
const createevent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    req.body.userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const eventData = req.body;
    const newEvent = yield event_service_1.eventService.createevent(eventData);
    res.status(201).json({
        status: 'success',
        data: newEvent,
    });
}));
// Get All Events
const getAllevent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield event_service_1.eventService.getAllevent(req.query);
    res.status(200).json({
        status: 'success',
        data: events,
    });
}));
// Get Event by ID
const geteventById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const event = yield event_service_1.eventService.geteventById(id, req.query);
    if (!event) {
        return res.status(404).json({
            status: 'fail',
            message: 'Event not found',
        });
    }
    res.status(200).json({
        status: 'success',
        data: event,
    });
}));
// Get Event by ID
const getMyeventById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const event = yield event_service_1.eventService.getMyeventById(id, req.query);
    if (!event) {
        return res.status(404).json({
            status: 'fail',
            message: 'Event not found',
        });
    }
    res.status(200).json({
        status: 'success',
        data: event,
    });
}));
// Update Event
const updateevent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const eventData = req.body;
    const updatedEvent = yield event_service_1.eventService.updateevent(id, eventData);
    if (!updatedEvent) {
        return res.status(404).json({
            status: 'fail',
            message: 'Event not found',
        });
    }
    res.status(200).json({
        status: 'success',
        data: updatedEvent,
    });
}));
// Delete Event
const deleteevent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedEvent = yield event_service_1.eventService.deleteevent(id);
    if (!deletedEvent) {
        return res.status(404).json({
            status: 'fail',
            message: 'Event not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Event deleted successfully',
        data: deletedEvent,
    });
}));
const getEventByUserId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const event = yield event_service_1.eventService.getEventByUserId(userId, req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Event retrieved successfully',
        data: event,
    });
}));
exports.eventController = {
    createevent,
    getAllevent,
    geteventById,
    updateevent,
    deleteevent,
    getMyeventById,
    getEventByUserId,
};
