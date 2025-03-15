import { ObjectId } from 'mongodb';
export enum modeType {
  RefundRequest = 'refundRequest',
  ShopWiseOrder = 'ShopWiseOrder',
  Order = 'Order',
  Event = 'Event',
  User = 'User',
  CallForPaper = 'CallForPaper',
  jobPost = 'jobPost',
  Grants = 'Grants',
}
export interface TNotification {
  receiver: ObjectId;
  message: string;
  description?: string;
  refference: ObjectId;
  model_type: modeType;
  date?: Date;
  read: boolean;
  isDeleted: boolean;
}
