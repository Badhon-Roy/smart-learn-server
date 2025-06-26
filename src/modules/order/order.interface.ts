import { Types } from 'mongoose';

export interface IOrder {
  name: string;
  email: string;
  mobile: string;
  price: number;
  status: 'pending' | 'paid';
  courseId: Types.ObjectId,
  userId: Types.ObjectId,
  session?: string;
}
