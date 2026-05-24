<script setup>
defineProps({
  horse: Object
})
</script>

<template>
  <div class="horse-lane">
    <div class="lane-info">
      <span>Horse #{{ horse.id }}</span>
      <span>Cond: {{ horse.condition }}</span>
    </div>

    <div class="track-line">
      <div class="track-text">
        |------------------------------------------------|
      </div>

      <img
        class="horse-icon"
        :src="horse.image"
        :alt="horse.name"
        :style="{
          left: horse.position + '%',
          transform: `translateX(-${horse.position}%)`
        }"
      >
    </div>
  </div>
</template>