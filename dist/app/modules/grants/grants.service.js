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
exports.grantsService = void 0;
// grants.service.ts
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const grants_models_1 = __importDefault(require("./grants.models"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
// import QueryBuilder from '../../builder/QueryBuilder';
// import { Icontact } from './contact.interface';
// import { contactController } from './contact.controller';
// import contact from './contact.models';
const path_1 = __importDefault(require("path"));
// import { sendEmail } from '../../utils/mailSender';
// import { User } from '../user/user.models';
const fs_1 = __importDefault(require("fs"));
const subscriber_models_1 = __importDefault(require("../subscriber/subscriber.models"));
const mailSender_1 = require("../../utils/mailSender");
const p_limit_1 = __importDefault(require("p-limit"));
const creategrants = (grantData) => __awaiter(void 0, void 0, void 0, function* () {
    const grants = yield grants_models_1.default.create(grantData);
    const subscribers = yield subscriber_models_1.default.find({ isSubscribed: true });
    const emailTemplatePath = path_1.default.join(__dirname, '../../../../public/view/grants_mail.html');
    if (!fs_1.default.existsSync(emailTemplatePath)) {
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Email template not found');
    }
    const emailTemplate = fs_1.default.readFileSync(emailTemplatePath, 'utf8');
    const emailContent = emailTemplate
        .replace('{{name}}', grantData.name)
        .replace('{{url}}', grantData.url)
        .replace('{{type}}', grantData.type)
        .replace('{{amount}}', grantData.amount)
        .replace('{{application_deadline}}', grantData.application_deadline);
    const limit = (0, p_limit_1.default)(10);
    const emailTasks = subscribers.map(subscriber => {
        if (subscriber.email) {
            return limit(() => (0, mailSender_1.sendEmail)(subscriber.email, 'New Job Post Available', emailContent));
        }
        return Promise.resolve();
    });
    yield Promise.all(emailTasks);
    return grants;
});
const getAllgrants = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const grantsModel = new QueryBuilder_1.default(grants_models_1.default.find().populate('userId'), query)
        .search(['name'])
        .filter()
        .paginate()
        .sort();
    const data = yield grantsModel.modelQuery;
    const meta = yield grantsModel.countTotal();
    return {
        data,
        meta,
    };
});
const getgrantsById = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    const grantsModel = new QueryBuilder_1.default(grants_models_1.default.find({ _id: id }), query)
        .search(['name'])
        .filter()
        .paginate()
        .sort();
    const data = yield grantsModel.modelQuery;
    const meta = yield grantsModel.countTotal();
    return {
        data,
        meta,
    };
});
const getMygrantsById = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    const grantsModel = new QueryBuilder_1.default(grants_models_1.default.find({ userId: id }), query)
        .search(['name'])
        .filter()
        .paginate()
        .sort();
    const data = yield grantsModel.modelQuery;
    const meta = yield grantsModel.countTotal();
    return {
        data,
        meta,
    };
});
const updategrants = (id, grantData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield grants_models_1.default.findByIdAndUpdate(id, grantData, { new: true });
});
const deletegrants = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield grants_models_1.default.findByIdAndDelete(id);
});
const getgrantsByUserId = (userId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const grants = new QueryBuilder_1.default(grants_models_1.default.find({ userId }), query)
        .search(['title'])
        .filter()
        .paginate()
        .sort();
    const data = yield grants.modelQuery;
    const meta = yield grants.countTotal();
    return {
        data,
        meta,
    };
});
exports.grantsService = {
    creategrants,
    getAllgrants,
    getgrantsById,
    updategrants,
    deletegrants,
    getMygrantsById,
    getgrantsByUserId,
};
