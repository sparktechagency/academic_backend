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
exports.jobPostService = void 0;
// Service
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const mailSender_1 = require("../../utils/mailSender");
const jobPost_models_1 = __importDefault(require("./jobPost.models"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
// import QueryBuilder from '../../builder/QueryBuilder';
// import { Icontact } from './contact.interface';
// import { contactController } from './contact.controller';
// import contact from './contact.models';
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const subscriber_models_1 = __importDefault(require("../subscriber/subscriber.models"));
const p_limit_1 = __importDefault(require("p-limit"));
const createjobPost = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const job = yield jobPost_models_1.default.create(data);
    const subscribers = yield subscriber_models_1.default.find({ isSubscribed: true });
    const emailTemplatePath = path_1.default.join(__dirname, '../../../../public/view/jobPost_mail.html');
    if (!fs_1.default.existsSync(emailTemplatePath)) {
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Email template not found');
    }
    const emailTemplate = fs_1.default.readFileSync(emailTemplatePath, 'utf8');
    const emailContent = emailTemplate
        .replace('{{title}}', data.title)
        .replace('{{url}}', data.url)
        .replace('{{institution}}', data.institution)
        .replace('{{job_description}}', data.job_description)
        .replace('{{location}}', data.location);
    const limit = (0, p_limit_1.default)(10);
    const emailTasks = subscribers.map(subscriber => {
        if (subscriber.email) {
            return limit(() => (0, mailSender_1.sendEmail)(subscriber.email, 'New Job Post Available', emailContent));
        }
        return Promise.resolve();
    });
    yield Promise.all(emailTasks);
    return job;
});
const getAlljobPost = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const jobPostModel = new QueryBuilder_1.default(jobPost_models_1.default.find().populate('userId'), query)
        .search(['title'])
        .filter()
        .paginate()
        .sort();
    const data = yield jobPostModel.modelQuery;
    const meta = yield jobPostModel.countTotal();
    return {
        data,
        meta,
    };
});
const getjobPostById = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    const jobPostModel = new QueryBuilder_1.default(jobPost_models_1.default.find({ _id: id }), query)
        .search(['title'])
        .filter()
        .paginate()
        .sort();
    const data = yield jobPostModel.modelQuery;
    const meta = yield jobPostModel.countTotal();
    return {
        data,
        meta,
    };
});
const getMyjobPostById = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    const jobPostModel = new QueryBuilder_1.default(jobPost_models_1.default.find({ userId: id }), query)
        .search(['title'])
        .filter()
        .paginate()
        .sort();
    const data = yield jobPostModel.modelQuery;
    const meta = yield jobPostModel.countTotal();
    return {
        data,
        meta,
    };
});
const updatejobPost = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield jobPost_models_1.default.findByIdAndUpdate(id, data, { new: true });
});
const deletejobPost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield jobPost_models_1.default.findByIdAndDelete(id);
});
const getJobPostByUserId = (userId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const jobPostModel = new QueryBuilder_1.default(jobPost_models_1.default.find({ userId }), query)
        .search(['title']) // Adjust search fields as needed
        .filter()
        .paginate()
        .sort();
    const data = yield jobPostModel.modelQuery;
    const meta = yield jobPostModel.countTotal();
    return {
        data,
        meta,
    };
});
exports.jobPostService = {
    createjobPost,
    getAlljobPost,
    getjobPostById,
    updatejobPost,
    deletejobPost,
    getMyjobPostById,
    getJobPostByUserId,
};
