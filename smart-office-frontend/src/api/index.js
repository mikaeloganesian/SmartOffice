import axios from 'axios';

// 1. Создаем экземпляр Axios с базовой конфигурацией
const apiClient = axios.create({
  baseURL: 'http://89.169.180.190:8080/api/v1/', 
  timeout: 10000, // Таймаут в 10 секунд
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('Ошибка данных:', error.response.data);
      console.error('Статус:', error.response.status);
      console.error('Заголовки:', error.response.headers);
      if (error.response.status === 401) {
        console.log('Неавторизованный доступ, перенаправление на логин...');
      }
    } else if (error.request) {
      console.error('Нет ответа от сервера:', error.request);
    } else {
      console.error('Ошибка запроса:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;