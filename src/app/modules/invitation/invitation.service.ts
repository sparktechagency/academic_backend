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
  const otpEmailPath = path.join(
    __dirname,
    '../../../../public/view/invite_mail.html',
  );

  let emailTemplate = fs.readFileSync(otpEmailPath, 'utf8');

  // Replace placeholders in the template
  emailTemplate = emailTemplate.replace('{{email}}', invitations.email);
  // Send the email
  await sendEmail(
    invitations.email,
    'Invitation to Join PhDPort',
    emailTemplate,
  );

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
