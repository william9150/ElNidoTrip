<template>
  <section class="space-y-6">
    <div class="text-center md:text-center">
      <h2 class="text-2xl font-bold text-slate-800">{{ $t('price_chart.h2') }}</h2>
      <p class="text-slate-600 mt-2 whitespace-pre-line">{{ $t('price_chart.p') }}</p>
    </div>
    <div class="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
      <div class="chart-container">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
      <div class="mt-4 text-center text-sm text-slate-500">
        {{ $t('concierge.currency_note') }}
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { useI18n } from 'vue-i18n'
import { shopRawData } from '@/data/shopData'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const { t } = useI18n()

const chartData = computed(() => ({
  labels: [
    t('price_chart.label_fun2'),
    t('price_chart.label_ow'),
    t('price_chart.label_aow'),
  ],
  datasets: [
    {
      label: shopRawData.elDive.name,
      data: [shopRawData.elDive.fun2, shopRawData.elDive.ow, shopRawData.elDive.aow],
      backgroundColor: shopRawData.elDive.color,
      borderColor: shopRawData.elDive.borderColor,
      borderWidth: 1,
    },
    {
      label: shopRawData.twoHundredBar.name,
      data: [shopRawData.twoHundredBar.fun2, shopRawData.twoHundredBar.ow, shopRawData.twoHundredBar.aow],
      backgroundColor: shopRawData.twoHundredBar.color,
      borderColor: shopRawData.twoHundredBar.borderColor,
      borderWidth: 1,
    },
    {
      label: shopRawData.tabanka.name,
      data: [shopRawData.tabanka.fun2, shopRawData.tabanka.ow, shopRawData.tabanka.aow],
      backgroundColor: shopRawData.tabanka.color,
      borderColor: shopRawData.tabanka.borderColor,
      borderWidth: 1,
    },
  ],
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: t('price_chart.y_axis'),
      },
      ticks: {
        callback: function(value) {
          return '₱' + value.toLocaleString()
        }
      }
    },
  },
}))
</script>
