<template>
  <div v-if="departureTime && safe24h && min18h" class="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
    <h4 class="font-semibold text-blue-900 mb-2">{{ $t('dive.title') }}</h4>
    <p class="text-sm text-blue-800 mb-3">{{ $t('dive.desc') }}</p>
    <div class="flex flex-wrap gap-3">
      <div class="bg-white px-3 py-2 rounded shadow-sm border border-blue-200">
        <div class="text-xs text-blue-600 font-semibold mb-1">{{ $t('dive.label_24h') }}</div>
        <div class="text-sm font-mono text-blue-900">5/{{ safe24h.date }} {{ safe24h.time }}</div>
      </div>
      <div class="bg-white px-3 py-2 rounded shadow-sm border border-blue-200">
        <div class="text-xs text-blue-600 font-semibold mb-1">{{ $t('dive.label_18h') }}</div>
        <div class="text-sm font-mono text-blue-900">5/{{ min18h.date }} {{ min18h.time }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  departureTime: {
    type: Number,
    default: null
  },
  returnDate: {
    type: String,
    default: '24'
  }
})

const safe24h = computed(() => {
  if (!props.departureTime) return null

  const dateMinus1 = props.returnDate === '25' ? '24' : '23'
  const hours = Math.floor(props.departureTime / 60)
  const mins = props.departureTime % 60

  return {
    date: dateMinus1,
    time: `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
  }
})

const min18h = computed(() => {
  if (!props.departureTime) return null

  let mins18 = props.departureTime + 360 // Add 6 hours
  let date18 = props.returnDate === '25' ? '24' : '23'

  // Handle day rollover
  if (mins18 >= 1440) {
    mins18 -= 1440
    date18 = props.returnDate
  }

  const hours = Math.floor(mins18 / 60)
  const mins = mins18 % 60

  return {
    date: date18,
    time: `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
  }
})
</script>
