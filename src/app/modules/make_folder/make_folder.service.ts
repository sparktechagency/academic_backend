import { IMake_Folder } from './make_folder.interface';
import MakeFolder from './make_folder.models';

// Create Make Folder
const createmake_folder = async (userId: object, payload: IMake_Folder) => {
  const newFolder = await MakeFolder.create({
    userId,
    isPrivate: payload.isPrivate,
    name: payload.name,
  });
  return newFolder;
};

// Get All Make Folders
const getAllmake_folder = async () => {
  const folders = await MakeFolder.find({ isPrivate: false });
  return folders;
};

// Get Make Folder by ID
const getmake_folderById = async (id: string) => {
  const folder = await MakeFolder.findById(id);
  return folder;
};

// Update Make Folder
const updatemake_folder = async (id: string, isPrivate: boolean) => {
  const updatedFolder = await MakeFolder.findByIdAndUpdate(
    id,
    { isPrivate },
    { new: true },
  );
  return updatedFolder;
};

// Delete Make Folder
const deletemake_folder = async (id: string) => {
  const deletedFolder = await MakeFolder.findByIdAndDelete(id);
  return deletedFolder;
};

const getMyFolders = async (userId: object) => {
  const folders = await MakeFolder.find({ userId: userId });
  return folders;
};

const getPublicFoldersByUserId = async (userId: string) => {
  return await MakeFolder.find({ userId, isPrivate: false });
};

export const make_folderService = {
  createmake_folder,
  getAllmake_folder,
  getmake_folderById,
  updatemake_folder,
  deletemake_folder,
  getMyFolders,
  getPublicFoldersByUserId,
};
