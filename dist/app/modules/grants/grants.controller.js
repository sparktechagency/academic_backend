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
exports.grantsController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const grants_service_1 = require("./grants.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
// Create Grant
const creategrants = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    req.body.userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const grant = yield grants_service_1.grantsService.creategrants(req.body);
    // res.status(201).json({ status: 'success', data: grant });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Grant created successfully',
        data: grant,
    });
}));
// Get All Grants
const getAllgrants = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const grants = yield grants_service_1.grantsService.getAllgrants(req.query);
    // res.status(200).json({ status: 'success', data: grants });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All Grants fetched successfully',
        data: grants,
    });
}));
// Get Grant by ID
const getgrantsById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const grant = yield grants_service_1.grantsService.getgrantsById(req.params.id, req.query);
    if (!grant) {
        return res.status(404).json({ status: 'fail', message: 'Grant not found' });
    }
    // res.status(200).json({ status: 'success', data: grant });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Grant fetched successfully',
        data: grant,
    });
}));
// Get Grant by ID
const getMygrantsById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const grant = yield grants_service_1.grantsService.getMygrantsById(id, req.query);
    if (!grant) {
        return res.status(404).json({ status: 'fail', message: 'Grant not found' });
    }
    // res.status(200).json({ status: 'success', data: grant });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'My Grant fetched successfully',
        data: grant,
    });
}));
// Update Grant
const updategrants = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedGrant = yield grants_service_1.grantsService.updategrants(req.params.id, req.body);
    if (!updatedGrant) {
        return res.status(404).json({ status: 'fail', message: 'Grant not found' });
    }
    // res.status(200).json({ status: 'success', data: updatedGrant });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Grant updated successfully',
        data: updatedGrant,
    });
}));
// Delete Grant
const deletegrants = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedGrant = yield grants_service_1.grantsService.deletegrants(req.params.id);
    if (!deletedGrant) {
        return res.status(404).json({ status: 'fail', message: 'Grant not found' });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Grant deleted successfully',
        data: deletedGrant,
    });
}));
const getgrantsByUserId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const grants = yield grants_service_1.grantsService.getgrantsByUserId(userId, req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Grants retrieved successfully',
        data: grants,
    });
}));
exports.grantsController = {
    creategrants,
    getAllgrants,
    getgrantsById,
    updategrants,
    deletegrants,
    getMygrantsById,
    getgrantsByUserId,
};
