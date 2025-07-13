// RoomsPage.js
import Room from "../components/Room";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import RoomService from "../api/room-service/room.api";

import { getImageByRoomId } from '../utils/imageUtils'; // <-- Импорт новой функции

const RoomsPage = () => {
    const [roomsData, setRoomsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchRooms() {
            try {
                setIsLoading(true);
                const response = await RoomService.getAllRooms();
                if (response && Array.isArray(response.items)) {
                    setRoomsData(response.items);
                } else if (Array.isArray(response)) {
                    setRoomsData(response);
                } else {
                    console.warn("API response is not in expected format:", response);
                    setRoomsData([]);
                }
            } catch (err) {
                console.error("Ошибка в получении комнаты: ", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchRooms();
    }, []);

    if (isLoading) {
        return <div className="text-center mt-20 text-xl">Загрузка комнат...</div>;
    }

    if (error) {
        return <div className="text-center mt-20 text-xl text-red-500">Ошибка при загрузке данных: {error.message}</div>;
    }

    const roomsToRender = Array.isArray(roomsData) ? roomsData : (roomsData && Array.isArray(roomsData.items) ? roomsData.items : []);

    return (
        <div className="grid mt-12 grid-cols-4 gap-5 p-5 mx-20">
            {roomsToRender.length > 0 ? (
                roomsToRender.map((room) => { // <-- Убрали 'index', так как он больше не нужен для выбора изображения
                    const roomImage = getImageByRoomId(room.id); // <-- Используем ID комнаты для выбора изображения

                    return (
                        <Link
                            to={`/room/${room.name}?roomId=${encodeURIComponent(room.id)}`}
                            key={room.id}
                        >
                            <Room
                                imagePath={roomImage} // Передаем изображение, выбранное по ID
                                name={room.name}
                                count={room.status || "1"}
                            />
                        </Link>
                    );
                })
            ) : (
                <div className="col-span-4 text-center text-xl">Нет доступных комнат.</div>
            )}
        </div>
    );
};

export default RoomsPage;