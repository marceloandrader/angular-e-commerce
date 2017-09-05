import {product} from "./product";

export interface category {
  id?: number;
  name: string;
  products: Array<product>;
}
