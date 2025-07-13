// src/utils/useAllSensorDataHook.js
import { useState, useEffect } from "react";
import RoomService from "../api/room-service/room.api";

const useAllSensorData = () => {
    const [allRecords, setAllRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
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

                const allDevicesPromises = rooms.map(async (room) => {
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
                        console.error("Ошибка при получении устройств для комнаты", room.id, err);
                        return [];
                    }
                });

                const allDevices = (await Promise.all(allDevicesPromises)).flat();

                const recordsPromises = allDevices.map(async (device) => {
                    try {
                        const historyFrom = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(); // За последние 24 часа
                        const historyTo = new Date().toISOString();
                        const historyResponse = await RoomService.getDeviceByRoomAndDeviceId(device.roomId, device.id, historyFrom, historyTo);

                        let deviceRecords = [];
                        if (historyResponse && typeof historyResponse === 'object' && historyResponse !== null) {
                            for (const key in historyResponse) {
                                if (Object.prototype.hasOwnProperty.call(historyResponse, key)) {
                                    const value = historyResponse[key];
                                    if (Array.isArray(value)) {
                                        deviceRecords = deviceRecords.concat(value.map(record => ({
                                            ...record,
                                            deviceName: device.name || 'Без имени',
                                            deviceId: device.id,
                                            roomName: device.roomName || 'Без комнаты',
                                            roomId: device.roomId
                                        })));
                                    }
                                }
                            }
                        }
                        return deviceRecords;
                    } catch (err) {
                        console.error("Ошибка при получении истории для устройства", device.id, err);
                        return [];
                    }
                });

                const fetchedRecords = (await Promise.all(recordsPromises)).flat();

                const sortedRecords = fetchedRecords.sort((a, b) => {
                    const dateA = new Date(a.timestamp);
                    const dateB = new Date(b.timestamp);
                    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
                        return 0; // Для невалидных дат
                    }
                    return dateB.getTime() - dateA.getTime();
                });
                
                setAllRecords(sortedRecords);

            } catch (err) {
                console.error("Глобальная ошибка при получении всех данных датчиков:", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, []);

    return { allRecords, isLoading, error };
};

export default useAllSensorData;