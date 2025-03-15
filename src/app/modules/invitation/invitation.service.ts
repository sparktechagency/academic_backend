import pLimit from 'p-limit';
import { sendEmail } from '../../utils/mailSender';
import { Iinvitation } from './invitation.interface';
import invitation from './invitation.models';
import path from 'path';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import fs from 'fs';

const createinvitation = async (data: Iinvitation) => {
  const invitations = await invitation.create(data);
  const invites = await invitation.find();

  const emailTemplatePath = path.join(
    __dirname,
    '../../../../public/view/invite_mail.html',
  );

  if (!fs.existsSync(emailTemplatePath)) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Email template not found',
    );
  }

  const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8');

  const emailContent = emailTemplate;
  const limit = pLimit(10);
  const emailTasks = invites.map(invite => {
    if (invite.email) {
      return limit(() =>
        sendEmail(invite.email, 'Event Post Available', emailContent),
      );
    }
    return Promise.resolve();
  });
  await Promise.all(emailTasks);

  return invitations;
};
const getAllinvitation = async () => {};
const getinvitationById = async () => {};
const updateinvitation = async () => {};
const deleteinvitation = async () => {};

export const invitationService = {
  createinvitation,
  getAllinvitation,
  getinvitationById,
  updateinvitation,
  deleteinvitation,
};
