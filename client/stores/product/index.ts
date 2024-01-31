import { $fetch } from 'ofetch';
import { defineStore } from 'pinia';
import type { QueryObject } from 'ufo';
import type { IProductState, IProductsData } from '~~/types/product';

export const useProductStore = defineStore('product', {
  state: (): IProductState => {
    return {
      totalItems: null,
      totalPage: null,
      products: [],
      filters: null,
      loading: false,
    };
  },

  getters: {
    getProducts: (state: IProductState) => state.products,
  },
  actions: {
    async fetchProducts(query: QueryObject) {
      try {
        this.loading = true;
        const data = await $fetch<IProductsData>('/api/products', {
          query: {
            ...query,
          },
        });
        this.products = data.products;
        this.totalItems = data.totalItems;
        this.totalPage = data.totalPage;
      } catch (error: any) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    },
  },
});
