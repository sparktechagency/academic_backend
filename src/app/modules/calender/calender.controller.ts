import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { calenderService } from './calender.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const getUserFavouriteCalendar = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req?.user?.userId;
    const data = await calenderService.getUserFavouriteCalendar(userId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User favourite calendar retrieved successfully',
      data,
    });
  },
);

export const calenderController = {
  getUserFavouriteCalendar,
};
