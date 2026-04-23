<template>
  <div class="game-view">
    <div class="game-header">
      <div class="stat-box">
        <span class="stat-label">Time</span>
        <span class="stat-value">{{ formattedTime }}</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">Moves</span>
        <span class="stat-value">{{ store.moves }}</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">Difficulty</span>
        <span class="stat-value capitalize">{{ store.difficulty }}</span>
      </div>
      <div class="game-actions">
        <button class="btn-secondary" @click="restartGame">Restart</button>
        <router-link to="/" class="btn-secondary" @click="store.resetGame()">New Game</router-link>
      </div>
    </div>

    <div v-if="!store.pieces.length" class="setup-panel">
      <p>Choose an image to start:</p>
      <div class="image-options">
        <button
          v-for="img in sampleImages"
          :key="img.url"
          class="img-option"
          :style="{ backgroundImage: `url(${img.url})` }"
          @click="startGame(img.url)"
        />
      </div>
      <label class="upload-label">
        Or upload your own
        <input type="file" accept="image/*" @change="handleUpload" hidden />
      </label>
    </div>

    <div v-else class="puzzle-area">
      <PuzzleBoard />
      <div class="reference-image">
        <p class="ref-label">Reference</p>
        <img :src="store.imageUrl" alt="Reference" />
      </div>
    </div>

    <WinModal v-if="store.isComplete" @close="store.resetGame()" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useGameStore } from '../stores/game';
import PuzzleBoard from '../components/PuzzleBoard.vue';
import WinModal from '../components/WinModal.vue';

const store = useGameStore();

const sampleImages = [
  { url: 'https://picsum.photos/seed/mountain/600/600' },
  { url: 'https://picsum.photos/seed/ocean/600/600' },
  { url: 'https://picsum.photos/seed/forest/600/600' },
  { url: 'https://picsum.photos/seed/city/600/600' },
];

const formattedTime = computed(() => {
  const m = Math.floor(store.time / 60).toString().padStart(2, '0');
  const s = (store.time % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
});

function startGame(url) {
  store.initPieces(url);
  store.startTimer();
}

function restartGame() {
  store.resetGame();
  if (store.imageUrl) {
    startGame(store.imageUrl);
  }
}

function handleUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => startGame(ev.target.result);
  reader.readAsDataURL(file);
}
</script>
