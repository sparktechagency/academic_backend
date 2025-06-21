import pLimit from 'p-limit';
import { sendEmail } from '../../utils/mailSender';
import { Iinvitation } from './invitation.interface';
import invitation from './invitation.models';
import path from 'path';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import fs from 'fs';
import QueryBuilder from '../../builder/QueryBuilder';

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
const getAllinvitation = async (query: Record<string, any>) => {
  const invitationQuery = new QueryBuilder(
    invitation.find().populate('userId'),
    query,
  )
    .search(['email', 'status']) // searchable fields
    .filter()
    .paginate()
    .sort();

  const data: any = await invitationQuery.modelQuery;
  const meta = await invitationQuery.countTotal();

  return {
    data,
    meta,
  };
};

const getinvitationById = async (id: string) => {
  const found = await invitation.findById(id);
  if (!found) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invitation not found');
  }
  return found;
};

const updateinvitation = async (id: string, payload: Partial<Iinvitation>) => {
  const updated = await invitation.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!updated) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Failed to update. Invitation not found',
    );
  }
  return updated;
};

const deleteinvitation = async (id: string) => {
  const deleted = await invitation.findByIdAndDelete(id);
  if (!deleted) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Failed to delete. Invitation not found',
    );
  }
  return deleted;
};

export const invitationService = {
  createinvitation,
  getAllinvitation,
  getinvitationById,
  updateinvitation,
  deleteinvitation,
};
