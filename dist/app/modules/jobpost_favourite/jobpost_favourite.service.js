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
exports.jobpost_favouriteService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const jobpost_favourite_models_1 = __importDefault(require("./jobpost_favourite.models"));
// Create Job Post Favourite
const createjobpost_favourite = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the favourite entry already exists
    const existingJobPost = yield jobpost_favourite_models_1.default.findOne({
        userId: payload.userId,
        jobpostId: payload.jobpostId,
        favourite: true,
    });
    if (existingJobPost) {
        throw new Error('Already added to your favourite list');
    }
    const newFavourite = yield jobpost_favourite_models_1.default.create(Object.assign({}, payload));
    return newFavourite;
});
// Get All Job Post Favourites
const getAlljobpost_favourite = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const favouriteModel = new QueryBuilder_1.default(jobpost_favourite_models_1.default.find().populate('jobpostId'), query)
        .search(['userId', 'jobpostId'])
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
// Get Job Post Favourite by ID
const getjobpost_favouriteById = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    const favouriteModel = new QueryBuilder_1.default(jobpost_favourite_models_1.default.find({ _id: id }).populate('jobpostId'), query)
        .search(['userId', 'jobpostId'])
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
const getMyjobpost_favouriteById = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    const favouriteModel = new QueryBuilder_1.default(jobpost_favourite_models_1.default.find({ userId: id }).populate('jobpostId'), query)
        .search(['userId', 'jobpostId'])
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
// Update Job Post Favourite
const updatejobpost_favourite = (id, jobpostId) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedFavourite = yield jobpost_favourite_models_1.default.findByIdAndUpdate(id, { jobpostId }, { new: true });
    return updatedFavourite;
});
// Delete Job Post Favourite
const deletejobpost_favourite = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedFavourite = yield jobpost_favourite_models_1.default.findByIdAndDelete(id);
    return deletedFavourite;
});
// const getJobPostFavouriteByUserId = async (
//   userId: string,
//   query: Record<string, any>,
// ) => {
//   const jobPostFavouriteModel = new QueryBuilder(
//     JobPostFavourite.find({ userId }).populate('jobpostId'),
//     query,
//   )
//     .search(['title']) // Adjust search fields as needed
//     .filter()
//     .paginate()
//     .sort();
//   const data: any = await jobPostFavouriteModel.modelQuery;
//   const meta = await jobPostFavouriteModel.countTotal();
//   return {
//     data,
//     meta,
//   };
// };
const getJobPostFavouriteByUserId = (userId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, page = 1, limit = 10, sortField = 'createdAt', sortOrder = 'desc', } = query;
    const matchStage = { userId: new mongoose_1.default.Types.ObjectId(userId) };
    const pipeline = [
        { $match: matchStage },
        {
            $lookup: {
                from: 'jobposts',
                localField: 'jobpostId',
                foreignField: '_id',
                as: 'jobPostInfo',
            },
        },
        { $unwind: { path: '$jobPostInfo', preserveNullAndEmptyArrays: true } },
        {
            $match: searchTerm
                ? { 'jobPostInfo.title': { $regex: searchTerm, $options: 'i' } }
                : {},
        },
        { $sort: { [sortField]: sortOrder === 'asc' ? 1 : -1 } },
        { $skip: (page - 1) * limit },
        { $limit: parseInt(limit, 10) },
    ];
    const data = yield jobpost_favourite_models_1.default.aggregate(pipeline);
    const total = yield jobpost_favourite_models_1.default.countDocuments(matchStage);
    return { data, meta: { total, page, limit } };
});
exports.jobpost_favouriteService = {
    createjobpost_favourite,
    getAlljobpost_favourite,
    getjobpost_favouriteById,
    updatejobpost_favourite,
    deletejobpost_favourite,
    getMyjobpost_favouriteById,
    getJobPostFavouriteByUserId,
};
