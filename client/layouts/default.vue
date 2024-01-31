<script setup lang="ts"></script>

<template>
  <div class="py-10 lg:flex gap-6">
    <app-aside></app-aside>
    <main class="lg:w-[calc(100%-300px)] ml-auto">
      <slot></slot>
    </main>
  </div>
</template>

<style scoped></style>
