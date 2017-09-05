import {card} from './card';
import {product} from "./product";
import {category} from "./category";

export interface Data {
  cards: Array<card>;
  products: Array<product>;
  categories: Array<category>;
}

export const defaults: Data = {
  cards: [],
  products: [],
  categories: []
};
