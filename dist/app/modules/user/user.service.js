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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const user_models_1 = require("./user.models");
const pick_1 = __importDefault(require("../../utils/pick"));
const pagination_1 = require("../../constants/pagination");
const user_constants_1 = require("./user.constants");
const mongoose_1 = require("mongoose");
const pagination_helpers_1 = require("../../helpers/pagination.helpers");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_models_1.User.isUserExist(payload.email);
    if (isExist) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'User already exists with this email');
    }
    if (payload === null || payload === void 0 ? void 0 : payload.isGoogleLogin) {
        payload.verification = {
            otp: 0,
            expiresAt: new Date(Date.now()),
            status: true,
        };
    }
    if (!payload.isGoogleLogin && !payload.password) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Password is required');
    }
    const user = yield user_models_1.User.create(payload);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'User creation failed');
    }
    return user;
});
// const getAllUser = async (query: Record<string, any>) => {
//   const userModel = new QueryBuilder(
//     User.find({ role: 'user', status: 'active' }),
//     query,
//   )
//     .search(['name', 'email', 'phoneNumber', 'status'])
//     .filter()
//     .paginate()
//     .sort();
//   const data: any = await userModel.modelQuery;
//   const meta = await userModel.countTotal();
//   return {
//     data,
//     meta,
//   };
// };
const getAllUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const paginationOptions = (0, pick_1.default)(query, pagination_1.paginationFields);
    const filters = Object.fromEntries(Object.entries(query).filter(([key, value]) => !pagination_1.paginationFields.includes(key) && value != null && value !== ''));
    const { searchTerm, latitude, longitude } = filters, filtersData = __rest(filters, ["searchTerm", "latitude", "longitude"]);
    const pipeline = [];
    if (latitude && longitude) {
        pipeline.push({
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [parseFloat(longitude), parseFloat(latitude)],
                },
                key: 'location',
                maxDistance: parseFloat(5) * 1609,
                distanceField: 'dist.calculated',
                spherical: true,
            },
        });
    }
    // Add a match to exclude deleted documents
    pipeline.push({
        $match: {
            isDeleted: false,
        },
    });
    // If searchTerm is provided, add a search condition
    if (searchTerm) {
        pipeline.push({
            $match: {
                $or: user_constants_1.userSearchableFields.map(field => ({
                    [field]: {
                        $regex: searchTerm,
                        $options: 'i',
                    },
                })),
            },
        });
    }
    // Add custom filters (filtersData) to the aggregation pipeline
    if (Object.entries(filtersData).length) {
        Object.entries(filtersData).map(([field, value]) => {
            if (/^\[.*?\]$/.test(value)) {
                const match = value.match(/\[(.*?)\]/);
                const queryValue = match ? match[1] : value;
                pipeline.push({
                    $match: {
                        [field]: { $in: [new mongoose_1.Types.ObjectId(queryValue)] },
                    },
                });
                delete filtersData[field];
            }
        });
        if (Object.entries(filtersData).length) {
            pipeline.push({
                $match: {
                    $and: Object.entries(filtersData).map(([field, value]) => ({
                        isDeleted: false,
                        [field]: value,
                    })),
                },
            });
        }
    }
    // Sorting condition
    const { page, limit, skip, sort } = pagination_helpers_1.paginationHelper.calculatePagination(paginationOptions);
    if (sort) {
        const sortArray = sort.split(',').map(field => {
            const trimmedField = field.trim();
            if (trimmedField.startsWith('-')) {
                return { [trimmedField.slice(1)]: -1 };
            }
            return { [trimmedField]: 1 };
        });
        pipeline.push({ $sort: Object.assign({}, ...sortArray) });
    }
    pipeline.push({
        $facet: {
            totalData: [{ $count: 'total' }], // Count total documents after filters
            paginatedData: [{ $skip: skip }, { $limit: limit }],
        },
    });
    const [result] = yield user_models_1.User.aggregate(pipeline);
    const total = ((_b = (_a = result === null || result === void 0 ? void 0 : result.totalData) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.total) || 0; // Get total count
    const data = (result === null || result === void 0 ? void 0 : result.paginatedData) || []; // Get paginated data
    return {
        data,
        meta: { page, limit, total },
    };
});
const geUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_models_1.User.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    return result;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_models_1.User.findByIdAndUpdate(id, payload, { new: true });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'User updating failed');
    }
    return user;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_models_1.User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'user deleting failed');
    }
    return user;
});
exports.userService = {
    createUser,
    getAllUser,
    geUserById,
    updateUser,
    deleteUser,
};
