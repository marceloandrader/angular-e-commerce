import {orderDetail} from './order-detail';
import {user} from "./user";
import {product} from "./product";

export interface order {
  id: number;
  status: string;
  created_on: string;

  order_details: orderDetail;

  products?: product;
  users?: user;
}
