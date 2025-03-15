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
exports.callForpaper_favouriteService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const callForpaper_favourite_models_1 = __importDefault(require("./callForpaper_favourite.models"));
// Create Call for Paper Favourite
const createcallForpaper_favourite = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the favourite entry already exists
    const existingFavourite = yield callForpaper_favourite_models_1.default.findOne({
        userId: payload.userId,
        callForPaperId: payload.callForPaperId,
        favourite: true,
    });
    if (existingFavourite) {
        throw new Error('Already added to your favourite list');
    }
    const newFavourite = yield callForpaper_favourite_models_1.default.create(Object.assign({}, payload));
    return newFavourite;
});
// Get All Call for Paper Favourites
const getAllcallForpaper_favourite = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const favouriteModel = new QueryBuilder_1.default(callForpaper_favourite_models_1.default.find().populate('callForPaperId'), query)
        .search(['userId', 'callForPaperId'])
        .filter()
        .paginate()
        .sort();
    const data = yield favouriteModel.modelQuery;
    const meta = yield favouriteModel.countTotal();
    return {
        data,
        meta,
    };
});
// Get Call for Paper Favourite by ID
const getcallForpaper_favouriteById = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    const favouriteModel = new QueryBuilder_1.default(callForpaper_favourite_models_1.default.find({ _id: id }).populate('callForPaperId'), query)
        .search(['userId', 'callForPaperId'])
        .filter()
        .paginate()
        .sort();
    const data = yield favouriteModel.modelQuery;
    const meta = yield favouriteModel.countTotal();
    return {
        data,
        meta,
    };
});
const getMycallForpaper_favouriteById = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    const favouriteModel = new QueryBuilder_1.default(callForpaper_favourite_models_1.default.find({ userId: id }).populate('callForPaperId'), query)
        .search(['userId', 'callForPaperId'])
        .filter()
        .paginate()
        .sort();
    const data = yield favouriteModel.modelQuery;
    const meta = yield favouriteModel.countTotal();
    return {
        data,
        meta,
    };
});
// Update Call for Paper Favourite
const updatecallForpaper_favourite = (id, callForPaperId) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedFavourite = yield callForpaper_favourite_models_1.default.findByIdAndUpdate(id, { callForPaperId }, { new: true });
    return updatedFavourite;
});
// Delete Call for Paper Favourite
const deletecallForpaper_favourite = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedFavourite = yield callForpaper_favourite_models_1.default.findByIdAndDelete(id);
    return deletedFavourite;
});
// const getCallForPaperFavouriteByUserId = async (
//   userId: string,
//   query: Record<string, any>,
// ) => {
//   const callForPaperFavouriteModel = new QueryBuilder(
//     CallForpaperFavourite.find({ userId }).populate('callForPaperId'),
//     query,
//   )
//     .search(['title']) // You can adjust the search fields as needed
//     .filter()
//     .paginate()
//     .sort();
//   const data: any = await callForPaperFavouriteModel.modelQuery;
//   const meta = await callForPaperFavouriteModel.countTotal();
//   return {
//     data,
//     meta,
//   };
// };
const getCallForPaperFavouriteByUserId = (userId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, page = 1, limit = 10, sortField = 'createdAt', sortOrder = 'desc', } = query;
    const matchStage = { userId: new mongoose_1.default.Types.ObjectId(userId) };
    const pipeline = [
        { $match: matchStage },
        {
            $lookup: {
                from: 'callforpapers', // Ensure this matches your actual collection name
                localField: 'callForPaperId',
                foreignField: '_id',
                as: 'callForPaperInfo',
            },
        },
        {
            $unwind: {
                path: '$callForPaperInfo',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $match: searchTerm
                ? { 'callForPaperInfo.title': { $regex: searchTerm, $options: 'i' } }
                : {},
        },
        { $sort: { [sortField]: sortOrder === 'asc' ? 1 : -1 } },
        { $skip: (page - 1) * limit },
        { $limit: parseInt(limit, 10) },
    ];
    const data = yield callForpaper_favourite_models_1.default.aggregate(pipeline);
    const total = yield callForpaper_favourite_models_1.default.countDocuments(matchStage);
    return {
        data,
        meta: {
            total,
            page,
            limit,
        },
    };
});
exports.callForpaper_favouriteService = {
    createcallForpaper_favourite,
    getAllcallForpaper_favourite,
    getcallForpaper_favouriteById,
    updatecallForpaper_favourite,
    deletecallForpaper_favourite,
    getMycallForpaper_favouriteById,
    getCallForPaperFavouriteByUserId,
};
