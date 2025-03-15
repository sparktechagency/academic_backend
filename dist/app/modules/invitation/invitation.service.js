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
exports.invitationService = void 0;
const p_limit_1 = __importDefault(require("p-limit"));
const mailSender_1 = require("../../utils/mailSender");
const invitation_models_1 = __importDefault(require("./invitation.models"));
const path_1 = __importDefault(require("path"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const fs_1 = __importDefault(require("fs"));
const createinvitation = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const invitations = yield invitation_models_1.default.create(data);
    const invites = yield invitation_models_1.default.find();
    const emailTemplatePath = path_1.default.join(__dirname, '../../../../public/view/invite_mail.html');
    if (!fs_1.default.existsSync(emailTemplatePath)) {
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Email template not found');
    }
    const emailTemplate = fs_1.default.readFileSync(emailTemplatePath, 'utf8');
    const emailContent = emailTemplate;
    const limit = (0, p_limit_1.default)(10);
    const emailTasks = invites.map(invite => {
        if (invite.email) {
            return limit(() => (0, mailSender_1.sendEmail)(invite.email, 'Event Post Available', emailContent));
        }
        return Promise.resolve();
    });
    yield Promise.all(emailTasks);
    return invitations;
});
const getAllinvitation = () => __awaiter(void 0, void 0, void 0, function* () { });
const getinvitationById = () => __awaiter(void 0, void 0, void 0, function* () { });
const updateinvitation = () => __awaiter(void 0, void 0, void 0, function* () { });
const deleteinvitation = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.invitationService = {
    createinvitation,
    getAllinvitation,
    getinvitationById,
    updateinvitation,
    deleteinvitation,
};
