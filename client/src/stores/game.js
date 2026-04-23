import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useGameStore = defineStore('game', () => {
  const difficulty = ref('medium');
  const pieces = ref([]);
  const moves = ref(0);
  const time = ref(0);
  const isRunning = ref(false);
  const isComplete = ref(false);
  const imageUrl = ref('');
  let timerInterval = null;

  const gridSize = computed(() => {
    if (difficulty.value === 'easy') return 3;
    if (difficulty.value === 'medium') return 4;
    return 5;
  });

  const totalPieces = computed(() => gridSize.value * gridSize.value);

  const score = computed(() => {
    if (!isComplete.value) return 0;
    const base = 10000;
    const timePenalty = time.value * 10;
    const movePenalty = moves.value * 5;
    return Math.max(0, base - timePenalty - movePenalty);
  });

  function initPieces(imgUrl) {
    imageUrl.value = imgUrl;
    const total = totalPieces.value;
    const ordered = Array.from({ length: total }, (_, i) => ({
      id: i,
      currentIndex: i,
      correctIndex: i,
    }));
    pieces.value = shuffleArray(ordered).map((p, i) => ({
      ...p,
      currentIndex: i,
    }));
    moves.value = 0;
    time.value = 0;
    isComplete.value = false;
  }

  function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function swapPieces(fromIndex, toIndex) {
    if (fromIndex === toIndex) return;
    const updated = [...pieces.value];
    [updated[fromIndex], updated[toIndex]] = [updated[toIndex], updated[fromIndex]];
    updated[fromIndex].currentIndex = fromIndex;
    updated[toIndex].currentIndex = toIndex;
    pieces.value = updated;
    moves.value++;
    checkWin();
  }

  function checkWin() {
    const won = pieces.value.every((p) => p.currentIndex === p.correctIndex);
    if (won) {
      isComplete.value = true;
      stopTimer();
    }
  }

  function startTimer() {
    if (timerInterval) return;
    isRunning.value = true;
    timerInterval = setInterval(() => {
      time.value++;
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning.value = false;
  }

  function resetGame() {
    stopTimer();
    pieces.value = [];
    moves.value = 0;
    time.value = 0;
    isComplete.value = false;
  }

  function setDifficulty(val) {
    difficulty.value = val;
  }

  return {
    difficulty,
    pieces,
    moves,
    time,
    isRunning,
    isComplete,
    imageUrl,
    gridSize,
    totalPieces,
    score,
    initPieces,
    swapPieces,
    startTimer,
    stopTimer,
    resetGame,
    setDifficulty,
  };
});
