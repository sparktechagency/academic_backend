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
exports.event_favouriteService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const event_favourite_models_1 = __importDefault(require("./event_favourite.models"));
const mongoose_1 = __importDefault(require("mongoose"));
// Create Event Favourite
const createevent_favourite = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the favourite entry already exists
    const existingEvent = yield event_favourite_models_1.default.findOne({
        userId: payload.userId,
        eventId: payload.eventId,
        favourite: true,
    });
    if (existingEvent) {
        throw new Error('Already added to your favourite list');
    }
    const newFavourite = yield event_favourite_models_1.default.create(Object.assign({}, payload));
    return newFavourite;
});
// Get All Event Favourites
const getAllevent_favourite = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const favouriteModel = new QueryBuilder_1.default(event_favourite_models_1.default.find().populate('eventId'), query)
        .search(['userId', 'eventId'])
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
// Get Event Favourite by ID
const getevent_favouriteById = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    const favouriteModel = new QueryBuilder_1.default(event_favourite_models_1.default.find({ _id: id }).populate('eventId'), query)
        .search(['userId', 'eventId'])
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
// Get Event Favourite by ID
const getMyevent_favouriteById = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    const favouriteModel = new QueryBuilder_1.default(event_favourite_models_1.default.find({ userId: id }).populate('eventId'), query)
        .search(['userId', 'eventId'])
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
// Update Event Favourite
const updateevent_favourite = (id, eventId) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedFavourite = yield event_favourite_models_1.default.findByIdAndUpdate(id, { eventId }, { new: true });
    return updatedFavourite;
});
// Delete Event Favourite
const deleteevent_favourite = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedFavourite = yield event_favourite_models_1.default.findByIdAndDelete(id);
    return deletedFavourite;
});
// const getEventFavouriteByUserId = async (
//   userId: string,
//   query: Record<string, any>,
// ) => {
//   const eventFavouriteModel = new QueryBuilder(
//     EventFavourite.find({ userId }).populate('eventId'),
//     query,
//   )
//     .search(['title']) // Adjust search fields as needed
//     .filter()
//     .paginate()
//     .sort();
//   const data: any = await eventFavouriteModel.modelQuery;
//   const meta = await eventFavouriteModel.countTotal();
//   return {
//     data,
//     meta,
//   };
// };
const getEventFavouriteByUserId = (userId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, page = 1, limit = 10, sortField = 'createdAt', sortOrder = 'desc', } = query;
    const matchStage = { userId: new mongoose_1.default.Types.ObjectId(userId) };
    const pipeline = [
        { $match: matchStage },
        {
            $lookup: {
                from: 'events',
                localField: 'eventId',
                foreignField: '_id',
                as: 'eventInfo',
            },
        },
        { $unwind: { path: '$eventInfo', preserveNullAndEmptyArrays: true } },
        {
            $match: searchTerm
                ? { 'eventInfo.title': { $regex: searchTerm, $options: 'i' } }
                : {},
        },
        { $sort: { [sortField]: sortOrder === 'asc' ? 1 : -1 } },
        { $skip: (page - 1) * limit },
        { $limit: parseInt(limit, 10) },
    ];
    const data = yield event_favourite_models_1.default.aggregate(pipeline);
    const total = yield event_favourite_models_1.default.countDocuments(matchStage);
    return { data, meta: { total, page, limit } };
});
exports.event_favouriteService = {
    createevent_favourite,
    getAllevent_favourite,
    getevent_favouriteById,
    updateevent_favourite,
    deleteevent_favourite,
    getMyevent_favouriteById,
    getEventFavouriteByUserId,
};
