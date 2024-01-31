<script setup lang="ts">
import AppFilters from '~/components/filter/AppFilters.vue';

const isOpen = ref(false);

const toggle = () => {
  isOpen.value = !isOpen.value;
  console.log(isOpen.value);
};
</script>

<template>
  <div class="mb-10 lg:mb-0">
    <button
      data-drawer-target="default-sidebar"
      data-drawer-toggle="default-sidebar"
      aria-controls="default-sidebar"
      type="button"
      class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden"
      @click.prevent="toggle">
      <span class="sr-only">Open sidebar</span>
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
          clip-rule="evenodd"
          fill-rule="evenodd"
          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
      </svg>
    </button>
    <aside
      :class="[isOpen && 'translate-x-0']"
      class="fixed top-0 left-0 z-40 w-[100%] transition-transform -translate-x-full lg:relative lg:translate-x-0 lg:w-auto"
      aria-label="Sidebar">
      <div class="relative w-[300px] py-[60px] lg:min-h-screen lg:py-8 bg-gray-200">
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          class="absolute top-5 right-5 inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden"
          @click.prevent="toggle">
          <span class="sr-only">Open sidebar</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
        <div class="h-[calc(100vh-120px)] overflow-y-auto w-full px-3 lg:h-auto">
          <app-filters />
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped></style>
