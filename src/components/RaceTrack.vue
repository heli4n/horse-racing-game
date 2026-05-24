<script setup>
import HorseLane from './HorseLane.vue'

defineProps({
  race: Object
})
</script>

<template>
  <div class="race-track" v-if="race">
    <h1>Race {{ race.id + 1 }} - {{ race.distance }}m</h1>

    <div v-if="race.participants.length === 0" class="empty-race-text">
      Press start to select horses.
    </div>

    <HorseLane
      v-for="horse in race.participants"
      :key="horse.id"
      :horse="horse"
    />
  </div>
</template>