// Service
import QueryBuilder from '../../builder/QueryBuilder';
import { sendEmail } from '../../utils/mailSender';
import { IjobPost } from './jobPost.interface';
import JobPost from './jobPost.models';
import httpStatus from 'http-status';
import AppError from '../../error/AppError';
// import QueryBuilder from '../../builder/QueryBuilder';
// import { Icontact } from './contact.interface';
// import { contactController } from './contact.controller';
// import contact from './contact.models';
import path from 'path';
// import { sendEmail } from '../../utils/mailSender';
import { User } from '../user/user.models';
import fs from 'fs';
import subscriber from '../subscriber/subscriber.models';
import pLimit from 'p-limit';
import dayjs from 'dayjs';

const createjobPost = async (data: IjobPost) => {
  const job = await JobPost.create(data);
  // const subscribers = await subscriber.find({ isSubscribed: true });

  // const emailTemplatePath = path.join(
  //   __dirname,
  //   '../../../../public/view/jobPost_mail.html',
  // );

  // if (!fs.existsSync(emailTemplatePath)) {
  //   throw new AppError(
  //     httpStatus.INTERNAL_SERVER_ERROR,
  //     'Email template not found',
  //   );
  // }

  // const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8');

  // const emailContent = emailTemplate
  //   .replace('{{title}}', data.title)
  //   .replace('{{url}}', data.url)
  //   .replace('{{institution}}', data.institution)
  //   .replace('{{job_description}}', data.job_description)
  //   .replace('{{location}}', data.location);
  // const limit = pLimit(10);
  // const emailTasks = subscribers.map(subscriber => {
  //   if (subscriber.email) {
  //     return limit(() =>
  //       sendEmail(subscriber.email, 'New Job Post Available', emailContent),
  //     );
  //   }
  //   return Promise.resolve();
  // });
  // await Promise.all(emailTasks);

  return job;
};

export const sendDailyJobPostUpdate = async () => {
  const now = dayjs();
  const yesterday = now.subtract(1, 'day').toDate();

  const newGrants = await JobPost.find({ createdAt: { $gte: yesterday } });
  const memberCount = await User.countDocuments({
    createdAt: { $gte: yesterday },
  });
  const jobpostCount = newGrants.length;

  if (jobpostCount === 0 && memberCount === 0) return; // Skip email if no updates

  const emailTemplatePath = path.join(
    __dirname,
    '../../../../public/view/jobPost_mail.html',
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
        .replace('{{job_count}}', String(jobpostCount));

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

const getAlljobPost = async (query: Record<string, any>) => {
  const jobPostModel = new QueryBuilder(
    JobPost.find().populate('userId'),
    query,
  )
    .search(['title'])
    .filter()
    .paginate()
    .sort();

  const data: any = await jobPostModel.modelQuery;
  const meta = await jobPostModel.countTotal();

  return {
    data,
    meta,
  };
};

const getjobPostById = async (id: string, query: Record<string, any>) => {
  const jobPostModel = new QueryBuilder(JobPost.find({ _id: id }), query)
    .search(['title'])
    .filter()
    .paginate()
    .sort();

  const data: any = await jobPostModel.modelQuery;
  const meta = await jobPostModel.countTotal();

  return {
    data,
    meta,
  };
};

const getMyjobPostById = async (id: string, query: Record<string, any>) => {
  const jobPostModel = new QueryBuilder(JobPost.find({ userId: id }), query)
    .search(['title'])
    .filter()
    .paginate()
    .sort();

  const data: any = await jobPostModel.modelQuery;
  const meta = await jobPostModel.countTotal();

  return {
    data,
    meta,
  };
};

const updatejobPost = async (id: string, data: Partial<IjobPost>) => {
  return await JobPost.findByIdAndUpdate(id, data, { new: true });
};

const deletejobPost = async (id: string) => {
  return await JobPost.findByIdAndDelete(id);
};

const getJobPostByUserId = async (
  userId: string,
  query: Record<string, any>,
) => {
  const jobPostModel = new QueryBuilder(JobPost.find({ userId }), query)
    .search(['title']) // Adjust search fields as needed
    .filter()
    .paginate()
    .sort();

  const data: any = await jobPostModel.modelQuery;
  const meta = await jobPostModel.countTotal();

  return {
    data,
    meta,
  };
};

export const jobPostService = {
  createjobPost,
  getAlljobPost,
  getjobPostById,
  updatejobPost,
  deletejobPost,
  getMyjobPostById,
  getJobPostByUserId,
  sendDailyJobPostUpdate,
};
