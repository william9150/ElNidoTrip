<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
    <!-- Hero Section -->
    <section class="text-center">
      <h1 class="text-3xl md:text-4xl font-bold text-slate-800">🍴 {{ $t('restaurant.title') }}</h1>
      <p class="text-slate-600 mt-2">精選愛妮島美食推薦</p>
    </section>

    <!-- Restaurants Grid -->
    <RestaurantSection />
  </main>
</template>

<script setup>
import RestaurantSection from '@/components/itinerary/RestaurantSection.vue'
</script>
