// grants.model.ts
import mongoose, { Schema } from 'mongoose';
import { Igrants } from './grants.interface';

const GrantsSchema: Schema<Igrants> = new Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    generator: { type: String, required: true },
    type: { type: String, required: true },
    target_group: { type: String, required: true },
    amount: { type: String, required: true },
    grant_duration: { type: String, required: true },
    start_date: { type: String, required: true },
    application_deadline: { type: String, required: true },
    comment: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

const Grants = mongoose.model<Igrants>('Grants', GrantsSchema);
export default Grants;
