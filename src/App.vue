<template>
  <div id="app">
    <AppNav />
    <router-view />
    <AppFooter />
  </div>
</template>

<script setup>
import AppNav from '@/components/layout/AppNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>
