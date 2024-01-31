<script setup lang="ts"></script>

<template>
  <div class="py-10 lg:flex items-start gap-6 min-h-screen">
    <app-aside></app-aside>
    <main class="lg:relative lg:w-[calc(100%-300px)] lg:min-h-screen ml-auto">
      <slot></slot>
    </main>
  </div>
</template>

<style scoped></style>
