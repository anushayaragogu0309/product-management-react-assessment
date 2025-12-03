import productsData from "../data/productData.json";
import {type Product } from "../interfaces/product.interface";

export const getProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(productsData), 300)
  );
};
