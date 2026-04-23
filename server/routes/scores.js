import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
});

export const submitScore = (payload) => api.post('/scores', payload);

export const getLeaderboard = (difficulty) =>
  api.get('/scores', {
    params: {
      ...(difficulty ? { difficulty } : {}),
      _sort: 'score',
      _order: 'desc',
      _limit: 10,
    },
  });