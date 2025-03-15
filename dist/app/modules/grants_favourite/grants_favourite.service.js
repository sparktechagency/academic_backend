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
exports.grants_favouriteService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const grants_favourite_models_1 = __importDefault(require("./grants_favourite.models"));
// Create Grants Favourite
const creategrants_favourite = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the favourite entry already exists
    const existingGrants = yield grants_favourite_models_1.default.findOne({
        userId: payload.userId,
        grantsId: payload.grantsId,
        favourite: true,
    });
    if (existingGrants) {
        throw new Error('Already added to your favourite list');
    }
    const newFavourite = yield grants_favourite_models_1.default.create(Object.assign({}, payload));
    return newFavourite;
});
// Get All Grants Favourites
const getAllgrants_favourite = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const favouriteModel = new QueryBuilder_1.default(grants_favourite_models_1.default.find().populate('grantsId'), query)
        .search(['userId', 'grantsId'])
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
// Get Grants Favourite by ID
const getgrants_favouriteById = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    const favouriteModel = new QueryBuilder_1.default(grants_favourite_models_1.default.find({ _id: id }).populate('grantsId'), query)
        .search(['userId', 'grantsId'])
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
const getMygrants_favouriteById = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    const favouriteModel = new QueryBuilder_1.default(grants_favourite_models_1.default.find({ userId: id }).populate('grantsId'), query)
        .search(['userId', 'grantsId'])
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
// Update Grants Favourite
const updategrants_favourite = (id, grantsId) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedFavourite = yield grants_favourite_models_1.default.findByIdAndUpdate(id, { grantsId }, { new: true });
    return updatedFavourite;
});
// Delete Grants Favourite
const deletegrants_favourite = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedFavourite = yield grants_favourite_models_1.default.findByIdAndDelete(id);
    return deletedFavourite;
});
// const getgrants_FavouriteByUserId = async (
//   userId: string,
//   query: Record<string, any>,
// ) => {
//   const grantsFavouriteModel = new QueryBuilder(
//     GrantsFavourite.find({ userId }).populate('grantsId'),
//     query,
//   )
//     .search(['title']) // Adjust search fields as needed
//     .filter()
//     .paginate()
//     .sort();
//   const data: any = await grantsFavouriteModel.modelQuery;
//   const meta = await grantsFavouriteModel.countTotal();
//   return {
//     data,
//     meta,
//   };
// };
const getgrants_FavouriteByUserId = (userId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, page = 1, limit = 10, sortField = 'createdAt', sortOrder = 'desc', } = query;
    const matchStage = { userId: new mongoose_1.default.Types.ObjectId(userId) };
    const pipeline = [
        { $match: matchStage },
        {
            $lookup: {
                from: 'grants',
                localField: 'grantsId',
                foreignField: '_id',
                as: 'grantInfo',
            },
        },
        { $unwind: { path: '$grantInfo', preserveNullAndEmptyArrays: true } },
        {
            $match: searchTerm
                ? { 'grantInfo.name': { $regex: searchTerm, $options: 'i' } }
                : {},
        },
        { $sort: { [sortField]: sortOrder === 'asc' ? 1 : -1 } },
        { $skip: (page - 1) * limit },
        { $limit: parseInt(limit, 10) },
    ];
    const data = yield grants_favourite_models_1.default.aggregate(pipeline);
    const total = yield grants_favourite_models_1.default.countDocuments(matchStage);
    return { data, meta: { total, page, limit } };
});
exports.grants_favouriteService = {
    creategrants_favourite,
    getAllgrants_favourite,
    getgrants_favouriteById,
    updategrants_favourite,
    deletegrants_favourite,
    getMygrants_favouriteById,
    getgrants_FavouriteByUserId,
};
