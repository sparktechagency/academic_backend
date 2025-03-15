import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { callForpaper_favouriteService } from './callForpaper_favourite.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// Create Call for Paper Favourite
const createcallForpaper_favourite = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req?.user?.userId;
    req.body.userId = userId;
    const newFavourite =
      await callForpaper_favouriteService.createcallForpaper_favourite(
        req.body,
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'callForpaper favourite successfully',
      data: newFavourite,
    });
  },
);

// Get All Call for Paper Favourites
const getAllcallForpaper_favourite = catchAsync(
  async (req: Request, res: Response) => {
    const favourites =
      await callForpaper_favouriteService.getAllcallForpaper_favourite(
        req.query,
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'ALL callForpaper favourite successfully',
      data: favourites,
    });
  },
);

// Get Call for Paper Favourite by ID
const getcallForpaper_favouriteById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const favourite =
      await callForpaper_favouriteService.getcallForpaper_favouriteById(
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
      message: 'Single callForpaper favourite successfully',
      data: favourite,
    });
  },
);

const getMycallForpaper_favouriteById = catchAsync(
  async (req: Request, res: Response) => {
    const id = req?.user?.userId;
    const favourite =
      await callForpaper_favouriteService.getMycallForpaper_favouriteById(
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
      message: 'My callForpaper favourite successfully',
      data: favourite,
    });
  },
);

// Update Call for Paper Favourite
const updatecallForpaper_favourite = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { callForPaperId } = req.body;

    const updatedFavourite =
      await callForpaper_favouriteService.updatecallForpaper_favourite(
        id,
        callForPaperId,
      );

    if (!updatedFavourite) {
      return res.status(404).json({
        status: 'fail',
        message: 'Favourite not found',
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'callForpaper favourite updated successfully',
      data: updatedFavourite,
    });
  },
);

// Delete Call for Paper Favourite
const deletecallForpaper_favourite = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedFavourite =
      await callForpaper_favouriteService.deletecallForpaper_favourite(id);

    if (!deletedFavourite) {
      return res.status(404).json({
        status: 'fail',
        message: 'Favourite not found',
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'callForpaper favourite removed successfully',
      data: deletedFavourite,
    });
  },
);

const getcallForpaper_favouriteByUserId = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const callForPaper_favourite =
      await callForpaper_favouriteService.getCallForPaperFavouriteByUserId(
        userId,
        req.query,
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'callForpaper favourite retrieved successfully',
      data: callForPaper_favourite,
    });
  },
);

export const callForpaper_favouriteController = {
  createcallForpaper_favourite,
  getAllcallForpaper_favourite,
  getcallForpaper_favouriteById,
  updatecallForpaper_favourite,
  deletecallForpaper_favourite,
  getMycallForpaper_favouriteById,
  getcallForpaper_favouriteByUserId,
};
