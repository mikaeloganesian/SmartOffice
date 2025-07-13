import React, { useState, useEffect } from 'react';
import Device from "../components/Device";
import RoomService from "../api/room-service/room.api";

import testImage from '../assets/test-images/temp.jpg';
import { Link } from 'react-router-dom';

const DevicesPage = () => {
    const [allDevices, setAllDevices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchAllDevicesFromAllRooms() {
            try {
                setIsLoading(true);
                setError(null); 

                const roomsResponse = await RoomService.getAllRooms();
                let rooms = [];
                if (roomsResponse && Array.isArray(roomsResponse.items)) {
                    rooms = roomsResponse.items;
                } else if (Array.isArray(roomsResponse)) {
                    rooms = roomsResponse;
                } else {
                    console.warn("API response for rooms is not in expected format:", roomsResponse);
                    rooms = [];
                }

                if (rooms.length === 0) {
                    setAllDevices([]);
                    setIsLoading(false);
                    return;
                }

                const devicesPromises = rooms.map(async (room) => {
                    try {
                        const roomDevicesResponse = await RoomService.getRoomDevicesById(room.id);
                        if (roomDevicesResponse && Array.isArray(roomDevicesResponse.items)) {
                            return roomDevicesResponse.items.map(device => ({
                                ...device,
                                roomName: room.name
                            }));
                        }
                        return [];
                    } catch (deviceErr) {
                        console.error(`Ошибка при получении устройств для комнаты ${room.name} (ID: ${room.id}):`, deviceErr);
                        return [];
                    }
                });

                const devicesArrays = await Promise.all(devicesPromises);
                const flattenedDevices = devicesArrays.flat();
                setAllDevices(flattenedDevices);

            } catch (err) {
                console.error("Глобальная ошибка при загрузке всех устройств:", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchAllDevicesFromAllRooms();
    }, []);

    if (isLoading) {
        return <div className="text-center mt-20 text-xl">Загрузка всех устройств...</div>;
    }

    if (error) {
        return <div className="text-center mt-20 text-xl text-red-500">Ошибка при загрузке устройств: {error.message}</div>;
    }

    return (
        <div className="grid mt-12 grid-cols-4 gap-5 p-5 mx-20">
            {allDevices.length > 0 ? (
                allDevices.map((device) => (
                    <Link to={`/device/${device.id}?roomId=${encodeURIComponent(device.room_id)}`}>
                    <Device
                        key={device.id}
                        imagePath={testImage}
                        size="m"
                        value={device.last_value === "false" ? "N/A" : device.last_value}
                        name={device.name || "Без имени"}
                        status={device.last_value === "false" ? "Offline" : "Online"}
                    />
                    </Link>
                ))
            ) : (
                <div className="col-span-4 text-center text-xl">Устройства не найдены ни в одной комнате.</div>
            )}
        </div>
    );
}

export default DevicesPage;