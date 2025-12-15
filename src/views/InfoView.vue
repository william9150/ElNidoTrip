<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
    <!-- Hero Section -->
    <section class="text-center">
      <h1 class="text-3xl md:text-4xl font-bold text-slate-800">ℹ️ {{ $t('budget.title') }}</h1>
      <p class="text-slate-600 mt-2">預算規劃與重要提醒</p>
    </section>

    <!-- Info Content -->
    <InfoSection />
  </main>
</template>

<script setup>
import InfoSection from '@/components/itinerary/InfoSection.vue'
</script>
