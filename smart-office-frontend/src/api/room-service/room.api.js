import apiClient from '../index.js'; 

const USER_BASE_URL = '/rooms';

const RoomService = {
  // Получить все комнаты
  getAllRooms: async () => {
    try {
      const response = await apiClient.get(USER_BASE_URL);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении комнат:', error);
      throw error;
    }
  },

  getRoomById: async (room_id) => {
    try {
      const responce = await apiClient.get(`${USER_BASE_URL}/${room_id}`);
      return responce.data;
    } catch (error) {
      console.error("Ошибка в получении данных о комнате: ", error);
      throw error;
    }
  },

  // Получить конкретную комнату
  getRoomDevicesById: async (room_id) => {
    try {
      const response = await apiClient.get(`${USER_BASE_URL}/${room_id}/devices`);
      return response.data;
    } catch (error) {
      console.error('Ошибка в получении информации о комнате: ', error)
      throw error;
    }
  }
};

export default RoomService;