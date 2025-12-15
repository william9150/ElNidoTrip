<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-slate-200 flex flex-col">
    <!-- Header -->
    <div class="p-4 border-b" :class="headerClass">
      <h3 class="text-xl font-bold" :class="titleClass">{{ $t(`shop.${shopKey}.name`) }}</h3>
      <div class="text-sm" :class="subtitleClass">{{ $t(`shop.${shopKey}.card_desc`) }}</div>
    </div>

    <!-- Details -->
    <div class="p-6 flex-1 space-y-4">
      <div class="detail-row">
        <span class="text-xs font-semibold text-slate-400 uppercase">{{ $t('details.boat_type') }}</span>
        <div class="text-slate-800 font-medium">{{ $t(`shop.${shopKey}.boat`) }}</div>
      </div>

      <div class="detail-row">
        <span class="text-xs font-semibold text-slate-400 uppercase">{{ $t('details.ratio') }}</span>
        <div class="text-slate-800 font-medium text-lg">
          {{ ratio }}
          <span v-if="showLowRatioBadge" class="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded ml-2">
            {{ $t('details.low_ratio') }}
          </span>
        </div>
      </div>

      <div class="detail-row">
        <span class="text-xs font-semibold text-slate-400 uppercase">{{ $t('details.jp_inst') }}</span>
        <div class="text-slate-800 font-medium flex items-center">
          <span :class="hasJapaneseInstructor ? 'text-green-600' : 'text-slate-400'" class="mr-2">●</span>
          <span>{{ hasJapaneseInstructor ? $t('details.yes') : $t('details.no') }}</span>
        </div>
      </div>

      <div class="detail-row">
        <span class="text-xs font-semibold text-slate-400 uppercase">{{ $t('details.aow_perk') }}</span>
        <div class="text-slate-800 font-medium">{{ $t(`shop.${shopKey}.aow_perk`) }}</div>
      </div>

      <div class="detail-row">
        <span class="text-xs font-semibold text-slate-400 uppercase">{{ $t('details.fees') }}</span>
        <div class="text-slate-800 font-medium">{{ fees }}</div>
      </div>
    </div>

    <!-- Footer Link -->
    <div class="p-4 bg-slate-50 border-t border-slate-100 mt-auto">
      <a
        :href="shopRawData[shopKey].url"
        target="_blank"
        class="font-medium text-sm flex items-center justify-center transition-colors"
        :class="linkClass"
        v-html="$t('details.view_site')"
      >
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { shopRawData } from '@/data/shopData'

const props = defineProps({
  shopKey: {
    type: String,
    required: true,
    validator: (value) => ['elDive', 'twoHundredBar', 'tabanka'].includes(value)
  },
  colorScheme: {
    type: String,
    default: 'sky',
    validator: (value) => ['sky', 'orange', 'emerald'].includes(value)
  }
})

const { t } = useI18n()

const colorClasses = {
  sky: {
    header: 'bg-sky-50 border-sky-100',
    title: 'text-sky-800',
    subtitle: 'text-sky-600',
    link: 'text-sky-600 hover:text-sky-800'
  },
  orange: {
    header: 'bg-orange-50 border-orange-100',
    title: 'text-orange-800',
    subtitle: 'text-orange-600',
    link: 'text-orange-600 hover:text-orange-800'
  },
  emerald: {
    header: 'bg-emerald-50 border-emerald-100',
    title: 'text-emerald-800',
    subtitle: 'text-emerald-600',
    link: 'text-emerald-600 hover:text-emerald-800'
  }
}

const headerClass = computed(() => colorClasses[props.colorScheme].header)
const titleClass = computed(() => colorClasses[props.colorScheme].title)
const subtitleClass = computed(() => colorClasses[props.colorScheme].subtitle)
const linkClass = computed(() => colorClasses[props.colorScheme].link)

const ratio = computed(() => {
  const ratios = {
    elDive: '2:1',
    twoHundredBar: '4:1',
    tabanka: '4:1'
  }
  return ratios[props.shopKey]
})

const showLowRatioBadge = computed(() => props.shopKey === 'elDive')

const hasJapaneseInstructor = computed(() => props.shopKey === 'elDive')

const fees = computed(() => {
  const feeMap = {
    elDive: t('details.undocumented'),
    twoHundredBar: t('details.cash_0'),
    tabanka: t('details.card_6')
  }
  return feeMap[props.shopKey]
})
</script>

<style scoped>
.detail-row {
  @apply flex flex-col gap-1;
}
</style>
