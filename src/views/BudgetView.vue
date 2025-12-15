<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
    <!-- Hero Section -->
    <section class="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg mb-12">
      <img src="/images/info_hero.png" alt="Budget Info" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white relative z-10">
        <h1 class="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">💰 {{ $t('budget.title') }}</h1>
        <p class="text-lg text-white/95 drop-shadow-md">{{ $t('budget.subtitle') }}</p>
      </div>
    </section>

    <!-- Budget Content -->
    <BudgetSection />
  </main>
</template>

<script setup>
import BudgetSection from '@/components/itinerary/BudgetSection.vue'
</script>
