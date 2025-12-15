<template>
  <section class="space-y-6">
    <!-- Day Cards - Vertical Layout with max width -->
    <div class="max-w-4xl mx-auto space-y-6">
      <DayCard
        v-for="dayKey in ['day1', 'day2', 'day3', 'day4']"
        :key="dayKey"
        :day-key="dayKey"
        :day-data="getDayData(dayKey)"
        :selected-plan="selectedPlan"
      />
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { itineraryData } from '@/data/itineraryData'
import DayCard from './DayCard.vue'

const props = defineProps({
  selectedPlan: {
    type: String,
    required: true
  }
})

const getDayData = (dayKey) => {
  const dayData = itineraryData[dayKey]

  // For days with plan variants (day2, day3), return the selected plan
  if (dayData.planA && dayData.planB) {
    return {
      ...dayData,
      activities: props.selectedPlan === 'A' ? dayData.planA.activities : dayData.planB.activities,
    }
  }

  return dayData
}
</script>
