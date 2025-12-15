<template>
  <div class="mb-4">
    <label class="block text-sm font-medium text-slate-700 mb-2">{{ label }}</label>
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      class="w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
      :class="[
        colorClass,
        modelValue ? 'font-medium' : 'text-slate-400'
      ]"
    >
      <option value="" disabled>{{ $t('status.select_flight') }}</option>
      <template v-if="isGrouped">
        <optgroup
          v-for="(group, date) in groupedFlights"
          :key="date"
          :label="formatGroupLabel(date)"
        >
          <option
            v-for="flight in group"
            :key="flight.value"
            :value="flight.value"
          >
            {{ flight.label }}
          </option>
        </optgroup>
      </template>
      <template v-else>
        <option
          v-for="flight in flights"
          :key="flight.value"
          :value="flight.value"
        >
          {{ flight.label }}
        </option>
      </template>
    </select>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  flights: {
    type: [Array, Object],
    required: true
  },
  label: {
    type: String,
    required: true
  },
  colorScheme: {
    type: String,
    default: 'blue',
    validator: (value) => ['blue', 'teal', 'emerald'].includes(value)
  },
  isGrouped: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])

const { t } = useI18n()

const colorClass = computed(() => {
  const colors = {
    blue: 'border-blue-300 focus:border-blue-500 focus:ring-blue-500',
    teal: 'border-teal-300 focus:border-teal-500 focus:ring-teal-500',
    emerald: 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500'
  }
  return colors[props.colorScheme]
})

const groupedFlights = computed(() => {
  if (!props.isGrouped) return {}
  return props.flights
})

const formatGroupLabel = (date) => {
  return `5/${date}`
}
</script>
