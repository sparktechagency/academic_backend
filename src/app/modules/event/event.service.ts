import Event from './event.models';
import { Ievent } from './event.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { notificationServices } from '../notification/notification.service';
import { USER_ROLE } from '../user/user.constants';
import { modeType } from '../notification/notification.interface';
import { sendEmail } from '../../utils/mailSender';
import pLimit from 'p-limit';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import path from 'path';
import subscriber from '../subscriber/subscriber.models';
import fs from 'fs';
import { Admin } from 'mongodb';
import { User } from '../user/user.models';

const createevent = async (eventData: Ievent) => {
  const newEvent = await Event.create(eventData);
  const subscribers = await subscriber.find({ isSubscribed: true });

  const emailTemplatePath = path.join(
    __dirname,
    '../../../../public/view/event_mail.html',
  );

  if (!fs.existsSync(emailTemplatePath)) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Email template not found',
    );
  }

  const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8');

  const emailContent = emailTemplate
    .replace('{{title}}', eventData.title)
    .replace('{{url}}', eventData.url)
    .replace('{{institution}}', eventData.event_start_date)
    .replace('{{job_description}}', eventData.event_end_date)
    .replace('{{location}}', eventData.organizer);
  const limit = pLimit(10);
  const emailTasks = subscribers.map(subscriber => {
    if (subscriber.email) {
      return limit(() =>
        sendEmail(subscriber.email, 'Event Post Available', emailContent),
      );
    }
    return Promise.resolve();
  });
  await Promise.all(emailTasks);
  const admin = await User.findOne({ role: USER_ROLE?.admin });
  await notificationServices.insertNotificationIntoDb({
    receiver: admin?._id,
    message: 'Event Created successfully',
    description: `User ${eventData.userId} has successfully created an event titled "${eventData.title}".`,
    refference: newEvent._id,
    model_type: modeType.Event,
  });
  return newEvent;
};

const getAllevent = async (query: Record<string, any>) => {
  const eventModel = new QueryBuilder(Event.find().populate('userId'), query)
    .search(['title'])
    .filter()
    .paginate()
    .sort();

  const data: any = await eventModel.modelQuery;
  const meta = await eventModel.countTotal();

  return {
    data,
    meta,
  };
};

const geteventById = async (id: string, query: Record<string, any>) => {
  const eventModel = new QueryBuilder(Event.find({ _id: id }), query)
    .search(['title'])
    .filter()
    .paginate()
    .sort();

  const data: any = await eventModel.modelQuery;
  const meta = await eventModel.countTotal();
  return {
    data,
    meta,
  };
};

const getMyeventById = async (id: string, query: Record<string, any>) => {
  const eventModel = new QueryBuilder(Event.find({ userId: id }), query)
    .search(['title'])
    .filter()
    .paginate()
    .sort();

  const data: any = await eventModel.modelQuery;
  const meta = await eventModel.countTotal();
  return {
    data,
    meta,
  };
};

const updateevent = async (id: string, eventData: Partial<Ievent>) => {
  const updatedEvent = await Event.findByIdAndUpdate(id, eventData, {
    new: true,
  });
  return updatedEvent;
};

const deleteevent = async (id: string) => {
  const deletedEvent = await Event.findByIdAndDelete(id);
  return deletedEvent;
};

const getEventByUserId = async (userId: string, query: Record<string, any>) => {
  const eventModel = new QueryBuilder(Event.find({ userId }), query)
    .search(['title']) // Adjust search fields as needed
    .filter()
    .paginate()
    .sort();

  const data: any = await eventModel.modelQuery;
  const meta = await eventModel.countTotal();

  return {
    data,
    meta,
  };
};

export const eventService = {
  createevent,
  getAllevent,
  geteventById,
  updateevent,
  deleteevent,
  getMyeventById,
  getEventByUserId,
};
