<script setup lang="ts">
import Platfrom from '~/components/platform'
import settings from '~/settings/platform.json'
import root from '~/settings/root.json'
const data = ref(settings)
</script>

<template>
  <Platfrom v-model="data" :root="root" />
</template>

<style>
</style>
