<script setup>
import { onMounted, computed } from 'vue'
import { useRaceStore } from './stores/raceStore'
import RaceTrack from './components/RaceTrack.vue'
import ResultsPanel from './components/ResultsPanel.vue'

const raceStore = useRaceStore()

onMounted(() => {
  raceStore.init()
})

const currentRace = computed(() => {
  if (raceStore.races.length === 0) return null

  if (raceStore.currentRaceIndex >= raceStore.races.length) {
    return raceStore.races[raceStore.races.length - 1]
  }

  return raceStore.races[raceStore.currentRaceIndex]
})
</script>

<template>
  <main class="app">
    <div class="game-container">

      <aside class="left-panel parchment-panel">

        <div v-if="currentRace && currentRace.luckRanking.length > 0" class="luck-box">
          <h3>Luckiest Horses</h3>

          <div
            v-for="horse in currentRace.luckRanking"
            :key="horse.id"
            class="selected-horse-item"
          >
            <img :src="horse.image" class="small-horse">
            <span>Horse #{{ horse.id }}</span>
          </div>
        </div>

        <div v-else class="luck-box">
          <p>Press start to see luckiest horses.</p>
        </div>

        <h3>Selected Horses</h3>

        <div v-if="currentRace && currentRace.participants.length > 0">
          <div
            v-for="horse in currentRace.participants"
            :key="horse.id"
            class="selected-horse-item"
          >
            <img :src="horse.image" class="small-horse">
            <span>Horse #{{ horse.id }}</span>
          </div>
        </div>

        <p v-else>No horses selected yet.</p>

        <div class="control-area">
          

          <button
            v-if="currentRace && currentRace.participants.length === 0"
            class="image-button start-button"
            @click="raceStore.startRace()"
            :disabled="raceStore.isRaceRunning"
          ></button>

          <button
            v-else
            class="image-button next-button"
            @click="raceStore.startRace()"
            :disabled="raceStore.isRaceRunning || raceStore.currentRaceIndex >= raceStore.races.length"
          ></button>

          <button
            class="image-button reset-button"
            @click="raceStore.resetGame()"
          ></button>
        </div>
      </aside>

      <section class="race-area">
        
        <RaceTrack :race="currentRace" />
      </section>

      <aside class="right-panel parchment-panel">
        <ResultsPanel :races="raceStore.races" />
      </aside>

    </div>
  </main>
</template>