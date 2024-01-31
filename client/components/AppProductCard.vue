<script setup lang="ts">
import type { IProduct } from '~~/types/product';

defineProps<{
  product: IProduct;
}>();
</script>

<template>
  <div class="bg-gray-3 border border-gray-200 rounded-lg shadow">
    <router-link :to="{ name: 'product-slug', params: { slug: product.slug } }" class="block p-5">
      <img class="block h-48 w-[100%] object-cover" :src="product.image" :alt="product.name" />
      <h3 class="mt-4">{{ product.name }}</h3>
      <p class="mt-2 font-normal text-gray-700 dark:text-gray-500 line-clamp-2">
        {{ product.description }}
      </p>
      <span class="block mt-2 text-right text-1xl font-bold text-blue-600">{{ product.price }}$</span>
    </router-link>
  </div>
</template>

<style scoped></style>
