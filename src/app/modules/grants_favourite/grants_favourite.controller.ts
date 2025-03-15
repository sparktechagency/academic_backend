import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { grants_favouriteService } from './grants_favourite.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// Create Grants Favourite
const creategrants_favourite = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req?.user?.userId;
    req.body.userId = userId;
    const newFavourite = await grants_favouriteService.creategrants_favourite(
      req.body,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Grant favourite created successfully',
      data: newFavourite,
    });
  },
);

// Get All Grants Favourites
const getAllgrants_favourite = catchAsync(
  async (req: Request, res: Response) => {
    const favourites = await grants_favouriteService.getAllgrants_favourite(
      req.query,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Grant favourite fetched successfully',
      data: favourites,
    });
  },
);

// Get Grants Favourite by ID
const getgrants_favouriteById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const favourite = await grants_favouriteService.getgrants_favouriteById(
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
      message: 'Grant fetched successfully',
      data: favourite,
    });
  },
);

// Get Grants Favourite by ID
const getMygrants_favouriteById = catchAsync(
  async (req: Request, res: Response) => {
    const id = req?.user?.userId;
    const favourite = await grants_favouriteService.getMygrants_favouriteById(
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
      message: 'My Grant fetched successfully',
      data: favourite,
    });
  },
);

// Update Grants Favourite
const updategrants_favourite = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { grantsId } = req.body;

    const updatedFavourite =
      await grants_favouriteService.updategrants_favourite(id, grantsId);

    if (!updatedFavourite) {
      return res.status(404).json({
        status: 'fail',
        message: 'Favourite not found',
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Grant favourite updated successfully',
      data: updatedFavourite,
    });
  },
);

// Delete Grants Favourite
const deletegrants_favourite = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedFavourite =
      await grants_favouriteService.deletegrants_favourite(id);

    if (!deletedFavourite) {
      return res.status(404).json({
        status: 'fail',
        message: 'Favourite not found',
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Grant favourite deleted successfully',
      data: deletedFavourite,
    });
  },
);

const getgrants_favouriteByUserId = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const grants_favourite =
      await grants_favouriteService.getgrants_FavouriteByUserId(userId, req.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Grant favourite retrieved successfully',
      data: grants_favourite,
    });
  },
);

export const grants_favouriteController = {
  creategrants_favourite,
  getAllgrants_favourite,
  getgrants_favouriteById,
  updategrants_favourite,
  deletegrants_favourite,
  getMygrants_favouriteById,
  getgrants_favouriteByUserId,
};
