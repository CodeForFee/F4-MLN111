// API Configuration
// Vite exposes env variables with VITE_ prefix
const API_URL = import.meta.env.VITE_API_URL || 'https://mln-be-nrtl.onrender.com'

export const API_BASE_URL = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL

export const API_ENDPOINTS = {
  QUIZ_QUESTIONS: `${API_BASE_URL}/api/quiz/questions`,
  SAVE_RESULT: `${API_BASE_URL}/api/results/save`,
  TOP_RESULTS: `${API_BASE_URL}/api/results/top`
}

