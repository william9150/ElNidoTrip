<template>
  <section class="mb-10 relative">
    <!-- Side accent bar -->
    <div class="absolute -left-4 top-0 bottom-0 w-1 bg-blue-500 rounded-full hidden md:block"></div>

    <!-- Section header -->
    <div class="flex items-center mb-6">
      <div class="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 shadow-lg">
        1
      </div>
      <h2 class="text-2xl font-bold text-slate-700">
        {{ $t('outbound.title') }}
      </h2>
    </div>

    <!-- Flight selectors grid -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
      <!-- TPE Flight Card -->
      <div class="md:col-span-4 card bg-white p-5 rounded-xl shadow-sm border border-slate-200">
        <label class="block text-sm font-semibold text-slate-500 mb-2">
          {{ $t('outbound.tpe_label') }}
        </label>
        <select
          v-model="selectedTpeFlight"
          class="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3"
        >
          <option value="" disabled>{{ $t('status.select_flight') }}</option>
          <option
            v-for="flight in tpeOutboundFlights"
            :key="flight.label"
            :value="flight.val"
          >
            {{ flight.label }}
          </option>
        </select>
        <FlightStatus
          v-if="tpeConnectionGap !== null"
          :gap-minutes="tpeConnectionGap"
          class="mt-3"
        />
      </div>

      <!-- NRT Flight Card -->
      <div class="md:col-span-4 card bg-white p-5 rounded-xl shadow-sm border border-slate-200">
        <label class="block text-sm font-semibold text-slate-500 mb-2">
          {{ $t('outbound.nrt_label') }}
        </label>
        <select
          v-model="selectedNrtFlight"
          class="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3"
        >
          <option value="" disabled>{{ $t('status.select_flight') }}</option>
          <option
            v-for="flight in nrtOutboundFlights"
            :key="flight.label"
            :value="flight.val"
            data-day="-1"
          >
            {{ flight.label }}
          </option>
        </select>
        <FlightStatus
          v-if="nrtConnectionGap !== null"
          :gap-minutes="nrtConnectionGap"
          class="mt-3"
        />
      </div>

      <!-- Shared AirSWIFT Card -->
      <div class="md:col-span-4 card bg-blue-50 p-5 rounded-xl shadow-md border border-blue-200 ring-2 ring-blue-100 relative">
        <!-- Meeting point badge -->
        <div class="absolute -top-3 -right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-bold shadow-sm">
          {{ $t('outbound.meeting_point') }}
        </div>

        <label class="block text-sm font-bold text-blue-800 mb-2">
          {{ $t('outbound.eni_label') }}
        </label>
        <select
          v-model="selectedEniFlight"
          class="w-full bg-white border border-blue-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3"
        >
          <option value="" disabled>{{ $t('status.select_flight') }}</option>
          <option
            v-for="flight in eniOutboundFlights"
            :key="flight.label"
            :value="flight.val"
          >
            {{ flight.label }}
          </option>
        </select>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import FlightStatus from './FlightStatus.vue'
import useFlightData from '@/composables/useFlightData'
import useFlightCalculator from '@/composables/useFlightCalculator'

const { t } = useI18n()

// Get flight data from composable
const {
  tpeOutboundFlights,
  nrtOutboundFlights,
  eniOutboundFlights
} = useFlightData()

// Get calculator functions
const { calculateOutboundGap } = useFlightCalculator()

// Selected flight values (in minutes)
const selectedTpeFlight = ref('')
const selectedNrtFlight = ref('')
const selectedEniFlight = ref('')

// Connection gap calculations
const tpeConnectionGap = computed(() => {
  if (!selectedTpeFlight.value || !selectedEniFlight.value) {
    return null
  }

  const result = calculateOutboundGap(
    parseInt(selectedTpeFlight.value),
    parseInt(selectedEniFlight.value),
    false // TPE flights arrive same day
  )

  return result.gap
})

const nrtConnectionGap = computed(() => {
  if (!selectedNrtFlight.value || !selectedEniFlight.value) {
    return null
  }

  // NRT flights depart previous day and arrive on 5/21
  const result = calculateOutboundGap(
    parseInt(selectedNrtFlight.value),
    parseInt(selectedEniFlight.value),
    true // NRT flights depart previous day
  )

  return result.gap
})

// Expose selected flights for parent component if needed
defineExpose({
  selectedTpeFlight,
  selectedNrtFlight,
  selectedEniFlight,
  tpeConnectionGap,
  nrtConnectionGap
})
</script>

<style scoped>
/* Card hover effect */
.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Custom select styling */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
  -webkit-appearance: none;
  appearance: none;
}
</style>
