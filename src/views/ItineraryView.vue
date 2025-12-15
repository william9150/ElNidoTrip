<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
    <!-- Plan Selector -->
    <section class="max-w-2xl mx-auto">
      <div class="flex bg-slate-100 p-1 rounded-lg">
        <button
          @click="selectedPlan = 'A'"
          :class="[
            'flex-1 py-3 px-4 text-sm font-bold rounded-md transition-all',
            selectedPlan === 'A'
              ? 'bg-white shadow text-sky-600'
              : 'text-slate-500 hover:text-slate-700'
          ]"
        >
          {{ $t('itinerary.plan_a') }}<br>
          <span class="font-normal text-xs text-slate-500">{{ $t('itinerary.plan_a_desc') }}</span>
        </button>
        <button
          @click="selectedPlan = 'B'"
          :class="[
            'flex-1 py-3 px-4 text-sm font-bold rounded-md transition-all',
            selectedPlan === 'B'
              ? 'bg-white shadow text-sky-600'
              : 'text-slate-500 hover:text-slate-700'
          ]"
        >
          {{ $t('itinerary.plan_b') }}<br>
          <span class="font-normal text-xs text-slate-500">{{ $t('itinerary.plan_b_desc') }}</span>
        </button>
      </div>
    </section>

    <!-- Schedule Section -->
    <ScheduleSection :selected-plan="selectedPlan" />
  </main>
</template>

<script setup>
import { ref } from 'vue'
import ScheduleSection from '@/components/itinerary/ScheduleSection.vue'

const selectedPlan = ref('A')
</script>
