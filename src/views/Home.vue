<template>
  <div class="container mx-auto p-6 text-center">
    <!-- Hero Section -->
    <div class="py-16 bg-gray-100 rounded-lg shadow-md">
      <h1 class="text-4xl font-bold text-gray-900">Discover the Perfect Yoga Mat for You</h1>
      <p class="text-gray-600 mt-4">Experience comfort and durability with our premium selection.</p>
      <button class="mt-6 px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition">Shop
        Now</button>
    </div>

    <!-- Featured Products -->
    <div class="mt-12 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="(product, key) in featuredProducts" :key="key"
        class="flex flex-col bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <img :src="product.images[0]" :alt="product.name" class="w-full h-52 object-cover">
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-900 line-clamp-2">{{ product.name }}</h3>
          <p class="text-gray-900 font-bold mt-2">Rp{{ product.curr_price.toLocaleString("id-ID") }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import productsData from "@/assets/products.json";

const featuredProducts = ref(Object.values(productsData).slice(0, 3));
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
