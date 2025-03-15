// Controller

import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { callForPaperService } from './callForPaper.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// Create Call for Paper
const createcallForPaper = catchAsync(async (req: Request, res: Response) => {
  req.body.userId = req?.user?.userId;
  const newCallForPaper = await callForPaperService.createcallForPaper(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'callForPaper created successfully',
    data: newCallForPaper,
  });
});

// Get All Call for Papers
const getAllcallForPaper = catchAsync(async (req: Request, res: Response) => {
  const callForPaperList = await callForPaperService.getAllcallForPaper(
    req.query,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All callForPaper successfully',
    data: callForPaperList,
  });
});

// Get Call for Paper by ID
const getcallForPaperById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const callForPaper = await callForPaperService.getcallForPaperById(
    id,
    req.query,
  );
  if (!callForPaper) {
    return res.status(404).json({
      status: 'fail',
      message: 'Call for Paper not found',
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'single callForPaper successfully',
    data: callForPaper,
  });
});

// Get Call for Paper by ID
const getMycallForPaperById = catchAsync(
  async (req: Request, res: Response) => {
    const id = req?.user?.userId;
    const callForPaper = await callForPaperService.getMycallForPaperById(
      id,
      req.query,
    );
    if (!callForPaper) {
      return res.status(404).json({
        status: 'fail',
        message: 'Call for Paper not found',
      });
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'my callForPaper successfully',
      data: callForPaper,
    });
  },
);

// Update Call for Paper
const updatecallForPaper = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedCallForPaper = await callForPaperService.updatecallForPaper(
    id,
    req.body,
  );
  if (!updatedCallForPaper) {
    return res.status(404).json({
      status: 'fail',
      message: 'Call for Paper not found',
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'callForPaper updated successfully',
    data: updatedCallForPaper,
  });
});

// Delete Call for Paper
const deletecallForPaper = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedCallForPaper = await callForPaperService.deletecallForPaper(id);
  if (!deletedCallForPaper) {
    return res.status(404).json({
      status: 'fail',
      message: 'Call for Paper not found',
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'callForPaper deleted successfully',
    data: deletedCallForPaper,
  });
});

const getCallForPaperByUserId = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const callForPapers = await callForPaperService.getCallForPaperByUserId(
      userId,
      req.query,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Call for Papers retrieved successfully',
      data: callForPapers,
    });
  },
);

export const callForPaperController = {
  createcallForPaper,
  getAllcallForPaper,
  getcallForPaperById,
  updatecallForPaper,
  deletecallForPaper,
  getMycallForPaperById,
  getCallForPaperByUserId,
};
