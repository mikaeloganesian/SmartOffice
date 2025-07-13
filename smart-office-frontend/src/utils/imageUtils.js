// src/utils/imageUtils.js
import roomImages from '../assets/room-images/roomImages';

export const getImageByRoomId = (roomId) => {
  if (!roomId) return roomImages[0];

  const numericPart = roomId.replace(/[^0-9]/g, ''); 
  if (numericPart.length === 0) {
    let hash = 0;
    for (let i = 0; i < roomId.length; i++) {
        hash = roomId.charCodeAt(i) + ((hash << 5) - hash);
    }
    return roomImages[Math.abs(hash) % roomImages.length];
  }

  const lastDigits = parseInt(numericPart.slice(-3), 10);
  return roomImages[lastDigits % roomImages.length];
};