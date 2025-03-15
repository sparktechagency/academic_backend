import { ObjectId } from 'mongoose';

export interface IMake_Folder {
  userId: ObjectId;
  name: string;
  isPrivate: boolean;
}
