import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { invitationService } from './invitation.service';

const createinvitation = catchAsync(async (req: Request, res: Response) => {
  const invitation = await invitationService.createinvitation(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'invitation created successfully',
    data: invitation,
  });
});
const getAllinvitation = catchAsync(async (req: Request, res: Response) => {});
const getinvitationById = catchAsync(async (req: Request, res: Response) => {});
const updateinvitation = catchAsync(async (req: Request, res: Response) => {});
const deleteinvitation = catchAsync(async (req: Request, res: Response) => {});

export const invitationController = {
  createinvitation,
  getAllinvitation,
  getinvitationById,
  updateinvitation,
  deleteinvitation,
};
