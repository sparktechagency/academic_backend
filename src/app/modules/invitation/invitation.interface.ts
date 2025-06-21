import { Types } from 'mongoose';

export interface Iinvitation {
  email: string;
  userId: Types.ObjectId;
}
