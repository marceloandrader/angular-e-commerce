import {card} from './card';
import {product} from "./product";
import {category} from "./category";
import {cart} from "./cart";
import {order} from "./order";
import {currentUser} from "./current-user";
import {user} from "./user";

export interface Data {
  cards: Array<card>;
  products: Array<product>;
  categoriesWithProducts: Array<category>;
  users: Array<user>;
  categories: Array<category>;
  orders?: Array<order>;
  currentProduct?: product;
  cart?: cart;
  currentUser?: currentUser;

  savedProduct: boolean;
}

export const defaults: Data = {
  cards: [],
  products: [],
  categoriesWithProducts: [],
  categories: [],
  users: [],

  savedProduct: false,
};
