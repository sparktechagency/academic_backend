import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import Event from '../event/event.models';
import JobPost from '../jobPost/jobPost.models';
import Grants from '../grants/grants.models';
import { User } from '../user/user.models';
import CallForPaper from '../callForPaper/callForPaper.models';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AdminService } from './Admin.service';

const getAllCalCulation = catchAsync(async (req: Request, res: Response) => {
  const totalUser = await User.countDocuments();
  const totalCallForPaper = await CallForPaper.countDocuments();
  const totalEvent = await Event.countDocuments();
  const totalJobPost = await JobPost.countDocuments();
  const totalGrants = await Grants.countDocuments();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Count fetched successfully',
    data: {
      totalUser,
      totalCallForPaper,
      totalEvent,
      totalJobPost,
      totalGrants,
    },
  });
});

const dashboardData = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.dashboardData(req?.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'dashboard data successful',
  });
});

export const AdminController = {
  getAllCalCulation,
  dashboardData,
};
