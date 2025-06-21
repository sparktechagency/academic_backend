import mongoose, { Schema } from 'mongoose';
import { Iinvitation } from './invitation.interface';

const invitationSchema: Schema<Iinvitation> = new Schema(
  {
    email: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

const invitation = mongoose.model<Iinvitation>('invitation', invitationSchema);
export default invitation;
