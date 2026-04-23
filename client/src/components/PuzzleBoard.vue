<template>
  <div
    class="puzzle-board"
    :style="{ '--grid': store.gridSize }"
  >
    <div
      v-for="(piece, index) in store.pieces"
      :key="piece.id"
      class="puzzle-piece"
      :class="{ dragging: dragIndex === index, correct: piece.currentIndex === piece.correctIndex }"
      draggable="true"
      :style="pieceStyle(piece)"
      @dragstart="onDragStart(index)"
      @dragover.prevent
      @drop="onDrop(index)"
      @touchstart.prevent="onTouchStart($event, index)"
      @touchmove.prevent="onTouchMove($event)"
      @touchend.prevent="onTouchEnd($event, index)"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useGameStore } from '../stores/game';

const store = useGameStore();
const dragIndex = ref(null);
const touchStartIndex = ref(null);

function pieceStyle(piece) {
  const size = 100 / store.gridSize;
  const col = piece.correctIndex % store.gridSize;
  const row = Math.floor(piece.correctIndex / store.gridSize);
  return {
    backgroundImage: `url(${store.imageUrl})`,
    backgroundSize: `${store.gridSize * 100}%`,
    backgroundPosition: `${(col / (store.gridSize - 1)) * 100}% ${(row / (store.gridSize - 1)) * 100}%`,
    width: `${size}%`,
    aspectRatio: '1',
  };
}

function onDragStart(index) {
  dragIndex.value = index;
}

function onDrop(index) {
  if (dragIndex.value !== null && dragIndex.value !== index) {
    store.swapPieces(dragIndex.value, index);
  }
  dragIndex.value = null;
}

function onTouchStart(e, index) {
  touchStartIndex.value = index;
}

function onTouchMove(e) {
}

function onTouchEnd(e, index) {
  if (touchStartIndex.value !== null && touchStartIndex.value !== index) {
    const touch = e.changedTouches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    const target = el?.closest('.puzzle-piece');
    if (target) {
      const pieces = document.querySelectorAll('.puzzle-piece');
      const targetIndex = Array.from(pieces).indexOf(target);
      if (targetIndex !== -1) {
        store.swapPieces(touchStartIndex.value, targetIndex);
      }
    }
  }
  touchStartIndex.value = null;
}
</script>
