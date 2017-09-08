import {orderDetail} from './order-detail';

export interface order {
  id: number;
  status: string;
  created_on: string;

  order_details: orderDetail;
}
