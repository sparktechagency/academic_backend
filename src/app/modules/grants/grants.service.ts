// grants.service.ts
import QueryBuilder from '../../builder/QueryBuilder';
import { Igrants } from './grants.interface';
import Grants from './grants.models';
import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import path from 'path';
import fs from 'fs';
import subscriber from '../subscriber/subscriber.models';
import { sendEmail } from '../../utils/mailSender';
import pLimit from 'p-limit';
import { User } from '../user/user.models';
import dayjs from 'dayjs';
import * as cron from 'node-cron';
import { sendDailyJobPostUpdate } from '../jobPost/jobPost.service';
import { sendDailyEventUpdate } from '../event/event.service';

// const creategrants = async (grantData: Igrants) => {
//   const grants = await Grants.create(grantData);
//   const subscribers = await subscriber.find({ isSubscribed: true });
//   const emailTemplatePath = path.join(
//     __dirname,
//     '../../../../public/view/grants_mail.html',
//   );
//   if (!fs.existsSync(emailTemplatePath)) {
//     throw new AppError(
//       httpStatus.INTERNAL_SERVER_ERROR,
//       'Email template not found',
//     );
//   }
//   const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8');
//   const emailContent = emailTemplate
//     .replace('{{name}}', grantData.name)
//     .replace('{{url}}', grantData.url)
//     .replace('{{type}}', grantData.type)
//     .replace('{{amount}}', grantData.amount)
//     .replace('{{application_deadline}}', grantData.application_deadline);
//   const limit = pLimit(10);
//   const emailTasks = subscribers.map(subscriber => {
//     if (subscriber.email) {
//       return limit(() =>
//         sendEmail(subscriber.email, 'New Job Post Available', emailContent),
//       );
//     }
//     return Promise.resolve();
//   });

//   await Promise.all(emailTasks);
//   return grants;
// };

const creategrants = async (grantData: Igrants) => {
  const grants = await Grants.create(grantData);
  return grants;
};

const sendDailyGrantUpdate = async () => {
  const now = dayjs();
  const yesterday = now.subtract(1, 'day').toDate();

  const newGrants = await Grants.find({ createdAt: { $gte: yesterday } });
  const memberCount = await User.countDocuments({
    createdAt: { $gte: yesterday },
  });
  const grantCount = newGrants.length;

  if (grantCount === 0 && memberCount === 0) return; // Skip email if no updates

  const emailTemplatePath = path.join(
    __dirname,
    '../../../../public/view/grants_mail.html',
  );

  if (!fs.existsSync(emailTemplatePath)) {
    throw new Error('Email template not found');
  }

  const rawTemplate = fs.readFileSync(emailTemplatePath, 'utf8');
  const subscribersList = await subscriber.find({ isSubscribed: true });

  const limit = pLimit(10);
  const tasks = subscribersList.map(sub => {
    if (sub.email) {
      const content = rawTemplate
        .replace('{{first_name}}', sub.email.split('@')[0] || 'there')
        .replace('{{today_date}}', now.format('MMMM D, YYYY'))
        .replace('{{member_count}}', String(memberCount))
        .replace('{{job_count}}', String(grantCount));

      return limit(() =>
        sendEmail(
          sub.email,
          `Your ${now.format('MMMM D')} update from PhDPort`,
          content,
        ),
      );
    }
    return Promise.resolve();
  });

  await Promise.all(tasks);
};

const getAllgrants = async (query: Record<string, any>) => {
  const grantsModel = new QueryBuilder(Grants.find().populate('userId'), query)
    .search(['name', 'generator', 'comment'])
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

cron.schedule('0 9 * * *', () => {
  console.log('Running daily grant update...');
  sendDailyGrantUpdate().catch(console.error);
  sendDailyJobPostUpdate().catch(console.error);
  sendDailyEventUpdate().catch(console.error);
});

export const grantsService = {
  creategrants,
  getAllgrants,
  getgrantsById,
  updategrants,
  deletegrants,
  getMygrantsById,
  getgrantsByUserId,
  sendDailyGrantUpdate,
};
