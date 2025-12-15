<template>
  <section class="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl mb-12">
    <img src="/images/dive_hero.png" alt="Scuba Diving in El Nido" class="absolute inset-0 w-full h-full object-cover" />
    <div class="absolute inset-0 bg-black/40"></div>
    <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-8 text-white relative z-10">
      <h1 class="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
        {{ $t('hero.h1') }}
      </h1>
      <p class="text-lg md:text-xl text-white/95 max-w-3xl mx-auto whitespace-pre-line drop-shadow-md">
        {{ $t('hero.p') }}
      </p>
    </div>
  </section>
</template>

<script setup>
</script>
