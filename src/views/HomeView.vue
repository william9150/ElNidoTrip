<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
    <!-- Hero Section -->
    <section class="relative h-96 bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl overflow-hidden shadow-xl">
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-3">
          {{ $t('home.hero_title') }}
        </h1>
        <p class="text-xl text-white/90 mb-2">
          <i class="fa-solid fa-location-dot mr-2"></i>{{ $t('home.hero_location') }}
        </p>
        <p class="text-lg text-white/80 font-mono">{{ $t('home.hero_dates') }}</p>
      </div>
    </section>

    <!-- Introduction -->
    <section class="text-center max-w-3xl mx-auto">
      <h2 class="text-2xl font-bold text-slate-800 mb-4">{{ $t('home.intro_title') }}</h2>
      <p class="text-slate-600 text-lg">{{ $t('home.intro_desc') }}</p>
    </section>

    <!-- Page Cards -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Itinerary Card -->
      <router-link
        to="/itinerary"
        class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border-t-4 border-blue-500"
      >
        <div class="text-4xl mb-4">📅</div>
        <h3 class="text-xl font-bold text-slate-800 mb-2">{{ $t('nav.itinerary') }}</h3>
        <p class="text-slate-600 text-sm mb-4">{{ $t('home.cards.itinerary') }}</p>
        <div class="text-sky-600 font-medium text-sm flex items-center">
          {{ $t('home.view_more') }} <i class="fa-solid fa-arrow-right ml-2"></i>
        </div>
      </router-link>

      <!-- Dive Shop Card -->
      <router-link
        to="/dive"
        class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border-t-4 border-orange-500"
      >
        <div class="text-4xl mb-4">🤿</div>
        <h3 class="text-xl font-bold text-slate-800 mb-2">{{ $t('nav.dive') }}</h3>
        <p class="text-slate-600 text-sm mb-4">{{ $t('home.cards.dive') }}</p>
        <div class="text-sky-600 font-medium text-sm flex items-center">
          {{ $t('home.view_more') }} <i class="fa-solid fa-arrow-right ml-2"></i>
        </div>
      </router-link>

      <!-- Flight Card -->
      <router-link
        to="/flight"
        class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border-t-4 border-emerald-500"
      >
        <div class="text-4xl mb-4">✈️</div>
        <h3 class="text-xl font-bold text-slate-800 mb-2">{{ $t('nav.flight') }}</h3>
        <p class="text-slate-600 text-sm mb-4">{{ $t('home.cards.flight') }}</p>
        <div class="text-sky-600 font-medium text-sm flex items-center">
          {{ $t('home.view_more') }} <i class="fa-solid fa-arrow-right ml-2"></i>
        </div>
      </router-link>

      <!-- Restaurant Card -->
      <router-link
        to="/restaurants"
        class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border-t-4 border-red-500"
      >
        <div class="text-4xl mb-4">🍴</div>
        <h3 class="text-xl font-bold text-slate-800 mb-2">{{ $t('nav.restaurants') }}</h3>
        <p class="text-slate-600 text-sm mb-4">{{ $t('home.cards.restaurants') }}</p>
        <div class="text-sky-600 font-medium text-sm flex items-center">
          {{ $t('home.view_more') }} <i class="fa-solid fa-arrow-right ml-2"></i>
        </div>
      </router-link>

      <!-- Info Card -->
      <router-link
        to="/info"
        class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border-t-4 border-amber-500"
      >
        <div class="text-4xl mb-4">ℹ️</div>
        <h3 class="text-xl font-bold text-slate-800 mb-2">{{ $t('nav.info') }}</h3>
        <p class="text-slate-600 text-sm mb-4">{{ $t('home.cards.info') }}</p>
        <div class="text-sky-600 font-medium text-sm flex items-center">
          {{ $t('home.view_more') }} <i class="fa-solid fa-arrow-right ml-2"></i>
        </div>
      </router-link>
    </section>
  </main>
</template>

<script setup>
</script>
