import {card} from './card';
import {product} from "./product";
import {category} from "./category";
import {cart} from "./cart";

export interface Data {
  cards: Array<card>;
  products: Array<product>;
  categories: Array<category>;
  currentProduct?: product;
  cart?: cart;
}

export const defaults: Data = {
  cards: [],
  products: [],
  categories: [],
};
