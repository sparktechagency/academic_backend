import mongoose, { Schema } from 'mongoose';
import { Ievent } from './event.interface';

const EventSchema: Schema<Ievent> = new Schema(
  {
    title: { type: String, required: true },
    eventType: { type: String, required: true },
    url: { type: String, required: true },
    organizer: { type: String, required: true },
    mode_of_participation: { type: String, required: true },
    fee: { type: String, required: true },
    event_start_date: { type: String, required: true },
    event_end_date: { type: String, required: true },
    posted_by: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

const Event = mongoose.model<Ievent>('Event', EventSchema);
export default Event;
