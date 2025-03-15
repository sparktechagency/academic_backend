// Model

import mongoose, { Schema } from 'mongoose';
import { IcallForPaper } from './callForPaper.interface';

const CallForPaperSchema: Schema<IcallForPaper> = new Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    organizer: { type: String, required: true },
    event_start_date: { type: String, required: true },
    event_end_date: { type: String, required: true },
    abstract_submission_deadline: { type: String, required: true },
    keywords: { type: [String], required: true },
    comment: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

const CallForPaper = mongoose.model<IcallForPaper>(
  'CallForPaper',
  CallForPaperSchema,
);
export default CallForPaper;
