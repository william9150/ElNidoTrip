import { ref, computed } from 'vue'

/**
 * Dive Warning Composable
 * Calculates safe dive times based on 24-hour and 18-hour rules
 * Based on airline.html.old lines 510-568
 */
export default function useDiveWarning() {
  const showWarning = ref(false)
  const safeTime24h = ref(null)
  const safeTime18h = ref(null)
  const currentReturnDate = ref('24')

  /**
   * Calculate safe dive times based on flight departure
   * @param {number} departureMinutes - Flight departure time in minutes since midnight
   * @param {string} returnDate - Return date ('24' or '25')
   * @returns {Object} Safe dive times for 24h and 18h rules
   */
  function calculateSafeDiveTimes(departureMinutes, returnDate) {
    if (isNaN(departureMinutes)) {
      return null
    }

    currentReturnDate.value = returnDate

    // Date logic
    const dateMinus1 = returnDate === '25' ? '24' : '23' // Day X-1
    const dateCurrent = returnDate // Day X

    // 1. Calculate 24h Safe Time (Day X-1 same time)
    // Safe to dive until this time on the day before flight
    const h24 = Math.floor(departureMinutes / 60)
    const m24 = departureMinutes % 60
    const timeStr24 = `${h24.toString().padStart(2, '0')}:${m24.toString().padStart(2, '0')}`

    // 2. Calculate 18h Minimum Time (Day X-1 same time + 6 hours)
    // 18 hours before flight = (Flight Time - 24h) + 6h
    // This is the absolute minimum time to finish diving
    let mins18 = departureMinutes + 360 // Add 6 hours (360 minutes)
    let date18 = dateMinus1

    // Handle rollover to next day
    // If flight is late evening, 18h before might be early morning of flight day
    if (mins18 >= 1440) {
      mins18 -= 1440
      date18 = dateCurrent
    }

    const h18 = Math.floor(mins18 / 60)
    const m18 = mins18 % 60
    const timeStr18 = `${h18.toString().padStart(2, '0')}:${m18.toString().padStart(2, '0')}`

    safeTime24h.value = {
      date: dateMinus1,
      time: timeStr24,
      minutes: departureMinutes
    }

    safeTime18h.value = {
      date: date18,
      time: timeStr18,
      minutes: mins18
    }

    showWarning.value = true

    return {
      time24h: {
        date: dateMinus1,
        time: timeStr24,
        minutes: departureMinutes
      },
      time18h: {
        date: date18,
        time: timeStr18,
        minutes: mins18
      }
    }
  }

  /**
   * Format dive warning message for display
   * @param {Object} translations - Translation object
   * @returns {string} HTML formatted warning message
   */
  function formatDiveWarning(translations) {
    if (!safeTime24h.value || !safeTime18h.value || !translations) {
      return ''
    }

    const data = translations.dive || {}

    return `
      <div class="flex flex-col gap-2">
        <div class="text-slate-600">${data.desc || ''}</div>
        <div class="flex flex-wrap gap-3">
          <div class="bg-blue-100 text-blue-900 px-3 py-2 rounded-md border border-blue-200">
            <span class="text-xs uppercase font-bold tracking-wider opacity-70 block">
              ${data.label_24h || '24小時前 (推薦)'}
            </span>
            <span class="font-bold text-lg">5/${safeTime24h.value.date} ${safeTime24h.value.time}</span>
          </div>
          <div class="bg-orange-100 text-orange-900 px-3 py-2 rounded-md border border-orange-200">
            <span class="text-xs uppercase font-bold tracking-wider opacity-70 block">
              ${data.label_18h || '18小時前 (最低)'}
            </span>
            <span class="font-bold text-lg">5/${safeTime18h.value.date} ${safeTime18h.value.time}</span>
          </div>
        </div>
      </div>
    `
  }

  /**
   * Clear dive warning
   */
  function clearWarning() {
    showWarning.value = false
    safeTime24h.value = null
    safeTime18h.value = null
  }

  /**
   * Get dive times as structured data (useful for components)
   * @returns {Object|null} Structured dive times or null
   */
  const diveTimesData = computed(() => {
    if (!safeTime24h.value || !safeTime18h.value) {
      return null
    }

    return {
      recommended: {
        date: safeTime24h.value.date,
        time: safeTime24h.value.time,
        minutes: safeTime24h.value.minutes,
        label: '24h'
      },
      minimum: {
        date: safeTime18h.value.date,
        time: safeTime18h.value.time,
        minutes: safeTime18h.value.minutes,
        label: '18h'
      }
    }
  })

  return {
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
  }
}
