<script setup lang="ts">
import AppSpinner from '~/components/AppSpinner.vue';
import { useProductStore } from '~/stores/product';

const productStore = useProductStore();
const route = useRoute();

onMounted(() => productStore.fetchProducts(route.query));

watch(
  () => route.query,
  (newQuery) => {
    productStore.fetchProducts(newQuery);
  }
);
</script>

<template>
  <div>
    <app-spinner v-if="productStore.loading" />

    <div v-else>
      <ul class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <li v-for="product in productStore.getProducts" :key="product._id" class="block">
          <app-product-card :product="product" />
        </li>
      </ul>
      <div v-if="!productStore.getProducts.length"><strong>Products is empty...</strong></div>
    </div>
  </div>
</template>

<style scoped></style>
