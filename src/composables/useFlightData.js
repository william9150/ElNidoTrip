import { ref, computed } from 'vue'

/**
 * Flight Data Composable
 * Manages flight data loading and processing from FlightData.json
 * Based on airline.html.old lines 300-387
 */
export default function useFlightData() {
  // Raw flight data from JSON
  const flightData = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  // Processed flight arrays
  const tpeOutboundFlights = ref([])
  const nrtOutboundFlights = ref([])
  const eniOutboundFlights = ref([])
  const eniInboundFlights = ref([])
  const tpeInboundFlights = ref([])
  const nrtInboundFlights = ref([])

  /**
   * Convert time string (HH:MM) to minutes since midnight
   * @param {string} timeStr - Time in HH:MM format
   * @returns {number} Minutes since midnight
   */
  function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number)
    return hours * 60 + minutes
  }

  /**
   * Load flight data from JSON file
   */
  async function loadFlightData() {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch('/FlightData.json')
      if (!response.ok) {
        throw new Error('Failed to load flight data')
      }
      flightData.value = await response.json()
      processFlightData()
    } catch (err) {
      console.error('Error loading flight data:', err)
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Process JSON data into the format needed by the app
   * Based on lines 312-387 from airline.html.old
   */
  function processFlightData() {
    if (!flightData.value) return

    // TPE -> MNL (Outbound: 2026/5/21)
    if (flightData.value['TPE-MNL'] && flightData.value['TPE-MNL']['2026/5/21']) {
      tpeOutboundFlights.value = flightData.value['TPE-MNL']['2026/5/21'].map((flight) => ({
        val: timeToMinutes(flight.arrival_time),
        label: `${flight.flight_number} | ${flight.departure_time}-${flight.arrival_time}`,
        days: ['21']
      }))
    }

    // NRT -> MNL (Outbound: 2026/5/20 - arrives 5/21)
    if (flightData.value['NRT-MNL'] && flightData.value['NRT-MNL']['2026/5/20']) {
      nrtOutboundFlights.value = flightData.value['NRT-MNL']['2026/5/20'].map((flight) => ({
        val: timeToMinutes(flight.arrival_time),
        label: `${flight.flight_number} | ${flight.departure_time}-${flight.arrival_time}`,
        days: ['-1'] // Previous day
      }))
    }

    // MNL -> ENI (Outbound: 2026/5/21)
    if (flightData.value['MNL-ENI'] && flightData.value['MNL-ENI']['2026/5/21']) {
      eniOutboundFlights.value = flightData.value['MNL-ENI']['2026/5/21'].map((flight) => ({
        val: timeToMinutes(flight.departure_time),
        label: `${flight.flight_number} | ${flight.departure_time}-${flight.arrival_time}`,
        days: ['21']
      }))
    }

    // ENI -> MNL (Inbound: 5/24 and 5/25)
    if (flightData.value['ENI-MNL']) {
      const dates = ['2026/5/24', '2026/5/25']
      const tempEniInbound = []

      dates.forEach((date, idx) => {
        if (flightData.value['ENI-MNL'][date]) {
          flightData.value['ENI-MNL'][date].forEach((flight) => {
            tempEniInbound.push({
              val: timeToMinutes(flight.arrival_time),
              dep: timeToMinutes(flight.departure_time),
              label: `${flight.flight_number} | ${flight.departure_time}-${flight.arrival_time}`,
              days: [idx === 0 ? '24' : '25']
            })
          })
        }
      })

      eniInboundFlights.value = tempEniInbound
    }

    // MNL -> TPE (Inbound: 5/24 and 5/25)
    if (flightData.value['MNL-TPE']) {
      const dates = ['2026/5/24', '2026/5/25']
      const tempTpeInbound = []

      dates.forEach((date, idx) => {
        if (flightData.value['MNL-TPE'][date]) {
          flightData.value['MNL-TPE'][date].forEach((flight) => {
            tempTpeInbound.push({
              val: timeToMinutes(flight.departure_time),
              label: `${flight.flight_number} | ${flight.departure_time}-${flight.arrival_time}`,
              days: [idx === 0 ? '24' : '25']
            })
          })
        }
      })

      tpeInboundFlights.value = tempTpeInbound
    }

    // MNL -> NRT (Inbound: 5/24 and 5/25)
    if (flightData.value['MNL-NRT']) {
      const dates = ['2026/5/24', '2026/5/25']
      const tempNrtInbound = []

      dates.forEach((date, idx) => {
        if (flightData.value['MNL-NRT'][date]) {
          flightData.value['MNL-NRT'][date].forEach((flight) => {
            tempNrtInbound.push({
              val: timeToMinutes(flight.departure_time),
              label: `${flight.flight_number} | ${flight.departure_time}-${flight.arrival_time}`,
              days: [idx === 0 ? '24' : '25']
            })
          })
        }
      })

      nrtInboundFlights.value = tempNrtInbound
    }
  }

  // Computed properties for easy access
  const hasData = computed(() => flightData.value !== null)

  return {
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
  }
}
