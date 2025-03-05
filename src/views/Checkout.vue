<template>
  <div class="container mx-auto p-6 md:p-12">
    <div class="grid grid-cols-1 md:grid-cols-5 gap-12">
      <!-- Left: Shipping Details (60%) -->
      <div class="md:col-span-3">
        <!-- Email -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-2">1. Enter your email</h2>
          <input type="email" placeholder="Enter your email"
            class="w-full border px-4 py-3 rounded-lg bg-white text-black" />
        </div>

        <!-- Shipping Address -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-2">2. Shipping address</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="First name" class="input-field" />
            <input type="text" placeholder="Last name" class="input-field" />
            <input type="email" placeholder="Email" class="input-field" />
            <input type="text" placeholder="Phone number" class="input-field" />
            <input type="text" placeholder="City" class="input-field" />
            <input type="text" placeholder="Post Code" class="input-field" />
          </div>
          <input type="text" placeholder="Address" class="input-field w-full mt-4" />
        </div>

        <!-- Shipping Method -->
        <div>
          <h2 class="text-lg font-semibold mb-2">3. Shipping method</h2>
          <div class="space-y-3">
            <label class="flex items-center space-x-3">
              <input type="radio" name="shipping" value="free" v-model="selectedShipping" class="accent-black" />
              <span>Free shipping (8-30 business days) - Rp 0</span>
            </label>
            <label class="flex items-center space-x-3">
              <input type="radio" name="shipping" value="regular" v-model="selectedShipping" class="accent-black" />
              <span>Regular shipping (3-10 business days) - Rp 25.000</span>
            </label>
            <label class="flex items-center space-x-3">
              <input type="radio" name="shipping" value="express" v-model="selectedShipping" class="accent-black" />
              <span>Express shipping (1-3 business days) - Rp 100.000</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Right: Order Summary (40%) -->
      <div class="md:col-span-2 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 class="text-lg font-semibold mb-4">Billing Address</h2>
        <div v-if="product" class="flex items-center space-x-4">
          <img :src="product?.images[0]" :alt="product.name" class="w-16 h-16 object-cover rounded-lg" />
          <div>
            <p class="font-semibold">{{ product.name }}</p>
            <p class="text-gray-600">x{{ quantity }}</p>
          </div>
          <p class="ml-auto font-semibold">Rp {{ formatPrice(product.curr_price * quantity) }}</p>
        </div>
        <p v-else class="text-gray-500">Loading product details...</p>

        <!-- Discount Code -->
        <div class="mt-4">
          <label class="text-sm font-semibold">Discount Code</label>
          <div class="flex mt-1">
            <input type="text" placeholder="Enter your voucher" class="input-field rounded-l-lg w-full" />
            <button class="bg-black text-white px-4 rounded-r-lg">Apply</button>
          </div>
          <p class="text-sm mt-2 text-gray-600">
            New customer? <a href="#" class="text-green-600 font-semibold">Sign up</a> to get better deals.
          </p>
        </div>

        <!-- Summary -->
        <div class="mt-6 border-t pt-4 space-y-2">
          <p class="flex justify-between"><span>Subtotal</span><span>Rp {{ formatPrice(product?.curr_price * quantity ||
              0) }}</span></p>
          <p class="flex justify-between"><span>Discount</span><span>-Rp 0</span></p>
          <p class="flex justify-between"><span>Shipment cost</span><span>Rp {{ formatPrice(shippingCost) }}</span></p>
          <p class="flex justify-between font-bold text-lg">
            <span>Grand total</span>
            <span>Rp {{ formatPrice((product?.curr_price * quantity || 0) + shippingCost) }}</span>
          </p>
        </div>

        <!-- Continue Button -->
        <button class="mt-6 w-full bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-800">
          Continue to payment
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import productsData from "@/assets/products.json";

// Get route params
const route = useRoute();
const productId = route.params.productId;
const selectedColor = ref(route.query.color || '');
const quantity = ref(parseInt(route.query.quantity) || 1);
const selectedShipping = ref("free");

const product = computed(() => productsData[productId] || null);

const shippingCost = computed(() => {
  switch (selectedShipping.value) {
    case "regular":
      return 25000;
    case "express":
      return 100000;
    default:
      return 0;
  }
});

const formatPrice = price => price.toLocaleString("id-ID");
</script>

<style>
.input-field {
  @apply w-full border px-4 py-3 rounded-lg bg-white text-black;
}

input:focus {
  outline: none;
  border-color: black;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
}
</style>