import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { make_folderService } from './make_folder.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// Create Make Folder
const createmake_folder = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId; // Assuming user ID is retrieved from the token
  const newFolder = await make_folderService.createmake_folder(
    userId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'folder created successfully',
    data: newFolder,
  });
});

// Get All Make Folders
const getAllmake_folder = catchAsync(async (req: Request, res: Response) => {
  // const userId = req?.user?.userId; // Assuming user ID is retrieved from the token
  const folders = await make_folderService.getAllmake_folder();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All folders fetched successfully',
    data: folders,
  });
});

// Get Make Folder by ID
const getmake_folderById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const folder = await make_folderService.getmake_folderById(id);
  if (!folder) {
    return res.status(404).json({
      status: 'fail',
      message: 'Folder not found',
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Folders fetched successfully',
    data: folder,
  });
});

// Update Make Folder
const updatemake_folder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isPrivate } = req.body;
  const updatedFolder = await make_folderService.updatemake_folder(
    id,
    isPrivate,
  );
  if (!updatedFolder) {
    return res.status(404).json({
      status: 'fail',
      message: 'Folder not found',
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Folder updated successfully',
    data: updatedFolder,
  });
});

// Delete Make Folder
const deletemake_folder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedFolder = await make_folderService.deletemake_folder(id);
  if (!deletedFolder) {
    return res.status(404).json({
      status: 'fail',
      message: 'Folder not found',
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Folder deleted successfully',
    data: deletedFolder,
  });
});

const getMyFolders = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId;
  const folders = await make_folderService.getMyFolders(userId);
  res.status(200).json({
    status: 'success',
    data: folders,
  });
});

const getPublicFoldersByUserId = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.params.userId; // Get user ID from request parameters
    const folders = await make_folderService.getPublicFoldersByUserId(userId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Public folders fetched successfully',
      data: folders,
    });
  },
);

export const make_folderController = {
  createmake_folder,
  getAllmake_folder,
  getmake_folderById,
  updatemake_folder,
  deletemake_folder,
  getMyFolders,
  getPublicFoldersByUserId,
};
