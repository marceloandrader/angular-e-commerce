import {product} from "./product";

export interface cart {
  userId?: number;
  products: Array<product>;
}
