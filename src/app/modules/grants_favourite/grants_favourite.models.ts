import mongoose, { Schema } from 'mongoose';
import { Igrants_favourite } from './grants_favourite.interface';

const GrantsFavouriteSchema: Schema<Igrants_favourite> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    grantsId: {
      type: Schema.Types.ObjectId,
      ref: 'Grants',
      required: true,
    },
    favourite: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

const GrantsFavourite = mongoose.model<Igrants_favourite>(
  'GrantsFavourite',
  GrantsFavouriteSchema,
);
export default GrantsFavourite;
