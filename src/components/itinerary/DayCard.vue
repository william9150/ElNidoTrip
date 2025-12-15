<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <!-- Card Header -->
    <div
      :class="[
        'p-4 border-b-4',
        getColorClasses(dayData.color)
      ]"
    >
      <div class="flex justify-between items-start">
        <div>
          <h3 class="text-lg font-bold text-slate-800">
            Day {{ dayKey.slice(-1) }} - {{ dayData.date }}
          </h3>
          <p :class="`text-sm font-medium text-${dayData.color}-600`">
            {{ $t(`itinerary.${dayKey}.title`) }}
          </p>
          <p v-if="dayData.subtitle || selectedPlan" class="text-xs text-slate-500 mt-1">
            {{ getSubtitle() }}
          </p>
        </div>
        <div v-if="dayData.noFly" class="text-red-500">
          <i class="fa-solid fa-plane-slash text-2xl"></i>
        </div>
      </div>
    </div>

    <!-- Activities List -->
    <div class="p-4 space-y-3">
      <div
        v-for="(activity, index) in dayData.activities"
        :key="index"
        :class="[
          'p-3 rounded-lg border-l-4',
          activity.nightDive
            ? 'bg-slate-800 border-purple-500'
            : activity.highlight
            ? 'bg-blue-50 border-blue-500'
            : 'bg-slate-50 border-slate-300'
        ]"
      >
        <div class="flex items-start gap-2">
          <i
            v-if="activity.icon"
            :class="[
              'fa-solid fa-' + activity.icon,
              'mt-0.5',
              activity.nightDive ? 'text-purple-400' : 'text-slate-400'
            ]"
          ></i>
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span
                :class="[
                  'text-xs font-mono font-bold',
                  activity.nightDive ? 'text-slate-400' : 'text-slate-500'
                ]"
              >
                {{ activity.time }}
              </span>
            </div>
            <h4
              :class="[
                'font-bold mt-1',
                activity.nightDive ? 'text-white' : 'text-slate-800'
              ]"
            >
              {{ $t(`itinerary.${dayKey}.activities.${activity.key}.title`) }}
            </h4>
            <p
              v-if="hasDescription(activity)"
              :class="[
                'text-sm mt-1',
                activity.nightDive ? 'text-slate-300' : 'text-slate-600'
              ]"
            >
              {{ $t(`itinerary.${dayKey}.activities.${activity.key}.desc`) }}
            </p>
            <ul
              v-if="activity.hasItems"
              :class="[
                'text-sm mt-2 space-y-1',
                activity.nightDive ? 'text-slate-300' : 'text-slate-600'
              ]"
            >
              <li
                v-for="(item, idx) in getActivityItems(activity)"
                :key="idx"
                class="flex items-start gap-2"
              >
                <span class="text-slate-400">•</span>
                <span v-if="activity.itemHighlight !== undefined && idx === activity.itemHighlight">
                  <span class="bg-yellow-200 px-1 rounded text-slate-800">重點</span> {{ item }}
                </span>
                <span v-else>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const props = defineProps({
  dayKey: {
    type: String,
    required: true
  },
  dayData: {
    type: Object,
    required: true
  },
  selectedPlan: {
    type: String,
    required: true
  }
})

const { t } = useI18n()

const getColorClasses = (color) => {
  const colorMap = {
    blue: 'bg-blue-50 border-blue-500',
    indigo: 'bg-indigo-50 border-indigo-500',
    purple: 'bg-purple-50 border-purple-500',
    red: 'bg-red-50 border-red-500'
  }
  return colorMap[color] || 'bg-slate-50 border-slate-300'
}

const getSubtitle = () => {
  if (props.dayData.subtitle) {
    return t(`itinerary.${props.dayKey}.subtitle`)
  }

  // For day2 and day3, show plan-specific subtitle
  if (props.dayKey === 'day2' || props.dayKey === 'day3') {
    const planKey = props.selectedPlan === 'A' ? 'plan_a_subtitle' : 'plan_b_subtitle'
    return t(`itinerary.${props.dayKey}.${planKey}`)
  }

  return ''
}

const hasDescription = (activity) => {
  const key = `itinerary.${props.dayKey}.activities.${activity.key}.desc`
  const translation = t(key)
  return translation !== key // If translation exists, it won't return the key itself
}

const getActivityItems = (activity) => {
  const key = `itinerary.${props.dayKey}.activities.${activity.key}.items`
  const items = t(key)
  return Array.isArray(items) ? items : []
}
</script>
