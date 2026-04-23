<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <div class="modal-confetti">🎉</div>
      <h2>Puzzle Complete!</h2>
      <div class="win-stats">
        <div class="win-stat">
          <span>Time</span>
          <strong>{{ formattedTime }}</strong>
        </div>
        <div class="win-stat">
          <span>Moves</span>
          <strong>{{ store.moves }}</strong>
        </div>
        <div class="win-stat">
          <span>Score</span>
          <strong>{{ store.score }}</strong>
        </div>
      </div>

      <div v-if="!submitted" class="submit-form">
        <input
          v-model="playerName"
          type="text"
          placeholder="Enter your name"
          maxlength="30"
          class="name-input"
        />
        <button class="btn-primary" :disabled="!playerName.trim() || submitting" @click="submitScore">
          {{ submitting ? 'Saving...' : 'Save Score' }}
        </button>
        <p v-if="error" class="error-msg">{{ error }}</p>
      </div>
      <div v-else class="submitted-msg">
        <p>✅ Score saved! You're on the board.</p>
        <router-link to="/leaderboard" class="btn-primary">View Leaderboard</router-link>
      </div>

      <button class="btn-secondary mt" @click="$emit('close')">Play Again</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useGameStore } from '../stores/game';
import { submitScore as apiSubmit } from '../api/scores';

const emit = defineEmits(['close']);
const store = useGameStore();
const playerName = ref('');
const submitting = ref(false);
const submitted = ref(false);
const error = ref('');

const formattedTime = computed(() => {
  const m = Math.floor(store.time / 60).toString().padStart(2, '0');
  const s = (store.time % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
});

async function submitScore() {
  if (!playerName.value.trim()) return;
  submitting.value = true;
  error.value = '';
  try {
    await apiSubmit({
      playerName: playerName.value.trim(),
      score: store.score,
      time: store.time,
      moves: store.moves,
      difficulty: store.difficulty,
    });
    submitted.value = true;
  } catch (e) {
    error.value = 'Could not save score. Please try again.';
  } finally {
    submitting.value = false;
  }
}
</script>
