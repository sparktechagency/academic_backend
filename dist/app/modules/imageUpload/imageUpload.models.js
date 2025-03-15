"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const imageUploadSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    images: {
        type: [
            {
                url: { type: String },
                key: { type: String },
            },
        ],
        default: [],
    },
}, {
    timestamps: true,
});
const ImageUpload = (0, mongoose_1.model)('ImageUpload', imageUploadSchema);
exports.default = ImageUpload;
