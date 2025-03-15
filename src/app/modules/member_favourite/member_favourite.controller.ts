import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { member_favouriteService } from './member_favourite.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// Create Member Favourite
const createmember_favourite = catchAsync(
  async (req: Request, res: Response) => {
    // const { memberId } = req.body;
    req.body.userId = req?.user?.userId;
    const newFavourite = await member_favouriteService.createmember_favourite(
      req.body,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Member favourite created successfully',
      data: newFavourite,
    });
  },
);

// Get All Member Favourites
const getAllmember_favourite = catchAsync(
  async (req: Request, res: Response) => {
    const favourites = await member_favouriteService.getAllmember_favourite(
      req.query,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Member favourites fetched successfully',
      data: favourites,
    });
  },
);

// Get Member Favourite by ID
const getmember_favouriteById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const favourite = await member_favouriteService.getmember_favouriteById(
      id,
      req.query,
    );

    if (!favourite) {
      return res.status(404).json({
        status: 'fail',
        message: 'Favourite not found',
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Member favourites fetched successfully',
      data: favourite,
    });
  },
);

// Get Member Favourite by ID
const getMymember_favouriteById = catchAsync(
  async (req: Request, res: Response) => {
    const id = req?.user?.userId;
    const favourite = await member_favouriteService.getMymember_favouriteById(
      id,
      req.query,
    );

    if (!favourite) {
      return res.status(404).json({
        status: 'fail',
        message: 'Favourite not found',
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'My Member favourites fetched successfully',
      data: favourite,
    });
  },
);

// Update Member Favourite
const updatemember_favourite = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { memberId } = req.body;

    const updatedFavourite =
      await member_favouriteService.updatemember_favourite(id, memberId);

    if (!updatedFavourite) {
      return res.status(404).json({
        status: 'fail',
        message: 'Favourite not found',
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Member favourites updated successfully',
      data: updatedFavourite,
    });
  },
);

// Delete Member Favourite
const deletemember_favourite = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedFavourite =
      await member_favouriteService.deletemember_favourite(id);

    if (!deletedFavourite) {
      return res.status(404).json({
        status: 'fail',
        message: 'Favourite not found',
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Member favourites deleted successfully',
      data: deletedFavourite,
    });
  },
);

const getMember_favouriteByUserId = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const member_favourite =
      await member_favouriteService.getMemberFavouriteByUserId(
        userId,
        req.query,
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'event favourite retrieved successfully',
      data: member_favourite,
    });
  },
);

export const member_favouriteController = {
  createmember_favourite,
  getAllmember_favourite,
  getmember_favouriteById,
  updatemember_favourite,
  deletemember_favourite,
  getMymember_favouriteById,
  getMember_favouriteByUserId,
};
