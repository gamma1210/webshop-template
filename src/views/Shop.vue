<script setup>
import { ref, onMounted } from 'vue'
import { useMotion } from '@vueuse/motion'
import productsData from '@/assets/products.json'

const products = ref([])
const heroText = ref(null)

onMounted(() => {
  products.value = Object.values(productsData)
  // Animate the hero text on mount
  useMotion(heroText, {
    initial: { opacity: 0, y: -50 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  })
})
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Hero Section with background image and overlay -->
    <section class="relative w-full h-[500px] flex items-center justify-center bg-cover bg-center"
      style="background-image: url('https://source.unsplash.com/1600x900/?fitness,yoga');">
      <div class="absolute inset-0 bg-black opacity-60"></div>
      <div ref="heroText" class="relative text-center text-white px-4">
        <h1 class="text-5xl font-bold mb-4">Elevate Your Workout</h1>
        <p class="text-xl mb-8">Experience the ultimate in fitness and wellness with our premium gear.</p>
        <button class="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white text-lg font-semibold transition">
          Shop Now
        </button>
      </div>
    </section>
    
    <!-- Catchphrase Section -->
    <section class="bg-blue-600 text-white py-12">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl font-bold mb-4">Unleash Your Potential</h2>
        <p class="text-xl">Empower your body and mind with the perfect blend of innovation and style.</p>
      </div>
    </section>
    
    <!-- Product Highlights Section -->
    <section class="py-12 px-6 max-w-7xl mx-auto">
      <h2 class="text-3xl font-bold text-center mb-8">Our Top Picks</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-white shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105"
        >
          <img :src="product.images[0]" :alt="product.name" class="w-full h-48 object-cover" />
          <div class="p-4">
            <h3 class="text-xl font-semibold mb-1">{{ product.name }}</h3>
            <p class="text-gray-500 text-sm">{{ product.brand }}</p>
            <p class="text-green-600 font-bold mt-2">Rp {{ product.curr_price.toLocaleString('id-ID') }}</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
