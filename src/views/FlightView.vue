<template>
  <main class="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
    <FlightHero />

    <OutboundSection />

    <InboundSection v-model:return-date="returnDate" />
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import useFlightData from '@/composables/useFlightData'
import FlightHero from '@/components/flight/FlightHero.vue'
import OutboundSection from '@/components/flight/OutboundSection.vue'
import InboundSection from '@/components/flight/InboundSection.vue'

const { loadFlightData } = useFlightData()
const returnDate = ref('24')

onMounted(() => {
  loadFlightData()
})
</script>
