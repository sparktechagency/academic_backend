import mongoose, { Schema } from 'mongoose';
import { Isubscriber } from './subscriber.interface';

const subscriberSchema: Schema<Isubscriber> = new Schema(
  {
    email: { type: String, required: true },
    isSubscribed: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const subscriber = mongoose.model<Isubscriber>('subscriber', subscriberSchema);
export default subscriber;
