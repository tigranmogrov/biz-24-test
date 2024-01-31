<script setup lang="ts">
import type { IPriceFilter } from '~~/types/product';

const props = defineProps<{
  price: IPriceFilter;
}>();

const router = useRouter();
const route = useRoute();
const queryPrice = String(route.query.price).split('-');

const currentPrice = reactive<IPriceFilter>({
  min: (route.query.price && queryPrice[0]) || props.price.min,
  max: (route.query.price && queryPrice[1]) || props.price.max,
});

const setValue = (event: Event) => {
  const { name, value } = event.target as HTMLInputElement;
  currentPrice[name as keyof IPriceFilter] = value;
};
const setPriceRoute = () => {
  router.push({
    query: {
      ...route.query,
      price: `${currentPrice.min}-${currentPrice.max}`,
    },
  });
};

const validatePrices = (currentPrice: IPriceFilter, statePrice: IPriceFilter): boolean => {
  const currentMin = Number(currentPrice.min);
  const currentMax = Number(currentPrice.max);
  const stateMin = Number(statePrice.min);
  const stateMax = Number(statePrice.max);

  if (currentMin > currentMax || currentMax < currentMin) {
    return false;
  }

  if (stateMax < currentMax || !/^\d+$/.test(String(stateMax)) || !/^\d+$/.test(String(currentMax))) {
    return false;
  }

  return stateMin <= currentMin;
};
const isCorrectValue = computed(() => validatePrices(currentPrice, props.price));
</script>

<template>
  <div class="w-full px-3 py-2">
    <div class="flex items-center gap-1">
      <label for="number-input" class="block text-sm font-medium text-gray-900 dark:text-white">
        <input
          :style="[!isCorrectValue && { borderColor: 'red' }]"
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          :value="currentPrice.min"
          name="min"
          @input="setValue" />
      </label>
      <span>-</span>
      <label for="number-input" class="block text-sm font-medium text-gray-900 dark:text-white">
        <input
          :style="[!isCorrectValue && { borderColor: 'red' }]"
          :value="currentPrice.max"
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          name="max"
          @input="setValue" />
      </label>

      <button
        :disabled="!isCorrectValue"
        :class="[!isCorrectValue && 'disabled:bg-slate-50 disabled:text-slate-500']"
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-3 ml-2 flex-shrink-0"
        @click.prevent="setPriceRoute">
        OK
      </button>
    </div>
  </div>
</template>

<style scoped></style>
