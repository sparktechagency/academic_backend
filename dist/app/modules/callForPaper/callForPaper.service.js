"use strict";
// Service
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
exports.callForPaperService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const callForPaper_models_1 = __importDefault(require("./callForPaper.models"));
const createcallForPaper = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newCallForPaper = yield callForPaper_models_1.default.create(data);
    return newCallForPaper;
});
const getAllcallForPaper = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const callForPaperModel = new QueryBuilder_1.default(callForPaper_models_1.default.find().populate('userId'), query)
        .search(['title'])
        .filter()
        .paginate()
        .sort();
    const data = yield callForPaperModel.modelQuery;
    const meta = yield callForPaperModel.countTotal();
    return {
        data,
        meta,
    };
});
const getcallForPaperById = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    const callForPaperModel = new QueryBuilder_1.default(callForPaper_models_1.default.find({ _id: id }), query)
        .search(['title'])
        .filter()
        .paginate()
        .sort();
    const data = yield callForPaperModel.modelQuery;
    const meta = yield callForPaperModel.countTotal();
    return {
        data,
        meta,
    };
});
const getMycallForPaperById = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    const callForPaperModel = new QueryBuilder_1.default(callForPaper_models_1.default.find({ userId: id }), query)
        .search(['title'])
        .filter()
        .paginate()
        .sort();
    const data = yield callForPaperModel.modelQuery;
    const meta = yield callForPaperModel.countTotal();
    return {
        data,
        meta,
    };
});
const updatecallForPaper = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedCallForPaper = yield callForPaper_models_1.default.findByIdAndUpdate(id, data, {
        new: true,
    });
    return updatedCallForPaper;
});
const deletecallForPaper = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedCallForPaper = yield callForPaper_models_1.default.findByIdAndDelete(id);
    return deletedCallForPaper;
});
const getCallForPaperByUserId = (userId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const callForPaperModel = new QueryBuilder_1.default(callForPaper_models_1.default.find({ userId }), query)
        .search(['title'])
        .filter()
        .paginate()
        .sort();
    const data = yield callForPaperModel.modelQuery;
    const meta = yield callForPaperModel.countTotal();
    return {
        data,
        meta,
    };
});
exports.callForPaperService = {
    createcallForPaper,
    getAllcallForPaper,
    getcallForPaperById,
    updatecallForPaper,
    deletecallForPaper,
    getMycallForPaperById,
    getCallForPaperByUserId,
};
