<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
    <HeroSection />

    <Concierge />

    <PriceChart />

    <section id="details" class="space-y-6">
      <div class="text-center md:text-center">
        <h2 class="text-2xl font-bold text-slate-800">{{ $t('details.h2') }}</h2>
        <p class="text-slate-600 mt-2 whitespace-pre-line">{{ $t('details.p') }}</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ShopCard shop-key="elDive" color-scheme="sky" />
        <ShopCard shop-key="twoHundredBar" color-scheme="orange" />
        <ShopCard shop-key="tabanka" color-scheme="emerald" />
      </div>
    </section>

    <ComparisonTable />
  </main>
</template>

<script setup>
import HeroSection from '@/components/dive-shop/HeroSection.vue'
import Concierge from '@/components/dive-shop/Concierge.vue'
import PriceChart from '@/components/dive-shop/PriceChart.vue'
import ShopCard from '@/components/dive-shop/ShopCard.vue'
import ComparisonTable from '@/components/dive-shop/ComparisonTable.vue'
</script>
