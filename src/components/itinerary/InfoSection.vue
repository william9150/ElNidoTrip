<template>
  <section class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Precautions Card (Class) -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2">
          <i class="fa-solid fa-graduation-cap text-amber-500"></i>
          {{ $t('precautions.title') }}
        </h3>

        <ul class="space-y-4">
          <li
            v-for="item in precautionsData"
            :key="item.id"
            class="flex items-start gap-3"
          >
            <div class="bg-amber-100 rounded-full p-1.5 mt-0.5">
              <i class="fa-solid fa-exclamation text-amber-600 text-xs w-3 h-3 flex items-center justify-center"></i>
            </div>
            <div class="flex-1">
              <span class="font-bold text-slate-800 block">{{ $t(`precautions.items.${item.id}.title`) }}</span>
              <span class="text-sm text-slate-600">{{ $t(`precautions.items.${item.id}.desc`) }}</span>
            </div>
          </li>
        </ul>
      </div>

      <!-- Packing List Card -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2">
          <i class="fa-solid fa-suitcase text-indigo-500"></i>
          {{ $t('packing.title') }}
        </h3>

        <ul class="space-y-4">
          <li
            v-for="item in packingList"
            :key="item.id"
            class="flex items-start gap-3"
          >
            <div class="bg-indigo-100 rounded-full p-1.5 mt-0.5">
              <i class="fa-solid fa-check text-indigo-600 text-xs w-3 h-3 flex items-center justify-center"></i>
            </div>
            <div class="flex-1">
              <span class="font-bold text-slate-800 block">{{ $t(`packing.items.${item.id}.title`) }}</span>
              <span class="text-sm text-slate-600">{{ $t(`packing.items.${item.id}.desc`) }}</span>
            </div>
          </li>
        </ul>
      </div>

      <!-- Flight Precautions Card -->
      <div class="bg-white rounded-lg shadow-md p-6 md:col-span-2">
        <h3 class="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2">
          <i class="fa-solid fa-plane-circle-exclamation text-rose-500"></i>
          {{ $t('flight_precautions.title') }}
        </h3>

        <ul class="space-y-4">
          <li
            v-for="item in flightPrecautionsData"
            :key="item.id"
            class="flex items-start gap-3"
          >
            <div class="bg-rose-100 rounded-full p-1.5 mt-0.5">
              <i class="fa-solid fa-triangle-exclamation text-rose-600 text-xs w-3 h-3 flex items-center justify-center"></i>
            </div>
            <div class="flex-1">
              <span class="font-bold text-slate-800 block">{{ $t(`flight_precautions.items.${item.id}.title`) }}</span>
              <span class="text-sm text-slate-600">{{ $t(`flight_precautions.items.${item.id}.desc`) }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { precautionsData, packingList, flightPrecautionsData } from '@/data/infoData'
</script>
