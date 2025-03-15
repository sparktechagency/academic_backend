// Model
import mongoose, { Schema } from 'mongoose';
import { IjobPost } from './jobPost.interface';

const JobPostSchema: Schema<IjobPost> = new Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    institution: { type: String, required: true },
    job_description: { type: String, required: true },
    location: { type: String, required: true },
    posted_by: { type: String, required: true },
    application_deadline: { type: String, required: true },
    keywords: { type: [String], required: true },
    comment: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

const JobPost = mongoose.model<IjobPost>('JobPost', JobPostSchema);
export default JobPost;
