import {card} from './card';
import {product} from "./product";

export interface Data {
  cards: Array<card>;
  products: Array<product>;
}

export const defaults: Data = {
  cards: [],
  products: []
};
