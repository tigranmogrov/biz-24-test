<script setup lang="ts">
import type { IPriceFilter } from '~~/types/product';

const props = defineProps<{
  price: IPriceFilter;
}>();

const router = useRouter();
const route = useRoute();
const queryPrice = String(route.query.price).split('-');

const currentPrice = reactive<IPriceFilter>({
  min: (route.query.price && Number(queryPrice[0])) || props.price.min,
  max: (route.query.price && Number(queryPrice[1])) || props.price.max,
});

const setValue = (event: Event) => {
  const { name, value } = event.target as HTMLInputElement;
  currentPrice[name as keyof IPriceFilter] = Number(value);
};
const setPrice = () => {
  router.push({
    query: {
      ...route.query,
      price: `${currentPrice.min}-${currentPrice.max}`,
    },
  });
};

const isCorrectValue = computed(() => props.price.min > currentPrice.min || props.price.max < currentPrice.max);
</script>

<template>
  <div class="w-full p-3">
    <div class="flex items-center gap-1">
      <label for="number-input" class="block text-sm font-medium text-gray-900 dark:text-white">
        <input
          :style="[isCorrectValue && { borderColor: 'red' }]"
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          :value="currentPrice.min"
          name="min"
          @input="setValue" />
      </label>
      <span>-</span>
      <label for="number-input" class="block text-sm font-medium text-gray-900 dark:text-white">
        <input
          :style="[isCorrectValue && { borderColor: 'red' }]"
          :value="currentPrice.max"
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          name="max"
          @input="setValue" />
      </label>

      <button
        :disabled="isCorrectValue"
        :class="[isCorrectValue && 'disabled:bg-slate-50 disabled:text-slate-500']"
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-3 ml-2 flex-shrink-0"
        @click.prevent="setPrice">
        OK
      </button>
    </div>
  </div>
</template>

<style scoped></style>
