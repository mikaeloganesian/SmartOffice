import { useState, useEffect } from "react";
import RoomService from "../api/room-service/room.api";

const useDeviceData = (deviceId) => {
    const [deviceData, setDeviceData] = useState(null);
    const [deviceHistory, setDeviceHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!deviceId) {
                setError(new Error("ID устройства не найден в URL."));
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const roomsResponse = await RoomService.getAllRooms();
                let rooms = [];
                if (roomsResponse && Array.isArray(roomsResponse.items)) {
                    rooms = roomsResponse.items;
                } else if (Array.isArray(roomsResponse)) {
                    rooms = roomsResponse;
                }

                const devicesPromises = rooms.map(async (room) => {
                    try {
                        const roomDevicesResponse = await RoomService.getRoomDevicesById(room.id);
                        if (roomDevicesResponse && Array.isArray(roomDevicesResponse.items)) {
                            return roomDevicesResponse.items.map(device => ({
                                ...device,
                                roomName: room.name,
                                roomId: room.id
                            }));
                        }
                        return [];
                    } catch (err) {
                        console.error(err);
                        return [];
                    }
                });

                const allFetchedDevices = (await Promise.all(devicesPromises)).flat();
                const foundDevice = allFetchedDevices.find(device => device.id === deviceId);

                if (foundDevice) {
                    setDeviceData(foundDevice);
                    const currentRoomId = foundDevice.roomId;
                    
                    const historyFrom = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
                    const historyTo = new Date().toISOString();

                    const historyResponse = await RoomService.getDeviceByRoomAndDeviceId(currentRoomId, deviceId, historyFrom, historyTo);
                    
                    let processedHistory = [];
                    // Проверяем, является ли historyResponse массивом
                    if (Array.isArray(historyResponse)) {
                        // Если это массив, то объединяем все его элементы в один плоский массив.
                        // Это обработает случаи, когда historyResponse - это [ [{}], [{}], ... ]
                        // или [ {}, {}, ... ]
                        processedHistory = historyResponse.flat(Infinity); // Infinity для любой вложенности
                    } else if (historyResponse && Array.isArray(historyResponse.items)) {
                        // Если это объект с полем items, то объединяем элементы из items.
                        processedHistory = historyResponse.items.flat(Infinity);
                    }
                    
                    setDeviceHistory(processedHistory);

                } else {
                    setError(new Error("Устройство с указанным ID не найдено среди всех комнат."));
                }
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [deviceId]);

    return { deviceData, deviceHistory, isLoading, error };
};

export default useDeviceData;