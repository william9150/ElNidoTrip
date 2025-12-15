<template>
  <section class="mb-12 relative">
    <!-- Side accent bar -->
    <div class="absolute -left-4 top-0 bottom-0 w-1 bg-teal-500 rounded-full hidden md:block"></div>

    <!-- Section header with date toggle -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-6">
      <div class="flex items-center mb-4 md:mb-0">
        <div class="bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 shadow-lg">
          2
        </div>
        <div>
          <span class="text-sm font-bold text-slate-500 mr-2">
            {{ $t('inbound.title_prefix') }}
          </span>
          <div class="bg-slate-200 p-1 rounded-lg inline-flex">
            <button
              @click="updateReturnDate('24')"
              :class="['tab-btn', { active: returnDate === '24' }]"
              class="px-4 py-2 rounded-md font-medium text-slate-600 hover:bg-white text-sm shadow-sm"
            >
              {{ $t('inbound.date_24') }}
            </button>
            <button
              @click="updateReturnDate('25')"
              :class="['tab-btn', { active: returnDate === '25' }]"
              class="px-4 py-2 rounded-md font-medium text-slate-600 hover:bg-white text-sm"
            >
              {{ $t('inbound.date_25') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Dive Safety Warning -->
    <DiveWarning
      v-if="selectedEniDepartureTime"
      :departure-time="selectedEniDepartureTime"
      :return-date="returnDate"
      class="mb-6"
    />

    <!-- Flight selectors grid -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
      <!-- Shared AirSWIFT Inbound Card -->
      <div class="md:col-span-4 card bg-teal-50 p-5 rounded-xl shadow-md border border-teal-200 ring-2 ring-teal-100 relative">
        <!-- Departure point badge -->
        <div class="absolute -top-3 -left-3 bg-teal-600 text-white text-xs px-2 py-1 rounded-full font-bold shadow-sm">
          {{ $t('inbound.departure_point') }}
        </div>

        <label class="block text-sm font-bold text-teal-800 mb-2">
          {{ $t('inbound.eni_label') }}
        </label>
        <select
          v-model="selectedEniFlight"
          class="w-full bg-white border border-teal-300 text-slate-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-3"
        >
          <option value="" disabled>{{ $t('status.select_flight') }}</option>
          <option
            v-for="flight in filteredEniInboundFlights"
            :key="flight.label"
            :value="flight.val"
            :data-dep="flight.dep"
            :data-date="returnDate"
          >
            {{ flight.label }}
          </option>
        </select>
      </div>

      <!-- TPE Flight Inbound Card -->
      <div class="md:col-span-4 card bg-white p-5 rounded-xl shadow-sm border border-slate-200">
        <label class="block text-sm font-semibold text-slate-500 mb-2">
          {{ $t('inbound.tpe_label') }}
        </label>
        <select
          v-model="selectedTpeFlight"
          class="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3"
        >
          <option value="" disabled>{{ $t('status.select_flight') }}</option>
          <template v-if="shouldShowExtended">
            <!-- Day 1 flights -->
            <optgroup :label="`5/${returnDate}`">
              <option
                v-for="flight in tpeFlightsDay1"
                :key="flight.label"
                :value="flight.val"
                :data-date="returnDate"
              >
                {{ flight.label }}
              </option>
            </optgroup>
            <!-- Day 2 flights (next day) -->
            <optgroup v-if="tpeFlightsDay2.length > 0" :label="`5/${nextDay}`">
              <option
                v-for="flight in tpeFlightsDay2"
                :key="flight.label"
                :value="flight.val"
                :data-date="nextDay"
              >
                {{ flight.label }}
              </option>
            </optgroup>
          </template>
          <template v-else>
            <option
              v-for="flight in tpeFlightsDay1"
              :key="flight.label"
              :value="flight.val"
              :data-date="returnDate"
            >
              {{ flight.label }}
            </option>
          </template>
        </select>
        <FlightStatus
          v-if="tpeConnectionGap !== null"
          :gap-minutes="tpeConnectionGap"
          class="mt-3"
        />
      </div>

      <!-- NRT Flight Inbound Card -->
      <div class="md:col-span-4 card bg-white p-5 rounded-xl shadow-sm border border-slate-200">
        <label class="block text-sm font-semibold text-slate-500 mb-2">
          {{ $t('inbound.nrt_label') }}
        </label>
        <select
          v-model="selectedNrtFlight"
          class="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3"
        >
          <option value="" disabled>{{ $t('status.select_flight') }}</option>
          <template v-if="shouldShowExtended">
            <!-- Day 1 flights -->
            <optgroup :label="`5/${returnDate}`">
              <option
                v-for="flight in nrtFlightsDay1"
                :key="flight.label"
                :value="flight.val"
                :data-date="returnDate"
              >
                {{ flight.label }}
              </option>
            </optgroup>
            <!-- Day 2 flights (next day) -->
            <optgroup v-if="nrtFlightsDay2.length > 0" :label="`5/${nextDay}`">
              <option
                v-for="flight in nrtFlightsDay2"
                :key="flight.label"
                :value="flight.val"
                :data-date="nextDay"
              >
                {{ flight.label }}
              </option>
            </optgroup>
          </template>
          <template v-else>
            <option
              v-for="flight in nrtFlightsDay1"
              :key="flight.label"
              :value="flight.val"
              :data-date="returnDate"
            >
              {{ flight.label }}
            </option>
          </template>
        </select>
        <FlightStatus
          v-if="nrtConnectionGap !== null"
          :gap-minutes="nrtConnectionGap"
          class="mt-3"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import FlightStatus from './FlightStatus.vue'
import DiveWarning from './DiveWarning.vue'
import useFlightData from '@/composables/useFlightData'
import useFlightCalculator from '@/composables/useFlightCalculator'

const { t } = useI18n()

// Props and emits
const props = defineProps({
  returnDate: {
    type: String,
    default: '24',
    validator: (value) => ['24', '25'].includes(value)
  }
})

const emit = defineEmits(['update:returnDate'])

// Get flight data from composable
const {
  eniInboundFlights,
  tpeInboundFlights,
  nrtInboundFlights
} = useFlightData()

// Get calculator functions
const { calculateInboundGap } = useFlightCalculator()

// Selected flight values
const selectedEniFlight = ref('')
const selectedTpeFlight = ref('')
const selectedNrtFlight = ref('')

// Selected flight dates (for tracking which day the international flight is on)
const selectedTpeDate = ref(props.returnDate)
const selectedNrtDate = ref(props.returnDate)

// Update return date
const updateReturnDate = (date) => {
  emit('update:returnDate', date)
  // Reset selections when date changes
  selectedEniFlight.value = ''
  selectedTpeFlight.value = ''
  selectedNrtFlight.value = ''
  selectedTpeDate.value = date
  selectedNrtDate.value = date
}

// Watch for return date changes from parent
watch(() => props.returnDate, (newDate) => {
  selectedTpeDate.value = newDate
  selectedNrtDate.value = newDate
})

// Computed properties for filtered flights
const filteredEniInboundFlights = computed(() => {
  return eniInboundFlights.value.filter(flight =>
    flight.days.includes(props.returnDate)
  )
})

// Calculate next day
const nextDay = computed(() => {
  return props.returnDate === '24' ? '25' : '26'
})

// Should show extended flights (allow next day for 24th)
const shouldShowExtended = computed(() => {
  return props.returnDate === '24'
})

// Split TPE flights by day
const tpeFlightsDay1 = computed(() => {
  return tpeInboundFlights.value.filter(flight =>
    flight.days.includes(props.returnDate)
  ).sort((a, b) => a.val - b.val)
})

const tpeFlightsDay2 = computed(() => {
  if (!shouldShowExtended.value) return []
  return tpeInboundFlights.value.filter(flight =>
    flight.days.includes(nextDay.value)
  ).sort((a, b) => a.val - b.val)
})

// Split NRT flights by day
const nrtFlightsDay1 = computed(() => {
  return nrtInboundFlights.value.filter(flight =>
    flight.days.includes(props.returnDate)
  ).sort((a, b) => a.val - b.val)
})

const nrtFlightsDay2 = computed(() => {
  if (!shouldShowExtended.value) return []
  return nrtInboundFlights.value.filter(flight =>
    flight.days.includes(nextDay.value)
  ).sort((a, b) => a.val - b.val)
})

// Get ENI departure time for dive warning
const selectedEniDepartureTime = computed(() => {
  if (!selectedEniFlight.value) return null

  const selectedFlight = filteredEniInboundFlights.value.find(
    flight => flight.val === parseInt(selectedEniFlight.value)
  )

  return selectedFlight ? selectedFlight.dep : null
})

// Track selected flight dates from select elements
watch(selectedTpeFlight, (newVal) => {
  if (newVal) {
    // Check if it's from day 2
    const isDay2 = tpeFlightsDay2.value.some(flight => flight.val === parseInt(newVal))
    selectedTpeDate.value = isDay2 ? nextDay.value : props.returnDate
  }
})

watch(selectedNrtFlight, (newVal) => {
  if (newVal) {
    // Check if it's from day 2
    const isDay2 = nrtFlightsDay2.value.some(flight => flight.val === parseInt(newVal))
    selectedNrtDate.value = isDay2 ? nextDay.value : props.returnDate
  }
})

// Connection gap calculations
const tpeConnectionGap = computed(() => {
  if (!selectedEniFlight.value || !selectedTpeFlight.value) {
    return null
  }

  const result = calculateInboundGap(
    parseInt(selectedEniFlight.value),
    parseInt(selectedTpeFlight.value),
    props.returnDate,
    selectedTpeDate.value
  )

  return result.gap
})

const nrtConnectionGap = computed(() => {
  if (!selectedEniFlight.value || !selectedNrtFlight.value) {
    return null
  }

  const result = calculateInboundGap(
    parseInt(selectedEniFlight.value),
    parseInt(selectedNrtFlight.value),
    props.returnDate,
    selectedNrtDate.value
  )

  return result.gap
})

// Expose for parent component if needed
defineExpose({
  selectedEniFlight,
  selectedTpeFlight,
  selectedNrtFlight,
  selectedEniDepartureTime,
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

/* Tab button styling */
.tab-btn {
  transition: all 0.2s;
  border-bottom: 3px solid transparent;
}

.tab-btn.active {
  border-color: #0d9488;
  color: #0f766e;
  background-color: #f0fdfa;
}

/* Optgroup styling */
optgroup {
  font-weight: bold;
  color: #475569;
}
</style>
