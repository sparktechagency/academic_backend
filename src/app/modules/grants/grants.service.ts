// grants.service.ts
import QueryBuilder from '../../builder/QueryBuilder';
import { Igrants } from './grants.interface';
import Grants from './grants.models';
import httpStatus from 'http-status';
import AppError from '../../error/AppError';
// import QueryBuilder from '../../builder/QueryBuilder';
// import { Icontact } from './contact.interface';
// import { contactController } from './contact.controller';
// import contact from './contact.models';
import path from 'path';
// import { sendEmail } from '../../utils/mailSender';
// import { User } from '../user/user.models';
import fs from 'fs';
import subscriber from '../subscriber/subscriber.models';
import { sendEmail } from '../../utils/mailSender';
import pLimit from 'p-limit';

const creategrants = async (grantData: Igrants) => {
  const grants = await Grants.create(grantData);
  const subscribers = await subscriber.find({ isSubscribed: true });
  const emailTemplatePath = path.join(
    __dirname,
    '../../../../public/view/grants_mail.html',
  );
  if (!fs.existsSync(emailTemplatePath)) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Email template not found',
    );
  }
  const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8');
  const emailContent = emailTemplate
    .replace('{{name}}', grantData.name)
    .replace('{{url}}', grantData.url)
    .replace('{{type}}', grantData.type)
    .replace('{{amount}}', grantData.amount)
    .replace('{{application_deadline}}', grantData.application_deadline);
  const limit = pLimit(10);
  const emailTasks = subscribers.map(subscriber => {
    if (subscriber.email) {
      return limit(() =>
        sendEmail(subscriber.email, 'New Job Post Available', emailContent),
      );
    }
    return Promise.resolve();
  });

  await Promise.all(emailTasks);
  return grants;
};

const getAllgrants = async (query: Record<string, any>) => {
  const grantsModel = new QueryBuilder(Grants.find().populate('userId'), query)
    .search(['name'])
    .filter()
    .paginate()
    .sort();

  const data: any = await grantsModel.modelQuery;
  const meta = await grantsModel.countTotal();

  return {
    data,
    meta,
  };
};

const getgrantsById = async (id: string, query: Record<string, any>) => {
  const grantsModel = new QueryBuilder(Grants.find({ _id: id }), query)
    .search(['name'])
    .filter()
    .paginate()
    .sort();

  const data: any = await grantsModel.modelQuery;
  const meta = await grantsModel.countTotal();

  return {
    data,
    meta,
  };
};

const getMygrantsById = async (id: string, query: Record<string, any>) => {
  const grantsModel = new QueryBuilder(Grants.find({ userId: id }), query)
    .search(['name'])
    .filter()
    .paginate()
    .sort();

  const data: any = await grantsModel.modelQuery;
  const meta = await grantsModel.countTotal();

  return {
    data,
    meta,
  };
};

const updategrants = async (id: string, grantData: Partial<Igrants>) => {
  return await Grants.findByIdAndUpdate(id, grantData, { new: true });
};

const deletegrants = async (id: string) => {
  return await Grants.findByIdAndDelete(id);
};

const getgrantsByUserId = async (
  userId: string,
  query: Record<string, any>,
) => {
  const grants = new QueryBuilder(Grants.find({ userId }), query)
    .search(['title'])
    .filter()
    .paginate()
    .sort();

  const data: any = await grants.modelQuery;
  const meta = await grants.countTotal();

  return {
    data,
    meta,
  };
};

export const grantsService = {
  creategrants,
  getAllgrants,
  getgrantsById,
  updategrants,
  deletegrants,
  getMygrantsById,
  getgrantsByUserId,
};
