import { ICategory } from 'app/shared/model/category.model';

export interface IProduct {
  id?: number;
  productName?: string;
  imageURL?: string;
  price?: number;
  discount?: number;
  description?: string;
  category?: ICategory;
}

export const defaultValue: Readonly<IProduct> = {};
