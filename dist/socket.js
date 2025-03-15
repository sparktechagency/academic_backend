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
const socket_io_1 = require("socket.io");
const getUserDetailsFromToken_1 = __importDefault(require("./app/helpers/getUserDetailsFromToken"));
const AppError_1 = __importDefault(require("./app/error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const user_models_1 = require("./app/modules/user/user.models");
const messages_models_1 = __importDefault(require("./app/modules/messages/messages.models"));
const chat_service_1 = require("./app/modules/chat/chat.service");
const chat_models_1 = __importDefault(require("./app/modules/chat/chat.models"));
const callbackFn_1 = require("./app/utils/callbackFn");
const initializeSocketIO = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: '*',
        },
    });
    // Online users
    const onlineUser = new Set();
    io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        console.log('connected', socket === null || socket === void 0 ? void 0 : socket.id);
        try {
            //----------------------user token get from front end-------------------------//
            const token = ((_a = socket.handshake.auth) === null || _a === void 0 ? void 0 : _a.token) || ((_b = socket.handshake.headers) === null || _b === void 0 ? void 0 : _b.token);
            //----------------------check Token and return user details-------------------------//
            const user = yield (0, getUserDetailsFromToken_1.default)(token);
            if (!user) {
                // io.emit('io-error', {success:false, message:'invalid Token'});
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid token');
            }
            socket.join((_c = user === null || user === void 0 ? void 0 : user._id) === null || _c === void 0 ? void 0 : _c.toString());
            //----------------------user id set in online array-------------------------//
            onlineUser.add((_d = user === null || user === void 0 ? void 0 : user._id) === null || _d === void 0 ? void 0 : _d.toString());
            socket.on('check', (data, callback) => {
                console.log(data);
                (0, callbackFn_1.callbackFn)(callback, { success: true });
            });
            //----------------------online array send for front end------------------------//
            io.emit('onlineUser', Array.from(onlineUser));
            //----------------------user details and messages send for front end -->(as need to use)------------------------//
            socket.on('message-page', (userId, callback) => __awaiter(void 0, void 0, void 0, function* () {
                if (!userId) {
                    (0, callbackFn_1.callbackFn)(callback, {
                        success: false,
                        message: 'userId is required',
                    });
                }
                try {
                    const receiverDetails = yield user_models_1.User.findById(userId).select('_id email role image name');
                    if (!receiverDetails) {
                        (0, callbackFn_1.callbackFn)(callback, {
                            success: false,
                            message: 'user is not found!',
                        });
                        io.emit('io-error', {
                            success: false,
                            message: 'user is not found!',
                        });
                    }
                    const payload = {
                        _id: receiverDetails === null || receiverDetails === void 0 ? void 0 : receiverDetails._id,
                        email: receiverDetails === null || receiverDetails === void 0 ? void 0 : receiverDetails.email,
                        image: receiverDetails === null || receiverDetails === void 0 ? void 0 : receiverDetails.image,
                        role: receiverDetails === null || receiverDetails === void 0 ? void 0 : receiverDetails.role,
                        name: receiverDetails === null || receiverDetails === void 0 ? void 0 : receiverDetails.name,
                    };
                    socket.emit('user-details', payload);
                    const getPreMessage = yield messages_models_1.default.find({
                        $or: [
                            { sender: user === null || user === void 0 ? void 0 : user._id, receiver: userId },
                            { sender: userId, receiver: user === null || user === void 0 ? void 0 : user._id },
                        ],
                    }).sort({ updatedAt: 1 });
                    socket.emit('message', getPreMessage || []);
                    // Notification
                    // const allUnReaddMessage = await Message.countDocuments({
                    //   receiver: user?._id,
                    //   seen: false,
                    // });
                    // const variable = 'new-notifications::' + user?._id;
                    // io.emit(variable, allUnReaddMessage);
                    // const allUnReaddMessage2 = await Message.countDocuments({
                    //   receiver: userId,
                    //   seen: false,
                    // });
                    // const variable2 = 'new-notifications::' + userId;
                    // io.emit(variable2, allUnReaddMessage2);
                    //end Notification//
                }
                catch (error) {
                    (0, callbackFn_1.callbackFn)(callback, {
                        success: false,
                        message: error.message,
                    });
                    io.emit('io-error', { success: false, message: error });
                    console.error('Error in message-page event:', error);
                }
            }));
            //----------------------chat list------------------------//
            socket.on('my-chat-list', (data, callback) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const chatList = yield chat_service_1.chatService.getMyChatList(user === null || user === void 0 ? void 0 : user._id);
                    const myChat = 'chat-list::' + (user === null || user === void 0 ? void 0 : user._id);
                    io.emit(myChat, chatList);
                    (0, callbackFn_1.callbackFn)(callback, { success: true, message: chatList });
                }
                catch (error) {
                    (0, callbackFn_1.callbackFn)(callback, {
                        success: false,
                        message: error.message,
                    });
                    io.emit('io-error', { success: false, message: error.message });
                }
            }));
            //----------------------seen message-----------------------//
            socket.on('seen', (_a, callback_1) => __awaiter(void 0, [_a, callback_1], void 0, function* ({ chatId }, callback) {
                if (!chatId) {
                    (0, callbackFn_1.callbackFn)(callback, {
                        success: false,
                        message: 'chatId id is required',
                    });
                    io.emit('io-error', {
                        success: false,
                        message: 'chatId id is required',
                    });
                }
                try {
                    const chatList = yield chat_models_1.default.findById(chatId);
                    if (!chatList) {
                        (0, callbackFn_1.callbackFn)(callback, {
                            success: false,
                            message: 'chat id is not valid',
                        });
                        io.emit('io-error', {
                            success: false,
                            message: 'chat id is not valid',
                        });
                        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'chat id is not valid');
                    }
                    const messageIdList = yield messages_models_1.default.aggregate([
                        {
                            $match: {
                                chat: new mongoose_1.Types.ObjectId(chatId),
                                seen: false,
                                sender: { $ne: new mongoose_1.Types.ObjectId(user === null || user === void 0 ? void 0 : user._id) },
                            },
                        },
                        { $group: { _id: null, ids: { $push: '$_id' } } },
                        { $project: { _id: 0, ids: 1 } },
                    ]);
                    const unseenMessageIdList = messageIdList.length > 0 ? messageIdList[0].ids : [];
                    const updateMessages = yield messages_models_1.default.updateMany({ _id: { $in: unseenMessageIdList } }, { $set: { seen: true } });
                    const user1 = chatList.participants[0];
                    const user2 = chatList.participants[1];
                    // //----------------------ChatList------------------------//
                    const ChatListUser1 = yield chat_service_1.chatService.getMyChatList(user1.toString());
                    const ChatListUser2 = yield chat_service_1.chatService.getMyChatList(user2.toString());
                    const user1Chat = 'chat-list::' + user1;
                    const user2Chat = 'chat-list::' + user2;
                    const allUnReaddMessage = yield messages_models_1.default.countDocuments({
                        receiver: user1,
                        seen: false,
                    });
                    const variable = 'new-notifications::' + user1;
                    io.emit(variable, allUnReaddMessage);
                    const allUnReaddMessage2 = yield messages_models_1.default.countDocuments({
                        receiver: user2,
                        seen: false,
                    });
                    const variable2 = 'new-notifications::' + user2;
                    io.emit(variable2, allUnReaddMessage2);
                    const getPreMessage = yield messages_models_1.default.find({
                        $or: [
                            { sender: user1, receiver: user2 },
                            { sender: user2, receiver: user1 },
                        ],
                    }).sort({ updatedAt: 1 });
                    socket.emit('message', getPreMessage || []);
                    io.emit(user1Chat, ChatListUser1);
                    io.emit(user2Chat, ChatListUser2);
                }
                catch (error) {
                    (0, callbackFn_1.callbackFn)(callback, {
                        success: false,
                        message: error.message,
                    });
                    console.error('Error in seen event:', error);
                    socket.emit('error', { message: error.message });
                }
            }));
            //----------------------send message-----------------------//
            socket.on('send-message', (payload, callback) => __awaiter(void 0, void 0, void 0, function* () {
                payload.sender = user === null || user === void 0 ? void 0 : user._id;
                const alreadyExists = yield chat_models_1.default.findOne({
                    participants: { $all: [payload.sender, payload.receiver] },
                }).populate(['participants']);
                if (!alreadyExists) {
                    const chatList = yield chat_models_1.default.create({
                        participants: [payload.sender, payload.receiver],
                    });
                    payload.chat = chatList === null || chatList === void 0 ? void 0 : chatList._id;
                }
                else {
                    payload.chat = alreadyExists === null || alreadyExists === void 0 ? void 0 : alreadyExists._id;
                }
                const result = yield messages_models_1.default.create(payload);
                if (!result) {
                    (0, callbackFn_1.callbackFn)(callback, {
                        statusCode: http_status_1.default.BAD_REQUEST,
                        success: false,
                        message: 'Message sent failed',
                    });
                }
                const senderMessage = 'new-message::' + result.chat.toString();
                io.emit(senderMessage, result);
                // //----------------------ChatList------------------------//
                const ChatListSender = yield chat_service_1.chatService.getMyChatList(result === null || result === void 0 ? void 0 : result.sender.toString());
                const senderChat = 'chat-list::' + result.sender.toString();
                io.emit(senderChat, ChatListSender);
                const ChatListReceiver = yield chat_service_1.chatService.getMyChatList(result === null || result === void 0 ? void 0 : result.receiver.toString());
                const receiverChat = 'chat-list::' + result.receiver.toString();
                io.emit(receiverChat, ChatListReceiver);
                // Notification
                const allUnReaddMessage = yield messages_models_1.default.countDocuments({
                    receiver: result.sender,
                    seen: false,
                });
                const variable = 'new-notifications::' + result.sender;
                io.emit(variable, allUnReaddMessage);
                const allUnReaddMessage2 = yield messages_models_1.default.countDocuments({
                    receiver: result.receiver,
                    seen: false,
                });
                const variable2 = 'new-notifications::' + result.receiver;
                io.emit(variable2, allUnReaddMessage2);
                //end Notification//
                (0, callbackFn_1.callbackFn)(callback, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: 'Message sent successfully!',
                    data: result,
                });
            }));
            //-----------------------Typing------------------------//
            socket.on('typing', function (data) {
                const chat = 'typing::' + data.chatId.toString();
                const message = (user === null || user === void 0 ? void 0 : user.name) + ' is typing...';
                socket.emit(chat, { message: message });
            });
            socket.on('stopTyping', function (data) {
                const chat = 'stopTyping::' + data.chatId.toString();
                const message = (user === null || user === void 0 ? void 0 : user.name) + ' is stop typing...';
                socket.emit(chat, { message: message });
            });
            //-----------------------Seen All------------------------//
            socket.on('message-notification', (_a, callback_1) => __awaiter(void 0, [_a, callback_1], void 0, function* ({}, callback) {
                try {
                    const allUnReaddMessage = yield messages_models_1.default.countDocuments({
                        receiver: user === null || user === void 0 ? void 0 : user._id,
                        seen: false,
                    });
                    const variable = 'new-notifications::' + (user === null || user === void 0 ? void 0 : user._id);
                    io.emit(variable, allUnReaddMessage);
                    (0, callbackFn_1.callbackFn)(callback, { success: true, message: allUnReaddMessage });
                }
                catch (error) {
                    (0, callbackFn_1.callbackFn)(callback, {
                        statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
                        success: false,
                        message: 'Failed to retrieve notifications',
                    });
                }
            }));
            //-----------------------Disconnect------------------------//
            socket.on('disconnect', () => {
                var _a;
                onlineUser.delete((_a = user === null || user === void 0 ? void 0 : user._id) === null || _a === void 0 ? void 0 : _a.toString());
                io.emit('onlineUser', Array.from(onlineUser));
                console.log('disconnect user ', socket.id);
            });
        }
        catch (error) {
            console.error('-- socket.io connection error --', error);
        }
    }));
    return io;
};
exports.default = initializeSocketIO;
