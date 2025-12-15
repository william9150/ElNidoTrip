<template>
  <nav class="bg-white shadow-sm border-b border-slate-100 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo/Brand -->
        <div class="flex items-center">
          <span class="text-xl md:text-2xl font-bold text-sky-600">{{ $t('nav.brand') }}</span>
        </div>

        <!-- Center Navigation Links - Desktop -->
        <div class="hidden md:flex items-center space-x-6">
          <router-link
            to="/"
            class="font-medium border-b-2 pb-1 transition-colors"
            :class="$route.path === '/'
              ? 'text-slate-900 border-sky-600'
              : 'text-slate-600 hover:text-sky-600 border-transparent hover:border-sky-300'"
          >
            {{ $t('nav.home') }}
          </router-link>
          <router-link
            to="/itinerary"
            class="font-medium border-b-2 pb-1 transition-colors"
            :class="$route.path === '/itinerary'
              ? 'text-slate-900 border-sky-600'
              : 'text-slate-600 hover:text-sky-600 border-transparent hover:border-sky-300'"
          >
            {{ $t('nav.itinerary') }}
          </router-link>
          <router-link
            to="/dive"
            class="font-medium border-b-2 pb-1 transition-colors"
            :class="$route.path === '/dive'
              ? 'text-slate-900 border-sky-600'
              : 'text-slate-600 hover:text-sky-600 border-transparent hover:border-sky-300'"
          >
            {{ $t('nav.dive') }}
          </router-link>
          <router-link
            to="/flight"
            class="font-medium border-b-2 pb-1 transition-colors"
            :class="$route.path === '/flight'
              ? 'text-slate-900 border-sky-600'
              : 'text-slate-600 hover:text-sky-600 border-transparent hover:border-sky-300'"
          >
            {{ $t('nav.flight') }}
          </router-link>
          <router-link
            to="/restaurants"
            class="font-medium border-b-2 pb-1 transition-colors"
            :class="$route.path === '/restaurants'
              ? 'text-slate-900 border-sky-600'
              : 'text-slate-600 hover:text-sky-600 border-transparent hover:border-sky-300'"
          >
            {{ $t('nav.restaurants') }}
          </router-link>
          <router-link
            to="/info"
            class="font-medium border-b-2 pb-1 transition-colors"
            :class="$route.path === '/info'
              ? 'text-slate-900 border-sky-600'
              : 'text-slate-600 hover:text-sky-600 border-transparent hover:border-sky-300'"
          >
            {{ $t('nav.info') }}
          </router-link>
        </div>

        <!-- Right Side: Language Selector + Mobile Menu -->
        <div class="flex items-center space-x-3">
          <!-- Language Toggle -->
          <div class="relative inline-block text-left">
            <select
              id="language-selector"
              v-model="locale"
              @change="switchLanguage"
              class="bg-white border border-slate-300 rounded-md shadow-sm pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 cursor-pointer"
            >
              <option value="zh-TW">🇹🇼 繁中</option>
              <option value="ja">🇯🇵 日本語</option>
            </select>
          </div>

          <!-- Mobile Menu Button -->
          <button
            id="mobile-menu-btn"
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-md text-slate-600 hover:text-sky-600 hover:bg-slate-100 transition-colors"
            aria-label="Menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu Dropdown -->
      <div v-show="mobileMenuOpen" class="md:hidden pb-4 pt-2 space-y-2">
        <router-link
          to="/"
          class="block px-4 py-2 rounded-md font-medium"
          :class="$route.path === '/'
            ? 'text-slate-900 bg-sky-50'
            : 'text-slate-600 hover:bg-slate-100'"
          @click="mobileMenuOpen = false"
        >
          {{ $t('nav.home') }}
        </router-link>
        <router-link
          to="/itinerary"
          class="block px-4 py-2 rounded-md font-medium"
          :class="$route.path === '/itinerary'
            ? 'text-slate-900 bg-sky-50'
            : 'text-slate-600 hover:bg-slate-100'"
          @click="mobileMenuOpen = false"
        >
          {{ $t('nav.itinerary') }}
        </router-link>
        <router-link
          to="/dive"
          class="block px-4 py-2 rounded-md font-medium"
          :class="$route.path === '/dive'
            ? 'text-slate-900 bg-sky-50'
            : 'text-slate-600 hover:bg-slate-100'"
          @click="mobileMenuOpen = false"
        >
          {{ $t('nav.dive') }}
        </router-link>
        <router-link
          to="/flight"
          class="block px-4 py-2 rounded-md font-medium"
          :class="$route.path === '/flight'
            ? 'text-slate-900 bg-sky-50'
            : 'text-slate-600 hover:bg-slate-100'"
          @click="mobileMenuOpen = false"
        >
          {{ $t('nav.flight') }}
        </router-link>
        <router-link
          to="/restaurants"
          class="block px-4 py-2 rounded-md font-medium"
          :class="$route.path === '/restaurants'
            ? 'text-slate-900 bg-sky-50'
            : 'text-slate-600 hover:bg-slate-100'"
          @click="mobileMenuOpen = false"
        >
          {{ $t('nav.restaurants') }}
        </router-link>
        <router-link
          to="/info"
          class="block px-4 py-2 rounded-md font-medium"
          :class="$route.path === '/info'
            ? 'text-slate-900 bg-sky-50'
            : 'text-slate-600 hover:bg-slate-100'"
          @click="mobileMenuOpen = false"
        >
          {{ $t('nav.info') }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { locale } = useI18n()
const route = useRoute()
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const switchLanguage = () => {
  localStorage.setItem('preferred-language', locale.value)
}
</script>
