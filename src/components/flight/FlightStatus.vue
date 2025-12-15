<template>
  <div v-if="status" class="mt-2 flex items-center gap-2 text-sm">
    <span class="text-2xl">{{ status.icon }}</span>
    <span :class="status.colorClass" class="font-medium">
      {{ statusMessage }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  gapMinutes: {
    type: Number,
    default: null
  }
})

const { t } = useI18n()

const status = computed(() => {
  if (props.gapMinutes === null) return null

  const hours = Math.floor(Math.abs(props.gapMinutes) / 60)
  const mins = Math.abs(props.gapMinutes) % 60
  const timeStr = `${hours}h ${mins}m`

  if (props.gapMinutes < 0) {
    return {
      type: 'impossible',
      icon: '🚫',
      colorClass: 'text-red-500',
      time: null
    }
  } else if (props.gapMinutes < 150) {
    return {
      type: 'dangerous',
      icon: '⚡',
      colorClass: 'text-red-600',
      time: timeStr
    }
  } else if (props.gapMinutes < 240) {
    return {
      type: 'tight',
      icon: '✋',
      colorClass: 'text-orange-600',
      time: timeStr
    }
  } else if (props.gapMinutes > 600) {
    return {
      type: 'overnight',
      icon: '🔵',
      colorClass: 'text-blue-600',
      time: timeStr
    }
  } else {
    return {
      type: 'perfect',
      icon: '✨',
      colorClass: 'text-emerald-600',
      time: timeStr
    }
  }
})

const statusMessage = computed(() => {
  if (!status.value) return ''

  const key = `status.${status.value.type}`
  if (status.value.time) {
    return t(key) + ' ' + status.value.time
  }
  return t(key)
})
</script>
