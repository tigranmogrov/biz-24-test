<script setup lang="ts">
import AppAttributeFilter from '~/components/filter/AppAttributeFilter.vue';
import AppPriceFilter from '~/components/filter/AppPriceFilter.vue';
import { useProductStore } from '~/stores/product';

const productStore = useProductStore();
onMounted(() => productStore.fetchProductFilters());
const filters = computed(() => productStore.getProductFilters);
</script>

<template>
  <div v-if="filters">
    <ul class="flex flex-col gap-6">
      <li>
        <h3 class="mb-4 font-semibold">Price</h3>
        <div class="flex flex-col gap-1 border border-gray-400 rounded divide-y py-2">
          <app-price-filter :price="filters.price" />
        </div>
      </li>
      <li>
        <h3 class="mb-4 font-semibold">Categories</h3>
        <div class="flex flex-col gap-1 border border-gray-400 rounded divide-y py-2">
          <app-attribute-filter v-for="category in filters.category" :key="category" :attribute="category" :filter-name="'category'" />
        </div>
      </li>
      <li>
        <h3 class="mb-4 font-semibold">Color</h3>
        <div class="flex flex-col gap-1 border border-gray-400 rounded divide-y py-2">
          <app-attribute-filter v-for="color in filters.color" :key="color" :attribute="color" :filter-name="'color'" />
        </div>
      </li>
      <li>
        <h3 class="mb-4 font-semibold">Weight</h3>
        <div class="flex flex-col gap-1 border border-gray-400 rounded divide-y py-2">
          <app-attribute-filter v-for="weight in filters.weight" :key="weight" :attribute="weight" :filter-name="'weight'" />
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
