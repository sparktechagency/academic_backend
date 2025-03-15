import mongoose, { Schema } from 'mongoose';
import { Ijobpost_favourite } from './jobpost_favourite.interface';

const JobPostFavouriteSchema: Schema<Ijobpost_favourite> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    jobpostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobPost',
      required: true,
    },
    favourite: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

const JobPostFavourite = mongoose.model<Ijobpost_favourite>(
  'JobPostFavourite',
  JobPostFavouriteSchema,
);
export default JobPostFavourite;
