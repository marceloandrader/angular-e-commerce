import {card} from './card';
import {product} from "./product";
import {category} from "./category";
import {cart} from "./cart";
import {order} from "./order";
import {currentUser} from "./current-user";

export interface Data {
  cards: Array<card>;
  products: Array<product>;
  categories: Array<category>;
  orders?: Array<order>;
  currentProduct?: product;
  cart?: cart;
  currentUser?: currentUser;
}

export const defaults: Data = {
  cards: [],
  products: [],
  categories: [],
};
