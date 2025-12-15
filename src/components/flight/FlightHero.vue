<template>
  <div class="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg mb-8">
    <img src="/images/flight_hero.png" alt="Flight to El Nido" class="absolute inset-0 w-full h-full object-cover" />
    <div class="absolute inset-0 bg-black/40"></div>
    <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white relative z-10">
      <h1 class="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">{{ $t('page.title') }}</h1>
      <p class="text-lg text-white/95 drop-shadow-md">{{ $t('page.subtitle') }}</p>
    </div>
  </div>
</template>

<script setup>
</script>
