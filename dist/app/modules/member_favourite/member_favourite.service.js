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
exports.member_favouriteService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const member_favourite_models_1 = __importDefault(require("./member_favourite.models"));
// Create Member Favourite
const createmember_favourite = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the favourite entry already exists
    const existingMember = yield member_favourite_models_1.default.findOne({
        userId: payload.userId,
        memberId: payload.memberId,
        favourite: true,
    });
    if (existingMember) {
        throw new Error('Already added to your favourite list');
    }
    const newFavourite = yield member_favourite_models_1.default.create(payload);
    return newFavourite;
});
// Get All Member Favourites
const getAllmember_favourite = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const favouriteModel = new QueryBuilder_1.default(member_favourite_models_1.default.find().populate('memberId'), query)
        .search(['userId', 'memberId'])
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
// Get Member Favourite by ID
const getmember_favouriteById = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    const favouriteModel = new QueryBuilder_1.default(member_favourite_models_1.default.find({ _id: id }).populate('memberId'), query)
        .search(['userId', 'memberId'])
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
const getMymember_favouriteById = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    const favouriteModel = new QueryBuilder_1.default(member_favourite_models_1.default.find({ userId: id }).populate('memberId'), query)
        .search(['userId', 'memberId'])
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
// Update Member Favourite
const updatemember_favourite = (id, memberId) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedFavourite = yield member_favourite_models_1.default.findByIdAndUpdate(id, { memberId }, { new: true });
    return updatedFavourite;
});
// Delete Member Favourite
const deletemember_favourite = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedFavourite = yield member_favourite_models_1.default.findByIdAndDelete(id);
    return deletedFavourite;
});
// const getMemberFavouriteByUserId = async (
//   userId: string,
//   query: Record<string, any>,
// ) => {
//   const favouriteModel = new QueryBuilder(
//     MemberFavourite.find({ userId }).populate('memberId'),
//     query,
//   )
//     .search(['userId', 'memberId'])
//     .filter()
//     .paginate()
//     .sort();
//   const data: any = await favouriteModel.modelQuery;
//   const meta = await favouriteModel.countTotal();
//   return {
//     data,
//     meta,
//   };
// };
const getMemberFavouriteByUserId = (userId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, page = 1, limit = 10, sortField = 'createdAt', sortOrder = 'desc', } = query;
    const matchStage = { userId: new mongoose_1.default.Types.ObjectId(userId) };
    const pipeline = [
        { $match: matchStage },
        {
            $lookup: {
                from: 'users',
                localField: 'memberId',
                foreignField: '_id',
                as: 'memberInfo',
            },
        },
        { $unwind: { path: '$memberInfo', preserveNullAndEmptyArrays: true } },
        {
            $match: searchTerm
                ? { 'memberInfo.name': { $regex: searchTerm, $options: 'i' } }
                : {},
        },
        { $sort: { [sortField]: sortOrder === 'asc' ? 1 : -1 } },
        { $skip: (page - 1) * limit },
        { $limit: parseInt(limit, 10) },
    ];
    const data = yield member_favourite_models_1.default.aggregate(pipeline);
    const total = yield member_favourite_models_1.default.countDocuments(matchStage);
    return { data, meta: { total, page, limit } };
});
exports.member_favouriteService = {
    createmember_favourite,
    getAllmember_favourite,
    getmember_favouriteById,
    updatemember_favourite,
    deletemember_favourite,
    getMymember_favouriteById,
    getMemberFavouriteByUserId,
};
