<template>
  <div class="app-shell">
    <nav class="navbar">
      <router-link to="/" class="nav-brand">🧩 JigsawPro</router-link>
      <div class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/game">Play</router-link>
        <router-link to="/leaderboard">Leaderboard</router-link>
      </div>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
</script>
