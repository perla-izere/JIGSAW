import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import GameView from '../views/GameView.vue';
import LeaderboardView from '../views/LeaderboardView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/game', component: GameView },
  { path: '/leaderboard', component: LeaderboardView },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
