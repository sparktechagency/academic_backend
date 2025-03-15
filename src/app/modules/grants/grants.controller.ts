// grants.controller.ts
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { grantsService } from './grants.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// Create Grant
const creategrants = catchAsync(async (req: Request, res: Response) => {
  req.body.userId = req?.user?.userId;
  const grant = await grantsService.creategrants(req.body);
  // res.status(201).json({ status: 'success', data: grant });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Grant created successfully',
    data: grant,
  });
});

// Get All Grants
const getAllgrants = catchAsync(async (req: Request, res: Response) => {
  const grants = await grantsService.getAllgrants(req.query);
  // res.status(200).json({ status: 'success', data: grants });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Grants fetched successfully',
    data: grants,
  });
});

// Get Grant by ID
const getgrantsById = catchAsync(async (req: Request, res: Response) => {
  const grant = await grantsService.getgrantsById(req.params.id, req.query);
  if (!grant) {
    return res.status(404).json({ status: 'fail', message: 'Grant not found' });
  }
  // res.status(200).json({ status: 'success', data: grant });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Grant fetched successfully',
    data: grant,
  });
});

// Get Grant by ID
const getMygrantsById = catchAsync(async (req: Request, res: Response) => {
  const id = req?.user?.userId;
  const grant = await grantsService.getMygrantsById(id, req.query);
  if (!grant) {
    return res.status(404).json({ status: 'fail', message: 'Grant not found' });
  }
  // res.status(200).json({ status: 'success', data: grant });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Grant fetched successfully',
    data: grant,
  });
});

// Update Grant
const updategrants = catchAsync(async (req: Request, res: Response) => {
  const updatedGrant = await grantsService.updategrants(
    req.params.id,
    req.body,
  );
  if (!updatedGrant) {
    return res.status(404).json({ status: 'fail', message: 'Grant not found' });
  }
  // res.status(200).json({ status: 'success', data: updatedGrant });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Grant updated successfully',
    data: updatedGrant,
  });
});

// Delete Grant
const deletegrants = catchAsync(async (req: Request, res: Response) => {
  const deletedGrant = await grantsService.deletegrants(req.params.id);
  if (!deletedGrant) {
    return res.status(404).json({ status: 'fail', message: 'Grant not found' });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Grant deleted successfully',
    data: deletedGrant,
  });
});

const getgrantsByUserId = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const grants = await grantsService.getgrantsByUserId(userId, req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Grants retrieved successfully',
    data: grants,
  });
});

export const grantsController = {
  creategrants,
  getAllgrants,
  getgrantsById,
  updategrants,
  deletegrants,
  getMygrantsById,
  getgrantsByUserId,
};
