import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { subscriberService } from './subscriber.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createsubscriber = catchAsync(async (req: Request, res: Response) => {
  const subscriber = await subscriberService.createsubscriber(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'subscriber created successfully',
    data: subscriber,
  });
});
const getAllsubscriber = catchAsync(async (req: Request, res: Response) => {});
const getsubscriberById = catchAsync(async (req: Request, res: Response) => {});
const updatesubscriber = catchAsync(async (req: Request, res: Response) => {});
const deletesubscriber = catchAsync(async (req: Request, res: Response) => {});

export const subscriberController = {
  createsubscriber,
  getAllsubscriber,
  getsubscriberById,
  updatesubscriber,
  deletesubscriber,
};
