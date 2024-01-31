import { Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  image: string;
  width: number;
  height: number;
  weight: number;
  color: string;
}

export interface IProductsData {
  totalItems: number | null;
  totalPage: number | null;
  products: IProduct[] | [];
}

export interface IPriceFilter {
  min: string;
  max: string;
}

export interface IProductFilters {
  category: [string];
  color: [string];
  weight: [number];
  price: IPriceFilter;
}
export interface IProductState extends IProductsData {
  filters: IProductFilters | null;
  loading: boolean;
}
