<template>
  <section class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
    <div class="p-6 border-b border-slate-100">
      <h3 class="font-bold text-lg text-slate-800">{{ $t('table.h3') }}</h3>
    </div>
    <div class="overflow-x-auto custom-scrollbar">
      <table class="w-full text-sm text-left text-slate-600">
        <thead class="text-xs text-slate-700 uppercase bg-slate-50">
          <tr>
            <th scope="col" class="px-6 py-4 rounded-tl-lg">{{ $t('table.item') }}</th>
            <th scope="col" class="px-6 py-4 font-bold text-sky-700">EL DIVE</th>
            <th scope="col" class="px-6 py-4 font-bold text-orange-700">200 Bar</th>
            <th scope="col" class="px-6 py-4 font-bold text-emerald-700">Tabanka</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr class="hover:bg-slate-50">
            <td class="px-6 py-4 font-medium text-slate-900">{{ $t('price_chart.label_fun2') }}</td>
            <td class="px-6 py-4">₱{{ shopRawData.elDive.fun2.toLocaleString() }}</td>
            <td class="px-6 py-4">₱{{ shopRawData.twoHundredBar.fun2.toLocaleString() }}</td>
            <td class="px-6 py-4">₱{{ shopRawData.tabanka.fun2.toLocaleString() }}</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="px-6 py-4 font-medium text-slate-900">Fun Dive (3支)</td>
            <td class="px-6 py-4">₱{{ shopRawData.elDive.fun3.toLocaleString() }}</td>
            <td class="px-6 py-4">₱{{ shopRawData.twoHundredBar.fun3.toLocaleString() }}</td>
            <td class="px-6 py-4">₱{{ shopRawData.tabanka.fun3.toLocaleString() }}</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="px-6 py-4 font-medium text-slate-900">{{ $t('price_chart.label_ow') }}</td>
            <td class="px-6 py-4">
              ₱{{ shopRawData.elDive.ow.toLocaleString() }}<br>
              <span class="text-xs text-slate-400">{{ $t('table.ow_struct') }}</span>
            </td>
            <td class="px-6 py-4">
              ₱{{ shopRawData.twoHundredBar.ow.toLocaleString() }}<br>
              <span class="text-xs text-slate-400">{{ $t('table.std_struct') }}</span>
            </td>
            <td class="px-6 py-4">
              ₱{{ shopRawData.tabanka.ow.toLocaleString() }}<br>
              <span class="text-xs text-slate-400">{{ $t('table.std_struct') }}</span>
            </td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="px-6 py-4 font-medium text-slate-900">{{ $t('price_chart.label_aow') }}</td>
            <td class="px-6 py-4">₱{{ shopRawData.elDive.aow.toLocaleString() }}</td>
            <td class="px-6 py-4">₱{{ shopRawData.twoHundredBar.aow.toLocaleString() }}</td>
            <td class="px-6 py-4">₱{{ shopRawData.tabanka.aow.toLocaleString() }}</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="px-6 py-4 font-medium text-slate-900">{{ $t('table.lunch') }}</td>
            <td class="px-6 py-4 text-green-600">{{ $t('table.lunch_inc') }}</td>
            <td class="px-6 py-4 text-green-600">{{ $t('table.lunch_inc') }}</td>
            <td class="px-6 py-4 text-green-600">{{ $t('table.lunch_inc') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { shopRawData } from '@/data/shopData'
</script>
