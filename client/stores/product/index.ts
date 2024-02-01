import { $fetch } from 'ofetch';
import { defineStore } from 'pinia';
import type { QueryObject } from 'ufo';
import type { IProduct, IProductFilters, IProductState, IProductsData } from '~~/types/product';

export const useProductStore = defineStore('product', {
  state: (): IProductState => {
    return {
      totalItems: null,
      totalPage: null,
      products: [],
      filters: null,
      loading: true,
    };
  },

  getters: {
    getProducts: (state: IProductState): IProduct[] => state.products,
    getProductFilters: (state: IProductState): IProductFilters | null => state.filters,
  },
  actions: {
    async fetchProducts(query: QueryObject) {
      try {
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
    async fetchProductFilters() {
      try {
        const data = await $fetch<Pick<IProductState, 'filters'>>('/api/products/filters');
        this.filters = data.filters;
      } catch (e) {
        console.log(e);
      }
    },
  },
});
