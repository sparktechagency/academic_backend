import mongoose, { Schema } from 'mongoose';
import { IcallForPaper_favourite } from './callForpaper_favourite.interface';

const CallForpaperFavouriteSchema: Schema<IcallForPaper_favourite> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    callForPaperId: {
      type: Schema.Types.ObjectId,
      ref: 'CallForPaper',
      required: true,
    },
    favourite: { type: Boolean, required: true },
  },
  { timestamps: true },
);

const CallForpaperFavourite = mongoose.model<IcallForPaper_favourite>(
  'CallForpaperFavourite',
  CallForpaperFavouriteSchema,
);
export default CallForpaperFavourite;
