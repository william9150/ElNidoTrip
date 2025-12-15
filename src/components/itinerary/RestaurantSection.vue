<template>
  <section class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="restaurant in restaurantData"
        :key="restaurant.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      >
        <!-- Restaurant Image -->
        <div
          class="h-48 bg-cover bg-center"
          :style="{ backgroundImage: `url('${restaurant.imageUrl}')` }"
        ></div>

        <!-- Restaurant Info -->
        <div class="p-5">
          <div class="flex justify-between items-start mb-3">
            <div>
              <h3 class="font-bold text-lg text-slate-800">{{ restaurant.name }}</h3>
              <p class="text-xs text-slate-500 mt-1">
                <i class="fa-solid fa-location-dot mr-1"></i>{{ restaurant.location }}
              </p>
            </div>
            <span
              :class="[
                'text-xs font-bold px-2 py-1 rounded',
                getCategoryClasses(restaurant.categoryColor)
              ]"
            >
              {{ restaurant.category }}
            </span>
          </div>
          <p class="text-sm text-slate-600">{{ restaurant.description }}</p>
          <a
            :href="restaurant.mapUrl"
            target="_blank"
            class="block mt-4 text-center w-full py-2 bg-sky-50 text-sky-600 text-sm rounded hover:bg-sky-100 font-medium transition-colors"
          >
            {{ $t('restaurant.view_map') }} →
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { restaurantData } from '@/data/restaurantData'

const getCategoryClasses = (color) => {
  const colorMap = {
    orange: 'bg-orange-100 text-orange-600',
    red: 'bg-red-100 text-red-600',
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600'
  }
  return colorMap[color] || 'bg-slate-100 text-slate-600'
}
</script>
