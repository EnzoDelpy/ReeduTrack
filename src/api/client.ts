import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepter les requêtes (par exemple pour ajouter des tokens)
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Intercepter les réponses pour la gestion d'erreurs
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Gérer les erreurs (par exemple : rediriger vers la page de login si 401)
//     if (error.response?.status === 401) {
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

export default apiClient;
