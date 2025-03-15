import mongoose, { Schema } from 'mongoose';
import { Ievent_favourite } from './event_favourite.interface';

const EventFavouriteSchema: Schema<Ievent_favourite> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    favourite: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

const EventFavourite = mongoose.model<Ievent_favourite>(
  'EventFavourite',
  EventFavouriteSchema,
);
export default EventFavourite;
