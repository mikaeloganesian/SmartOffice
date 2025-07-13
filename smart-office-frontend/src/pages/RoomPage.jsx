import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

import Tag from "../components/Tag";
import Device from '../components/Device';

import RoomService from '../api/room-service/room.api';

import testImage from '../assets/test-images/temp.jpg';
import { getImageByRoomId } from '../utils/imageUtils';

const RoomPage = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const currentLocation = useLocation();
    const roomId = new URLSearchParams(currentLocation.search).get("roomId");

    const [roomDevices, setRoomDevices] = useState(null);
    const [roomData, setRoomData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const roomImage = getImageByRoomId(roomId);

    useEffect(() => {
        async function fetchRoomDetails() {
            try {
                setIsLoading(true);
                const devicesResponse = await RoomService.getRoomDevicesById(roomId);
                const roomDataResponse = await RoomService.getRoomById(roomId);

                setRoomDevices(devicesResponse);
                setRoomData(roomDataResponse);
            } catch (err) {
                console.error("Ошибка при получении деталей комнаты: ", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }

        if (roomId) {
            fetchRoomDetails();
        } else {
            setError(new Error("Room ID не найден в URL."));
            setIsLoading(false);
        }
    }, [roomId]);

    if (isLoading) {
        return <div className="text-center mt-20 text-xl">Загрузка деталей комнаты...</div>;
    }

    if (error) {
        return <div className="text-center mt-20 text-xl text-red-500">Ошибка при загрузке деталей: {error.message}</div>;
    }

    if (!roomData || !roomDevices) {
        return <div className="text-center mt-20 text-xl">Данные комнаты или устройств не найдены.</div>;
    }

    const devicesToRender = Array.isArray(roomDevices.items) ? roomDevices.items : [];

    let totalDevicesCount = 0;
    let onlineDevicesCount = 0;
    let offlineDevicesCount = 0;

    let latestMeasurementTime = 'Нет данных';

    if (devicesToRender.length > 0) {
        totalDevicesCount = devicesToRender.length;
        let lastSeenDates = [];

        devicesToRender.forEach(device => {
            if (device.last_value === "false") {
                offlineDevicesCount++;
            } else {
                onlineDevicesCount++;
            }
            if (device.last_seen_at) {
                lastSeenDates.push(new Date(device.last_seen_at));
            }
        });

        if (lastSeenDates.length > 0) {
            lastSeenDates.sort((a, b) => b.getTime() - a.getTime());

            const latestDate = lastSeenDates[0];
            const day = String(latestDate.getDate()).padStart(2, '0');
            const month = String(latestDate.getMonth() + 1).padStart(2, '0');
            const hours = String(latestDate.getHours()).padStart(2, '0');
            const minutes = String(latestDate.getMinutes()).padStart(2, '0');

            latestMeasurementTime = `${day}.${month} ${hours}:${minutes}`;
        }
    }

    let statusContent;
    let statusStyle;

    if (totalDevicesCount === 0) {
        statusContent = "Нет устройств";
        statusStyle = "text-gray-500";
    } else if (onlineDevicesCount === totalDevicesCount) {
        statusContent = "● All online";
        statusStyle = "text-green-600";
    } else if (offlineDevicesCount > 0 && offlineDevicesCount < totalDevicesCount) {
        statusContent = `● ${offlineDevicesCount} device offline`;
        statusStyle = "text-yellow-600";
    } else {
        statusContent = "● All offline";
        statusStyle = "text-red-600";
    }

    return (
        <div className="mt-12 p-5 mx-20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div
                    className="shadow-xl col-span-1 relative h-96 rounded-4xl bg-gray-200 bg-cover bg-center cursor-pointer hover:scale-102 transition-transform duration-300 ease-in-out"
                    style={{ backgroundImage: `url(${roomImage || testImage})` }}
                    onClick={() => setIsFullScreen(true)}
                >
                </div>

                <div className="flex col-span-3 flex-col gap-5">
                    <div className="shadow bg-white rounded-2xl p-4 h-15 flex items-center justify-around">
                            <Tag style={statusStyle} content={statusContent} />
                            <Tag content={`Комната: ${roomData.name || 'Название не найдено'}`} />
                            {/* Используем отформатированную дату последнего замера */}
                            <Tag content={`Последний замер ${latestMeasurementTime}`} />
                            <Link to={"/"}><Tag style={"text-gray-400 hover:scale-105"} content={"← Назад"} /></Link>
                    </div>

                    <div className="grid grid-cols-3 gap-5">
                        {devicesToRender.length > 0 ? (
                            devicesToRender.map((device) => (
                                <Device
                                    key={device.id}
                                    size='m'
                                    value={device.last_value === "false" ? "N/A" : device.last_value}
                                    name={device.name || "Без имени"}
                                    imagePath={device.imagePath || testImage}
                                    status={device.last_value === "false" ? "Offline" : "Online"}
                                />
                            ))
                        ) : (
                            <div className="col-span-3 text-center text-xl">Устройств не найдено.</div>
                        )}
                    </div>
                </div>
            </div>

            {isFullScreen && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50 cursor-zoom-out"
                    onClick={() => setIsFullScreen(false)}
                >
                    <img
                        src={roomImage || testImage}
                        alt={`Комната ${roomData.name || 'Неизвестная комната'}`}
                        className="w-[80vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                    />
                </div>
            )}
        </div>
    );
};

export default RoomPage;