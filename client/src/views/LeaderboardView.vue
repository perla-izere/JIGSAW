<template>
  <div class="leaderboard-view">
    <h1>Leaderboard</h1>
    <div class="diff-tabs">
      <button
        v-for="d in difficulties"
        :key="d"
        :class="['tab', { active: activeDiff === d }]"
        @click="changeDiff(d)"
      >
        {{ d }}
      </button>
    </div>

    <div v-if="loading" class="loading">Loading scores...</div>
    <div v-else-if="error" class="error-msg">{{ error }}</div>
    <div v-else-if="!scores.length" class="empty">No scores yet for this difficulty.</div>
    <table v-else class="score-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Player</th>
          <th>Score</th>
          <th>Time</th>
          <th>Moves</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(s, i) in scores" :key="s._id" :class="{ 'top-three': i < 3 }">
          <td>{{ i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1 }}</td>
          <td>{{ s.playerName }}</td>
          <td>{{ s.score.toLocaleString() }}</td>
          <td>{{ formatTime(s.time) }}</td>
          <td>{{ s.moves }}</td>
          <td>{{ formatDate(s.date) }}</td>
        </tr>
      </tbody>
    </table>
    <router-link to="/game" class="btn-primary mt">Play Now</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getLeaderboard } from '../api/scores';

const difficulties = ['easy', 'medium', 'hard'];
const activeDiff = ref('medium');
const scores = ref([]);
const loading = ref(false);
const error = ref('');

async function fetchScores() {
  loading.value = true;
  error.value = '';
  try {
    const res = await getLeaderboard(activeDiff.value);
    scores.value = res.data.data;
  } catch (e) {
    error.value = 'Failed to load leaderboard.';
  } finally {
    loading.value = false;
  }
}

function changeDiff(d) {
  activeDiff.value = d;
  fetchScores();
}

function formatTime(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

onMounted(fetchScores);
</script>
