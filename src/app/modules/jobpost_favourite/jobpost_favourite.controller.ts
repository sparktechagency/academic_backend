import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { jobpost_favouriteService } from './jobpost_favourite.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// Create Job Post Favourite
const createjobpost_favourite = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req?.user?.userId;
    req.body.userId = userId;
    const newFavourite = await jobpost_favouriteService.createjobpost_favourite(
      req.body,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'jobPost favourite created successfully',
      data: newFavourite,
    });
  },
);

// Get All Job Post Favourites
const getAlljobpost_favourite = catchAsync(
  async (req: Request, res: Response) => {
    const favourites = await jobpost_favouriteService.getAlljobpost_favourite(
      req.query,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'jobPost favourite fetched successfully',
      data: favourites,
    });
  },
);

// Get Job Post Favourite by ID
const getjobpost_favouriteById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const favourite = await jobpost_favouriteService.getjobpost_favouriteById(
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
      message: 'jobPost favourite fetched successfully',
      data: favourite,
    });
  },
);

// Get Job Post Favourite by ID
const getMyjobpost_favouriteById = catchAsync(
  async (req: Request, res: Response) => {
    const id = req?.user?.userId;
    const favourite = await jobpost_favouriteService.getMyjobpost_favouriteById(
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
      message: 'My jobPost favourite fetched successfully',
      data: favourite,
    });
  },
);

// Update Job Post Favourite
const updatejobpost_favourite = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { jobpostId } = req.body;

    const updatedFavourite =
      await jobpost_favouriteService.updatejobpost_favourite(id, jobpostId);

    if (!updatedFavourite) {
      return res.status(404).json({
        status: 'fail',
        message: 'Favourite not found',
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'jobPost favourite updated successfully',
      data: updatedFavourite,
    });
  },
);

// Delete Job Post Favourite
const deletejobpost_favourite = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedFavourite =
      await jobpost_favouriteService.deletejobpost_favourite(id);

    if (!deletedFavourite) {
      return res.status(404).json({
        status: 'fail',
        message: 'Favourite not found',
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'jobPost favourite deleted successfully',
      data: deletedFavourite,
    });
  },
);

const getjobpost_favouriteByUserId = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const jobpost_favourite =
      await jobpost_favouriteService.getJobPostFavouriteByUserId(
        userId,
        req.query,
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'jobPost favourite retrieved successfully',
      data: jobpost_favourite,
    });
  },
);

export const jobpost_favouriteController = {
  createjobpost_favourite,
  getAlljobpost_favourite,
  getjobpost_favouriteById,
  updatejobpost_favourite,
  deletejobpost_favourite,
  getMyjobpost_favouriteById,
  getjobpost_favouriteByUserId,
};
