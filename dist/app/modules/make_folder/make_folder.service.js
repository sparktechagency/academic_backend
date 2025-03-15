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
exports.make_folderService = void 0;
const make_folder_models_1 = __importDefault(require("./make_folder.models"));
// Create Make Folder
const createmake_folder = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newFolder = yield make_folder_models_1.default.create({
        userId,
        isPrivate: payload.isPrivate,
        name: payload.name,
    });
    return newFolder;
});
// Get All Make Folders
const getAllmake_folder = () => __awaiter(void 0, void 0, void 0, function* () {
    const folders = yield make_folder_models_1.default.find({ isPrivate: false });
    return folders;
});
// Get Make Folder by ID
const getmake_folderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const folder = yield make_folder_models_1.default.findById(id);
    return folder;
});
// Update Make Folder
const updatemake_folder = (id, isPrivate) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedFolder = yield make_folder_models_1.default.findByIdAndUpdate(id, { isPrivate }, { new: true });
    return updatedFolder;
});
// Delete Make Folder
const deletemake_folder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedFolder = yield make_folder_models_1.default.findByIdAndDelete(id);
    return deletedFolder;
});
const getMyFolders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const folders = yield make_folder_models_1.default.find({ userId: userId });
    return folders;
});
const getPublicFoldersByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield make_folder_models_1.default.find({ userId, isPrivate: false });
});
exports.make_folderService = {
    createmake_folder,
    getAllmake_folder,
    getmake_folderById,
    updatemake_folder,
    deletemake_folder,
    getMyFolders,
    getPublicFoldersByUserId,
};
