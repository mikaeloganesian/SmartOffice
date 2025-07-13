import Room from "../components/Room";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import RoomService from "../api/room-service/room.api";

import { getImageByRoomId } from '../utils/imageUtils';

const RoomsPage = () => {
    const [roomsData, setRoomsData] = useState([]);
    const [roomDeviceCounts, setRoomDeviceCounts] = useState({});
    const [isLoadingRooms, setIsLoadingRooms] = useState(true);
    const [isLoadingDevices, setIsLoadingDevices] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchRooms() {
            try {
                setIsLoadingRooms(true);
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
                console.error("Ошибка при получении комнат: ", err);
                setError(err);
            } finally {
                setIsLoadingRooms(false);
            }
        }
        fetchRooms();
    }, []);

    useEffect(() => {
        async function fetchDeviceCounts() {
            if (roomsData.length === 0) {
                setRoomDeviceCounts({}); 
                setIsLoadingDevices(false);
                return;
            }

            setIsLoadingDevices(true); 
            const counts = {};
            const fetchPromises = roomsData.map(async (room) => {
                try {
                    const response = await RoomService.getRoomDevicesById(room.id);
                    console.log(response)
                    if (response && Array.isArray(response.items)) {
                        counts[room.id] = response.items.length;
                    } else {
                        counts[room.id] = 0;
                        console.warn(`Ответ для комнаты ${room.id} не содержит устройств в items:`, response);
                    }
                } catch (err) {
                    console.error(`Ошибка при получении устройств для комнаты ${room.id}: `, err);
                    counts[room.id] = 0;
                }
            });

            await Promise.all(fetchPromises);
            setRoomDeviceCounts(counts);
            setIsLoadingDevices(false);
        }

        fetchDeviceCounts();
    }, [roomsData]);

    const isLoading = isLoadingRooms || isLoadingDevices;

    if (isLoading) {
        return <div className="text-center mt-20 text-xl">Загрузка данных...</div>;
    }

    if (error) {
        return <div className="text-center mt-20 text-xl text-red-500">Ошибка при загрузке данных: {error.message}</div>;
    }

    const roomsToRender = Array.isArray(roomsData) ? roomsData : (roomsData && Array.isArray(roomsData.items) ? roomsData.items : []);

    return (
        <div className="grid mt-12 grid-cols-4 gap-5 p-5 mx-20">
            {roomsToRender.length > 0 ? (
                roomsToRender.map((room) => {
                    const roomImage = getImageByRoomId(room.id);
                    const deviceCount = roomDeviceCounts[room.id] !== undefined ? roomDeviceCounts[room.id] : '...';

                    return (
                        <Link
                            to={`/room/${room.id}`}
                            key={room.id}
                        >
                            <Room
                                imagePath={roomImage}
                                name={room.name}
                                count={`${deviceCount}`}
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