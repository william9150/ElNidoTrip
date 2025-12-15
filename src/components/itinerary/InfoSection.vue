<template>
  <section class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Budget Card -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2">
          <i class="fa-solid fa-calculator text-sky-500"></i>
          {{ $t('budget.cost_title') }}
        </h3>

        <div class="space-y-4">
          <div class="flex justify-between items-center pb-3 border-b border-slate-100">
            <span class="text-sm text-slate-600">{{ $t('budget.accommodation') }}</span>
            <span class="font-mono font-bold text-slate-800">TWD {{ budgetData.accommodation.total.toLocaleString() }}</span>
          </div>

          <div class="bg-sky-50 rounded-lg p-4 border-l-4 border-sky-500">
            <div class="flex justify-between items-center mb-1">
              <span class="text-sm font-bold text-sky-700">{{ $t('budget.student') }}</span>
              <span class="font-mono font-bold text-sky-700 text-lg">~TWD {{ budgetData.student.amount.toLocaleString() }}</span>
            </div>
            <p class="text-xs text-sky-600 mt-1">{{ $t('budget.student_desc') }}</p>
          </div>

          <div class="bg-teal-50 rounded-lg p-4 border-l-4 border-teal-500">
            <div class="flex justify-between items-center mb-1">
              <span class="text-sm font-bold text-teal-700">{{ $t('budget.fun_diver') }}</span>
              <span class="font-mono font-bold text-teal-700 text-lg">~TWD {{ budgetData.funDiver.amount.toLocaleString() }}</span>
            </div>
            <p class="text-xs text-teal-600 mt-1">{{ $t('budget.fun_diver_desc') }}</p>
          </div>
        </div>
      </div>

      <!-- Precautions Card -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2">
          <i class="fa-solid fa-triangle-exclamation text-amber-500"></i>
          {{ $t('precautions.title') }}
        </h3>

        <ul class="space-y-4">
          <li
            v-for="item in precautionsData"
            :key="item.id"
            class="flex items-start gap-3"
          >
            <div class="bg-green-100 rounded-full p-1.5 mt-0.5">
              <i class="fa-solid fa-check text-green-600 text-xs"></i>
            </div>
            <div class="flex-1">
              <span class="font-bold text-slate-800 block">{{ $t(`precautions.items.${item.id}.title`) }}</span>
              <span class="text-sm text-slate-600">{{ $t(`precautions.items.${item.id}.desc`) }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { budgetData, precautionsData } from '@/data/infoData'
</script>
