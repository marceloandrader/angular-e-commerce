import {category} from './category';

export interface product {
  id?: number;
  name: string;
  description: string;
  price: number;
  quantity?: number;
  category_id?: number;
  category?: category;
}
