import mongoose, { Schema } from 'mongoose';
import { IMake_Folder } from './make_folder.interface';

const MakeFolderSchema: Schema<IMake_Folder> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Assuming you have a User model
      required: true,
    },
    isPrivate: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const MakeFolder = mongoose.model<IMake_Folder>('MakeFolder', MakeFolderSchema);
export default MakeFolder;
