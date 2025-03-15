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
exports.eventService = void 0;
const event_models_1 = __importDefault(require("./event.models"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const notification_service_1 = require("../notification/notification.service");
const user_constants_1 = require("../user/user.constants");
const notification_interface_1 = require("../notification/notification.interface");
const mailSender_1 = require("../../utils/mailSender");
const p_limit_1 = __importDefault(require("p-limit"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const path_1 = __importDefault(require("path"));
const subscriber_models_1 = __importDefault(require("../subscriber/subscriber.models"));
const fs_1 = __importDefault(require("fs"));
const user_models_1 = require("../user/user.models");
const createevent = (eventData) => __awaiter(void 0, void 0, void 0, function* () {
    const newEvent = yield event_models_1.default.create(eventData);
    const subscribers = yield subscriber_models_1.default.find({ isSubscribed: true });
    const emailTemplatePath = path_1.default.join(__dirname, '../../../../public/view/event_mail.html');
    if (!fs_1.default.existsSync(emailTemplatePath)) {
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Email template not found');
    }
    const emailTemplate = fs_1.default.readFileSync(emailTemplatePath, 'utf8');
    const emailContent = emailTemplate
        .replace('{{title}}', eventData.title)
        .replace('{{url}}', eventData.url)
        .replace('{{institution}}', eventData.event_start_date)
        .replace('{{job_description}}', eventData.event_end_date)
        .replace('{{location}}', eventData.organizer);
    const limit = (0, p_limit_1.default)(10);
    const emailTasks = subscribers.map(subscriber => {
        if (subscriber.email) {
            return limit(() => (0, mailSender_1.sendEmail)(subscriber.email, 'Event Post Available', emailContent));
        }
        return Promise.resolve();
    });
    yield Promise.all(emailTasks);
    const admin = yield user_models_1.User.findOne({ role: user_constants_1.USER_ROLE === null || user_constants_1.USER_ROLE === void 0 ? void 0 : user_constants_1.USER_ROLE.admin });
    yield notification_service_1.notificationServices.insertNotificationIntoDb({
        receiver: admin === null || admin === void 0 ? void 0 : admin._id,
        message: 'Event Created successfully',
        description: `User ${eventData.userId} has successfully created an event titled "${eventData.title}".`,
        refference: newEvent._id,
        model_type: notification_interface_1.modeType.Event,
    });
    return newEvent;
});
const getAllevent = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const eventModel = new QueryBuilder_1.default(event_models_1.default.find().populate('userId'), query)
        .search(['title'])
        .filter()
        .paginate()
        .sort();
    const data = yield eventModel.modelQuery;
    const meta = yield eventModel.countTotal();
    return {
        data,
        meta,
    };
});
const geteventById = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    const eventModel = new QueryBuilder_1.default(event_models_1.default.find({ _id: id }), query)
        .search(['title'])
        .filter()
        .paginate()
        .sort();
    const data = yield eventModel.modelQuery;
    const meta = yield eventModel.countTotal();
    return {
        data,
        meta,
    };
});
const getMyeventById = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    const eventModel = new QueryBuilder_1.default(event_models_1.default.find({ userId: id }), query)
        .search(['title'])
        .filter()
        .paginate()
        .sort();
    const data = yield eventModel.modelQuery;
    const meta = yield eventModel.countTotal();
    return {
        data,
        meta,
    };
});
const updateevent = (id, eventData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedEvent = yield event_models_1.default.findByIdAndUpdate(id, eventData, {
        new: true,
    });
    return updatedEvent;
});
const deleteevent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedEvent = yield event_models_1.default.findByIdAndDelete(id);
    return deletedEvent;
});
const getEventByUserId = (userId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const eventModel = new QueryBuilder_1.default(event_models_1.default.find({ userId }), query)
        .search(['title']) // Adjust search fields as needed
        .filter()
        .paginate()
        .sort();
    const data = yield eventModel.modelQuery;
    const meta = yield eventModel.countTotal();
    return {
        data,
        meta,
    };
});
exports.eventService = {
    createevent,
    getAllevent,
    geteventById,
    updateevent,
    deleteevent,
    getMyeventById,
    getEventByUserId,
};
