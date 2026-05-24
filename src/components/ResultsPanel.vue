<script setup>
import { ref } from 'vue'

defineProps({
  races: Array
})

const selectedRace = ref(null)

function openPopup(race) {
  selectedRace.value = race
}

function closePopup() {
  selectedRace.value = null
}
</script>

<template>
  <div class="results-panel">
    <h3>Race Results</h3>

    <div
      v-for="race in races.filter(race => race.results.length > 0)"
      :key="race.id"
      class="history-box"
      @click="openPopup(race)"
    >
      <h3>Race {{ race.id + 1 }} - {{ race.distance }}m</h3>

      <p
        v-for="result in race.results.slice(0, 3)"
        :key="result.id"
      >
        {{ result.rank }}. Horse #{{ result.id }} - {{ result.time }}ms
      </p>
    </div>

    <p v-if="races.every(race => race.results.length === 0)">
      No results yet.
    </p>

    <div v-if="selectedRace" class="popup">
      <div class="popup-content parchment-panel">
        <button id="closePopup" @click="closePopup">X</button>

        <h2>Race {{ selectedRace.id + 1 }} Full Result</h2>

        <p
          v-for="result in selectedRace.results"
          :key="result.id"
        >
          {{ result.rank }}. Horse #{{ result.id }} - {{ result.time }}ms
        </p>
      </div>
    </div>
  </div>
</template>