import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
});

export const submitScore = (payload) => api.post('/api/scores', payload);

export const getLeaderboard = (difficulty) =>
  api.get('/api/scores', { params: difficulty ? { difficulty } : {} });
