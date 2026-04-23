<template>
  <div class="home">
    <div class="hero">
      <h1 class="hero-title">Put the World<br /><span>Back Together</span></h1>
      <p class="hero-sub">A jigsaw puzzle game with global leaderboards. Pick your difficulty and race the clock.</p>
      <div class="difficulty-picker">
        <button
          v-for="d in difficulties"
          :key="d.value"
          :class="['diff-btn', { active: selected === d.value }]"
          @click="selectDifficulty(d.value)"
        >
          <span class="diff-icon">{{ d.icon }}</span>
          <span class="diff-label">{{ d.label }}</span>
          <span class="diff-size">{{ d.size }}</span>
        </button>
      </div>
      <router-link to="/game" class="play-btn" @click="confirmDifficulty">
        Start Puzzle
      </router-link>
    </div>
    <div class="preview-grid">
      <div v-for="i in 9" :key="i" class="preview-tile" :style="tileStyle(i)" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useGameStore } from '../stores/game';

const store = useGameStore();
const selected = ref(store.difficulty);

const difficulties = [
  { value: 'easy', label: 'Easy', icon: '🌱', size: '3 × 3' },
  { value: 'medium', label: 'Medium', icon: '🔥', size: '4 × 4' },
  { value: 'hard', label: 'Hard', icon: '💀', size: '5 × 5' },
];

function selectDifficulty(val) {
  selected.value = val;
}

function confirmDifficulty() {
  store.setDifficulty(selected.value);
  store.resetGame();
}

function tileStyle(i) {
  const hues = [220, 200, 180, 160, 260, 240, 200, 220, 180];
  return { background: `hsl(${hues[i - 1]}, 60%, ${30 + (i % 3) * 8}%)` };
}
</script>
