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
exports.AdminService = void 0;
const moment_1 = __importDefault(require("moment"));
const user_constants_1 = require("../user/user.constants");
const user_models_1 = require("../user/user.models");
const dashboardData = (query) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const usersData = yield user_models_1.User.aggregate([
        {
            $facet: {
                totalUsers: [
                    { $match: { 'verification.status': true } },
                    { $count: 'count' },
                ],
                userDetails: [
                    { $match: { role: { $ne: user_constants_1.USER_ROLE.admin } } },
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            email: 1,
                            coin: 1,
                            role: 1,
                            referenceId: 1,
                            createdAt: 1,
                        },
                    },
                    {
                        $sort: { createdAt: -1 },
                    },
                    {
                        $limit: 15,
                    },
                ],
            },
        },
    ]);
    const totalMember = yield user_models_1.User.countDocuments({ role: user_constants_1.USER_ROLE === null || user_constants_1.USER_ROLE === void 0 ? void 0 : user_constants_1.USER_ROLE.user });
    const totalAdministrator = yield user_models_1.User.countDocuments({
        role: user_constants_1.USER_ROLE === null || user_constants_1.USER_ROLE === void 0 ? void 0 : user_constants_1.USER_ROLE.user,
    });
    // JoinYear: '2022', role: ''
    const userYear = (query === null || query === void 0 ? void 0 : query.JoinYear) ? query === null || query === void 0 ? void 0 : query.JoinYear : (0, moment_1.default)().year();
    const startOfUserYear = (0, moment_1.default)().year(userYear).startOf('year');
    const endOfUserYear = (0, moment_1.default)().year(userYear).endOf('year');
    const roleFilter = query.role
        ? { role: query.role }
        : { role: { $in: [user_constants_1.USER_ROLE.user, user_constants_1.USER_ROLE.user] } };
    const monthlyUser = yield user_models_1.User.aggregate([
        {
            $match: Object.assign(Object.assign({ 'verification.status': true }, roleFilter), { createdAt: {
                    $gte: startOfUserYear.toDate(),
                    $lte: endOfUserYear.toDate(),
                } }),
        },
        {
            $group: {
                _id: { month: { $month: '$createdAt' } }, // Group by month
                total: { $sum: 1 }, // Count users
            },
        },
        {
            $sort: { '_id.month': 1 }, // Ensure sorting from Jan-Dec
        },
    ]);
    // return monthlyUser;
    // Format monthly income to have an entry for each month
    const formattedMonthlyUsers = Array.from({ length: 12 }, (_, index) => ({
        month: (0, moment_1.default)().month(index).format('MMM'),
        total: 0,
    }));
    monthlyUser.forEach(entry => {
        formattedMonthlyUsers[entry._id.month - 1].total = Math.round(entry.total);
    });
    return {
        totalUsers: ((_b = (_a = usersData[0]) === null || _a === void 0 ? void 0 : _a.totalUsers[0]) === null || _b === void 0 ? void 0 : _b.count) || 0,
        totalMember,
        totalAdministrator,
        // transitionData,
        // totalIncome: totalEarnings,
        // toDayIncome: todayEarnings,
        // monthlyIncome: formattedMonthlyIncome,
        monthlyUsers: formattedMonthlyUsers,
        userDetails: (_c = usersData[0]) === null || _c === void 0 ? void 0 : _c.userDetails,
    };
});
exports.AdminService = {
    dashboardData,
};
