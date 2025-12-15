<template>
  <section class="bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-slate-100">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-slate-800 mb-3">{{ $t('concierge.h2') }}</h2>
        <p class="text-slate-600 whitespace-pre-line">{{ $t('concierge.p') }}</p>
      </div>

      <!-- Priority Buttons -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button
          @click="selectPriority('language')"
          class="p-4 rounded-xl border-2 transition-all text-left"
          :class="selectedPriority === 'language'
            ? 'border-sky-500 bg-sky-50 ring-2 ring-offset-2 ring-sky-500'
            : 'border-slate-200 hover:border-sky-500 hover:bg-sky-50'"
        >
          <div class="font-bold text-lg mb-1" :class="selectedPriority === 'language' ? 'text-sky-700' : ''">
            {{ $t('concierge.language.title') }}
          </div>
          <div class="text-sm text-slate-500">{{ $t('concierge.language.desc') }}</div>
        </button>

        <button
          @click="selectPriority('speed')"
          class="p-4 rounded-xl border-2 transition-all text-left"
          :class="selectedPriority === 'speed'
            ? 'border-orange-500 bg-orange-50 ring-2 ring-offset-2 ring-orange-500'
            : 'border-slate-200 hover:border-orange-500 hover:bg-orange-50'"
        >
          <div class="font-bold text-lg mb-1" :class="selectedPriority === 'speed' ? 'text-orange-700' : ''">
            {{ $t('concierge.speed.title') }}
          </div>
          <div class="text-sm text-slate-500">{{ $t('concierge.speed.desc') }}</div>
        </button>

        <button
          @click="selectPriority('stay')"
          class="p-4 rounded-xl border-2 transition-all text-left"
          :class="selectedPriority === 'stay'
            ? 'border-emerald-500 bg-emerald-50 ring-2 ring-offset-2 ring-emerald-500'
            : 'border-slate-200 hover:border-emerald-500 hover:bg-emerald-50'"
        >
          <div class="font-bold text-lg mb-1" :class="selectedPriority === 'stay' ? 'text-emerald-700' : ''">
            {{ $t('concierge.stay.title') }}
          </div>
          <div class="text-sm text-slate-500">{{ $t('concierge.stay.desc') }}</div>
        </button>
      </div>

      <!-- Recommendation Result -->
      <div
        v-if="selectedPriority"
        class="bg-slate-50 rounded-xl p-6 animate-fade-in shadow-sm"
        :style="{ borderLeft: `4px solid ${shopRawData[winnerKey].borderColor}` }"
      >
        <div class="flex flex-col md:flex-row gap-6 items-start">
          <div class="flex-1">
            <h3 class="text-2xl font-bold text-slate-900 mb-2">
              {{ $t('recommendation.title') || '推薦' }}: {{ winner.name }}
            </h3>
            <p class="text-slate-700 mb-4">{{ winner.desc }}</p>
            <ul class="space-y-2 mb-4">
              <li v-for="(feature, index) in winner.features" :key="index" class="flex items-start">
                <span class="text-sky-500 mr-2">✓</span> {{ feature }}
              </li>
            </ul>
            <a
              :href="shopRawData[winnerKey].url"
              target="_blank"
              class="inline-block bg-sky-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-sky-700 transition-colors"
            >
              {{ $t('concierge.result_link') }}
            </a>
          </div>
          <div class="w-full md:w-1/3 bg-white p-4 rounded-lg shadow-sm border border-slate-200">
            <div class="text-xs text-slate-500 uppercase font-semibold mb-2">
              {{ $t('concierge.result_label') }}
            </div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(tag, index) in winner.tags"
                :key="index"
                class="bg-slate-200 text-slate-700 px-2 py-1 rounded text-xs"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { shopRawData } from '@/data/shopData'

const { t } = useI18n()
const selectedPriority = ref(null)

const priorityMap = {
  language: 'elDive',
  speed: 'twoHundredBar',
  stay: 'tabanka'
}

const winnerKey = computed(() => {
  return selectedPriority.value ? priorityMap[selectedPriority.value] : null
})

const winner = computed(() => {
  if (!winnerKey.value) return null
  return t(`shop.${winnerKey.value}`, {}, { locale: 'zh-TW' })
})

const selectPriority = (type) => {
  selectedPriority.value = type
}
</script>
