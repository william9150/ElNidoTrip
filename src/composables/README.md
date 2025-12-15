# Flight Composables

This directory contains Vue 3 composables for managing flight data, calculations, and dive safety warnings.

## Composables

### useFlightData.js
Manages flight data loading and processing from FlightData.json.

**Features:**
- Fetches flight data from `/FlightData.json`
- Processes raw data into usable format
- Provides reactive refs for different flight routes
- Includes `timeToMinutes` helper function

**Usage:**
```javascript
import useFlightData from '@/composables/useFlightData'

const {
  // State
  flightData,
  isLoading,
  error,
  hasData,

  // Processed flights
  tpeOutboundFlights,
  nrtOutboundFlights,
  eniOutboundFlights,
  eniInboundFlights,
  tpeInboundFlights,
  nrtInboundFlights,

  // Methods
  loadFlightData,
  timeToMinutes
} = useFlightData()

// Load data on component mount
onMounted(() => {
  loadFlightData()
})
```

### useFlightCalculator.js
Calculates connection gaps and determines status between flights.

**Features:**
- Calculate connection gap between flights
- Determine status (impossible, dangerous, tight, perfect, overnight)
- Format time display
- Handle overnight connections and date boundaries

**Usage:**
```javascript
import useFlightCalculator from '@/composables/useFlightCalculator'

const {
  calculateGap,
  getConnectionStatus,
  formatStatusMessage,
  formatTime,
  calculateOutboundGap,
  calculateInboundGap
} = useFlightCalculator()

// Calculate outbound connection
const result = calculateOutboundGap(
  arrivalTime,    // in minutes
  departureTime,  // in minutes
  isPreviousDay   // boolean
)

console.log(result.gap)      // Gap in minutes
console.log(result.status)   // Status object with type, icon, colorClass
```

**Connection Status Types:**
- `impossible` - Negative gap (flight already departed)
- `dangerous` - < 2.5 hours (極危險)
- `tight` - < 4 hours (稍趕)
- `perfect` - 4-10 hours (完美)
- `overnight` - > 10 hours (需過夜)

### useDiveWarning.js
Calculates safe dive times based on 24-hour and 18-hour rules.

**Features:**
- Calculate safe dive times (24-hour and 18-hour rules)
- Handle date rollover
- Format warning messages for display

**Usage:**
```javascript
import useDiveWarning from '@/composables/useDiveWarning'

const {
  // State
  showWarning,
  safeTime24h,
  safeTime18h,
  currentReturnDate,
  diveTimesData,

  // Methods
  calculateSafeDiveTimes,
  formatDiveWarning,
  clearWarning
} = useDiveWarning()

// Calculate safe dive times
const safeTimes = calculateSafeDiveTimes(
  departureMinutes,  // Flight departure in minutes
  returnDate         // '24' or '25'
)

console.log(safeTimes.time24h)  // { date, time, minutes }
console.log(safeTimes.time18h)  // { date, time, minutes }

// Format for display
const warningHTML = formatDiveWarning(translations)
```

## Example: Complete Flight Page Integration

```vue
<script setup>
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import useFlightData from '@/composables/useFlightData'
import useFlightCalculator from '@/composables/useFlightCalculator'
import useDiveWarning from '@/composables/useDiveWarning'

const { t } = useI18n()

// Initialize composables
const flightData = useFlightData()
const calculator = useFlightCalculator()
const diveWarning = useDiveWarning()

// Selected flights
const selectedTPEOut = ref(null)
const selectedNRTOut = ref(null)
const selectedENIOut = ref(null)
const selectedENIIn = ref(null)
const selectedTPEIn = ref(null)
const selectedNRTIn = ref(null)

// Return date
const returnDate = ref('24')

// Load flight data on mount
onMounted(() => {
  flightData.loadFlightData()
})

// Watch for ENI inbound flight selection to show dive warning
watch(selectedENIIn, (newVal) => {
  if (newVal && newVal.dep) {
    diveWarning.calculateSafeDiveTimes(newVal.dep, returnDate.value)
  } else {
    diveWarning.clearWarning()
  }
})

// Calculate outbound connection
const outboundTPEGap = computed(() => {
  if (!selectedTPEOut.value || !selectedENIOut.value) return null

  return calculator.calculateOutboundGap(
    selectedTPEOut.value.val,
    selectedENIOut.value.val,
    false
  )
})

// Calculate inbound connection
const inboundTPEGap = computed(() => {
  if (!selectedENIIn.value || !selectedTPEIn.value) return null

  return calculator.calculateInboundGap(
    selectedENIIn.value.val,
    selectedTPEIn.value.val,
    returnDate.value,
    selectedTPEIn.value.date
  )
})
</script>

<template>
  <div>
    <!-- Flight selectors -->
    <select v-model="selectedTPEOut">
      <option
        v-for="flight in flightData.tpeOutboundFlights.value"
        :key="flight.label"
        :value="flight"
      >
        {{ flight.label }}
      </option>
    </select>

    <!-- Connection status display -->
    <div v-if="outboundTPEGap">
      <span :class="outboundTPEGap.status.colorClass">
        {{ outboundTPEGap.status.icon }}
        {{ calculator.formatStatusMessage(outboundTPEGap.status, t) }}
      </span>
    </div>

    <!-- Dive warning display -->
    <div v-if="diveWarning.showWarning.value" v-html="diveWarning.formatDiveWarning(t)" />
  </div>
</template>
```

## Migration from airline.html.old

These composables extract the following logic:

1. **useFlightData.js** - Lines 300-387
   - `loadFlightData()` function
   - `processFlightData()` function
   - `timeToMinutes()` helper

2. **useFlightCalculator.js** - Lines 570-685
   - `updateStatus()` function logic
   - `calculate()` function logic
   - Connection gap calculation with date awareness

3. **useDiveWarning.js** - Lines 510-568
   - `updateDiveWarning()` function
   - 24-hour and 18-hour safe dive time calculations
   - Date rollover handling
