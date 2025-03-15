import { Isubscriber } from './subscriber.interface';
import subscriber from './subscriber.models';

const createsubscriber = async (data: Isubscriber) => {
  return await subscriber.create(data);
};
const getAllsubscriber = async () => {};
const getsubscriberById = async () => {};
const updatesubscriber = async () => {};
const deletesubscriber = async () => {};

export const subscriberService = {
  createsubscriber,
  getAllsubscriber,
  getsubscriberById,
  updatesubscriber,
  deletesubscriber,
};
