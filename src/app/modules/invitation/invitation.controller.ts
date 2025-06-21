import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { invitationService } from './invitation.service';

const createinvitation = catchAsync(async (req: Request, res: Response) => {
  req.body.userId = req?.user?.userId;
  const invitation = await invitationService.createinvitation(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'invitation created successfully',
    data: invitation,
  });
});
const getAllinvitation = catchAsync(async (req: Request, res: Response) => {
  const invitations = await invitationService.getAllinvitation(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All invitations retrieved successfully',
    data: invitations,
  });
});

const getinvitationById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const invitation = await invitationService.getinvitationById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Invitation retrieved successfully',
    data: invitation,
  });
});

const updateinvitation = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await invitationService.updateinvitation(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Invitation updated successfully',
    data: updated,
  });
});

const deleteinvitation = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await invitationService.deleteinvitation(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Invitation deleted successfully',
    data: result,
  });
});

export const invitationController = {
  createinvitation,
  getAllinvitation,
  getinvitationById,
  updateinvitation,
  deleteinvitation,
};
