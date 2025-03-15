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
exports.termsController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const terms_service_1 = require("./terms.service");
const terms_models_1 = __importDefault(require("./terms.models"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
// Create Terms
const createterms = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description } = req.body;
    const newTerms = yield terms_service_1.termsService.createterms(description);
    res.status(201).json({
        status: 'success',
        data: newTerms,
    });
}));
// Get All Terms
const getAllterms = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const termsList = yield terms_service_1.termsService.getAllterms();
    res.status(200).json({
        status: 'success',
        data: termsList,
    });
}));
// Get Terms by ID
const gettermsById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const terms = yield terms_service_1.termsService.gettermsById(id);
    if (!terms) {
        return res.status(404).json({
            status: 'fail',
            message: 'Terms not found',
        });
    }
    res.status(200).json({
        status: 'success',
        data: terms,
    });
}));
// Update Terms
const updateterms = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const terms = yield terms_models_1.default.findOne({});
    const updatedTerms = yield terms_models_1.default.findByIdAndUpdate(terms === null || terms === void 0 ? void 0 : terms._id, {
        description: req.body.description,
    }, { new: true });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Updated successfully',
        data: updatedTerms,
    });
}));
// Delete Terms
const deleteterms = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedTerms = yield terms_service_1.termsService.deleteterms(id);
    if (!deletedTerms) {
        return res.status(404).json({
            status: 'fail',
            message: 'Terms not found',
        });
    }
    res.status(204).json({
        status: 'success',
        message: 'Terms record deleted successfully',
    });
}));
exports.termsController = {
    createterms,
    getAllterms,
    gettermsById,
    updateterms,
    deleteterms,
};
