import { ref } from 'vue'

/**
 * Flight Calculator Composable
 * Calculates connection gaps and determines status between flights
 * Based on airline.html.old lines 570-685
 */
export default function useFlightCalculator() {
  /**
   * Calculate connection gap between two flights
   * @param {Object} params - Parameters for gap calculation
   * @param {number} params.arrivalTime - Arrival time in minutes
   * @param {number} params.departureTime - Departure time in minutes
   * @param {string} params.arrivalDate - Arrival date (e.g., '24')
   * @param {string} params.departureDate - Departure date (e.g., '24' or '25')
   * @param {boolean} params.isPreviousDay - Whether arrival is from previous day
   * @returns {number} Gap in minutes
   */
  function calculateGap({ arrivalTime, departureTime, arrivalDate, departureDate, isPreviousDay = false }) {
    let gap

    // Handle previous day arrivals (e.g., NRT flights arriving day after departure)
    if (isPreviousDay) {
      gap = 1440 - arrivalTime + departureTime
    } else if (arrivalDate === departureDate) {
      // Same day connection
      gap = departureTime - arrivalTime
    } else {
      // Next day connection (overnight)
      gap = 1440 - arrivalTime + departureTime
    }

    return gap
  }

  /**
   * Determine connection status based on gap duration
   * @param {number} gapMinutes - Gap in minutes
   * @returns {Object} Status object with type, icon, and color
   */
  function getConnectionStatus(gapMinutes) {
    const hours = Math.floor(gapMinutes / 60)
    const mins = gapMinutes % 60
    const timeStr = `${hours}h${mins}m`

    if (gapMinutes < 0) {
      return {
        type: 'impossible',
        icon: '🚫',
        colorClass: 'text-red-500 font-bold',
        timeStr,
        key: 'status.impossible'
      }
    } else if (gapMinutes < 150) {
      // < 2.5h
      return {
        type: 'dangerous',
        icon: '⚡',
        colorClass: 'text-red-600 font-bold',
        timeStr,
        key: 'status.dangerous'
      }
    } else if (gapMinutes < 240) {
      // < 4h
      return {
        type: 'tight',
        icon: '✋',
        colorClass: 'text-orange-600 font-bold',
        timeStr,
        key: 'status.tight'
      }
    } else if (gapMinutes > 600) {
      // > 10h
      return {
        type: 'overnight',
        icon: '🔵',
        colorClass: 'text-blue-600 font-bold',
        timeStr,
        key: 'status.overnight'
      }
    } else {
      return {
        type: 'perfect',
        icon: '✨',
        colorClass: 'text-emerald-600 font-bold',
        timeStr,
        key: 'status.perfect'
      }
    }
  }

  /**
   * Format status message based on connection status
   * @param {Object} status - Status object from getConnectionStatus
   * @param {Object} translations - Translation object with status messages
   * @returns {string} Formatted status message
   */
  function formatStatusMessage(status, translations) {
    if (!translations || !translations.status) {
      return `${status.icon} ${status.timeStr}`
    }

    const statusText = translations.status[status.type]

    if (status.type === 'impossible') {
      return `${status.icon} ${statusText}`
    } else if (status.type === 'dangerous') {
      // Replace placeholder in translation (僅/のみ) with timeStr
      return `${status.icon} ${statusText.replace('僅', status.timeStr).replace('のみ', status.timeStr)}`
    } else {
      return `${status.icon} ${status.timeStr} ${statusText}`
    }
  }

  /**
   * Format time from minutes to HH:MM
   * @param {number} minutes - Minutes since midnight
   * @returns {string} Time in HH:MM format
   */
  function formatTime(minutes) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
  }

  /**
   * Calculate outbound connection gap
   * @param {number} arrivalTime - International flight arrival time (minutes)
   * @param {number} departureTime - ENI flight departure time (minutes)
   * @param {boolean} isPreviousDay - Whether international flight departs previous day
   * @returns {Object} Gap and status information
   */
  function calculateOutboundGap(arrivalTime, departureTime, isPreviousDay = false) {
    const gap = calculateGap({
      arrivalTime,
      departureTime,
      arrivalDate: '21',
      departureDate: '21',
      isPreviousDay
    })

    const status = getConnectionStatus(gap)

    return {
      gap,
      status,
      arrivalTime,
      departureTime
    }
  }

  /**
   * Calculate inbound connection gap
   * @param {number} eniArrivalTime - ENI flight arrival time (minutes)
   * @param {number} departureTime - International flight departure time (minutes)
   * @param {string} eniDate - ENI arrival date ('24' or '25')
   * @param {string} departureDate - International departure date ('24' or '25')
   * @returns {Object} Gap and status information
   */
  function calculateInboundGap(eniArrivalTime, departureTime, eniDate, departureDate) {
    const gap = calculateGap({
      arrivalTime: eniArrivalTime,
      departureTime,
      arrivalDate: eniDate,
      departureDate,
      isPreviousDay: false
    })

    const status = getConnectionStatus(gap)

    return {
      gap,
      status,
      eniArrivalTime,
      departureTime,
      eniDate,
      departureDate
    }
  }

  return {
    // Methods
    calculateGap,
    getConnectionStatus,
    formatStatusMessage,
    formatTime,
    calculateOutboundGap,
    calculateInboundGap
  }
}
