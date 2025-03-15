import mongoose, { Schema } from 'mongoose';
import { Imember_favourite } from './member_favourite.interface';

const MemberFavouriteSchema: Schema<Imember_favourite> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    memberId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    favourite: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

const MemberFavourite = mongoose.model<Imember_favourite>(
  'MemberFavourite',
  MemberFavouriteSchema,
);
export default MemberFavourite;
