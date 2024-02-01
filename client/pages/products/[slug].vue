<script setup lang="ts">
import AppSpinner from '~/components/AppSpinner.vue';
import type { IProduct } from '~~/types/product';

definePageMeta({
  layout: 'empty',
});

const route = useRoute();
const slug = route.params.slug;

const { data: product, pending } = useFetch<IProduct>(`/api/products/${slug}`);
</script>

<template>
  <app-spinner v-if="pending && !product" />
  <section v-else class="pt-10 pb-10">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row -mx-4">
        <div class="md:flex-1 px-4">
          <div class="h-[300px] md:h-[360px] lg:h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700">
            <img class="w-full h-full object-cover" :src="product.image" alt="Product Image" />
          </div>
        </div>
        <div class="mt-4 md:mt-0 md:flex-1 px-4">
          <h2 class="text-2xl font-bold text-gray-500">{{ product.name }}</h2>
          <p class="text-gray-500 text-sm mt-4">
            {{ product.description }}
          </p>
          <div class="flex mt-4">
            <div class="mr-4">
              <span class="font-bold text-gray-500">Price:</span>
              <span class="pl-2 text-gray-500">{{ product.price }}$</span>
            </div>
          </div>
          <div class="mt-4">
            <span class="font-bold text-gray-500">Color:</span>
            <div class="flex items-center mt-2 gap-2">
              <span :style="{ backgroundColor: product.color }" class="block rounded w-[20px] h-[20px] border border-amber-100"></span>
              <span>{{ product.color }}</span>
            </div>
          </div>
          <div class="mt-4">
            <span class="font-bold text-gray-500">Width:</span>
            <div class="flex items-center mt-2 gap-2">
              <span>{{ product.width }} sm</span>
            </div>
          </div>
          <div class="mt-4">
            <span class="font-bold text-gray-500">Height:</span>
            <div class="flex items-center mt-2 gap-2">
              <span>{{ product.height }} sm</span>
            </div>
          </div>
          <div class="mt-4">
            <span class="font-bold text-gray-500">Weight:</span>
            <div class="flex items-center mt-2 gap-2">
              <span>{{ product.weight }} kg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
