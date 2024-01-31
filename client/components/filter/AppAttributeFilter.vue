<script setup lang="ts">
import type { LocationQueryRaw, LocationQueryValue } from 'vue-router';

const props = defineProps<{
  attribute: string | number;
  filterName: string;
}>();
const router = useRouter();
const route = useRoute();
const getQuery = computed(() => route.query);
const isChecked = computed(() => getIsChecked());

const getIsChecked = (): boolean => {
  const isArrayQuery = Array.isArray(getQuery.value[props.filterName]) && getQuery.value[props.filterName];
  const isStringQuery = getQuery.value[props.filterName] === props.attribute;
  if (isArrayQuery) {
    return isArrayQuery.includes(String(props.attribute));
  } else {
    return isStringQuery;
  }
};

const setQuery = (name: string, value: string, oldValue: LocationQueryValue[] | LocationQueryValue, currentValue: LocationQueryRaw) => {
  router.push({
    query: {
      ...currentValue,
      [name]: Array.isArray(oldValue) ? [...oldValue, value] : oldValue ? [oldValue, value] : value,
    },
  });
};
const removeQuery = (name: string, value: string, oldValue: LocationQueryValue[] | LocationQueryValue, currentValue: LocationQueryRaw) => {
  const newValue = Array.isArray(oldValue) ? oldValue.filter((el: LocationQueryValue[] | LocationQueryValue) => el !== value) : undefined;

  router.push({
    query: {
      ...currentValue,
      [name]: newValue,
    },
  });
};
const changeRouteQuery = (val: Event) => {
  const { value, name, checked } = val.target as HTMLInputElement;
  const oldValue = route.query[name];
  const currentValue = route.query;

  if (checked) {
    setQuery(name, value, oldValue, currentValue);
  } else {
    removeQuery(name, value, oldValue, currentValue);
  }
};
</script>

<template>
  <div class="w-full">
    <div class="flex items-center">
      <label class="w-full flex items-center gap-2 p-3 text-sm font-medium cursor-pointer">
        <input
          type="checkbox"
          :value="attribute"
          :name="filterName"
          :checked="isChecked"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          @change="changeRouteQuery" />
        {{ String(attribute).toUpperCase() }}
      </label>
    </div>
  </div>
</template>

<style scoped></style>
