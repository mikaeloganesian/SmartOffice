import Room from "../components/Room";
import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import RoomService from "../api/room-service/room.api";

import { getImageByRoomId } from '../utils/imageUtils';
import ConfirmModal from "../components/ConfirmModal"; // Импортируем новый компонент

const RoomsPage = () => {
    const [roomsData, setRoomsData] = useState([]);
    const [roomDeviceCounts, setRoomDeviceCounts] = useState({});
    const [isLoadingRooms, setIsLoadingRooms] = useState(true);
    const [isLoadingDevices, setIsLoadingDevices] = useState(false);
    const [error, setError] = useState(null);

    const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
    const [newRoomName, setNewRoomName] = useState('');
    const [addRoomError, setAddRoomError] = useState('');
    
    const [showDeleteIcons, setShowDeleteIcons] = useState(false); 

    // Новые состояния для модального окна подтверждения
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [roomToDeleteId, setRoomToDeleteId] = useState(null);
    const [confirmMessage, setConfirmMessage] = useState("");

    const userRole = localStorage.getItem('userRole');
    const isAdmin = userRole === 'admin';

    const fetchRooms = useCallback(async () => {
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
    }, []);

    useEffect(() => {
        fetchRooms();
    }, [fetchRooms]);

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

    const handleAddRoom = async () => {
        setAddRoomError(''); 
        if (!newRoomName.trim()) {
            setAddRoomError('Имя комнаты не может быть пустым.');
            return;
        }

        try {
            const newRoom = await RoomService.createRoom(newRoomName); 
            console.log('Комната успешно добавлена на сервер:', newRoom);
            
            await fetchRooms(); 
            
            setIsAddRoomModalOpen(false); 
            setNewRoomName(''); 
            setAddRoomError(''); 
            setShowDeleteIcons(false); 
        } catch (err) {
            console.error('Ошибка при добавлении комнаты:', err);
            setAddRoomError(`Не удалось добавить комнату: ${err.message || 'Неизвестная ошибка'}`);
        }
    };

    // Функция, которая открывает модальное окно подтверждения
    const openConfirmModal = (roomId, roomName) => {
        setRoomToDeleteId(roomId);
        setConfirmMessage(`Вы уверены, что хотите удалить комнату "${roomName}"? Это действие необратимо.`);
        setIsConfirmModalOpen(true);
    };

    // Функция, которая обрабатывает подтверждение удаления
    const handleConfirmDelete = async () => {
        if (!roomToDeleteId) return; // Защита от вызова без ID

        try {
            await RoomService.removeRoom(roomToDeleteId); // Используем removeRoom, как вы назвали
            console.log(`Комната ${roomToDeleteId} успешно удалена.`);
            await fetchRooms(); // Обновляем список
        } catch (err) {
            console.error(`Ошибка при удалении комнаты ${roomToDeleteId}:`, err);
            alert(`Не удалось удалить комнату: ${err.message || 'Неизвестная ошибка'}`);
        } finally {
            setIsConfirmModalOpen(false); // Закрываем модальное окно
            setRoomToDeleteId(null); // Сбрасываем ID
            setConfirmMessage(""); // Сбрасываем сообщение
        }
    };

    // Функция, которая обрабатывает отмену удаления
    const handleCancelDelete = () => {
        setIsConfirmModalOpen(false);
        setRoomToDeleteId(null);
        setConfirmMessage("");
    };


    const isLoading = isLoadingRooms || isLoadingDevices;

    if (isLoading) {
        return <div className="text-center mt-20 text-xl">Загрузка данных...</div>;
    }

    if (error) {
        return <div className="text-center mt-20 text-xl text-red-500">Ошибка при загрузке данных: {error.message}</div>;
    }

    const roomsToRender = Array.isArray(roomsData) ? roomsData : (roomsData && Array.isArray(roomsData.items) ? roomsData.items : []);

    return (
        <div className="relative min-h-[calc(100vh-100px)]">
            <div className="grid mt-12 grid-cols-4 gap-5 p-5 mx-20">
                {roomsToRender.length > 0 ? (
                    roomsToRender.map((room) => {
                        const roomImage = getImageByRoomId(room.id);
                        const deviceCount = roomDeviceCounts[room.id] !== undefined ? roomDeviceCounts[room.id] : '...';

                        return (
                            <div key={room.id} className="relative">
                                <Link
                                    to={`/room/${room.id}`}
                                >
                                    <Room
                                        imagePath={roomImage}
                                        name={room.name}
                                        count={`${deviceCount}`}
                                    />
                                </Link>
                                {isAdmin && showDeleteIcons && (
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault(); 
                                            e.stopPropagation(); 
                                            openConfirmModal(room.id, room.name); // Вызываем новую функцию для открытия модального окна
                                        }}
                                        className="absolute top-0 -left-2 animate-scale-in-fade bg-gray-400 hover:scale-110 p-3 rounded-full text-white shadow-md hover:bg-red-600 transition-all duration-300 cursor-pointer"
                                        title="Удалить комнату"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="col-span-4 text-center text-xl">Нет доступных комнат.</div>
                )}
            </div>

            {isAdmin && (
                <div className="fixed bottom-8 right-8 z-40">
                    <button
                        onClick={() => {
                            setIsAddRoomModalOpen(prev => !prev); 
                            setShowDeleteIcons(prev => !prev); 
                            setNewRoomName(''); 
                            setAddRoomError(''); 
                        }}
                        className="bg-brown text-white p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brown focus:ring-opacity-50"
                        title="Добавить или управлять комнатами"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            {isAddRoomModalOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            )}
                        </svg>
                    </button>

                    {isAddRoomModalOpen && (
                        <div className="absolute bottom-full right-0 mb-4 w-72 bg-white p-6 rounded-lg shadow-xl origin-bottom-right transform transition-all duration-300 ease-out animate-scale-in-fade">
                            <h3 className="text-lg font-medium mb-3 text-gray-800">Добавить офис</h3>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-1 focus:ring-brown focus:border-transparent text-sm"
                                placeholder="Название комнаты"
                                value={newRoomName}
                                onChange={(e) => setNewRoomName(e.target.value)}
                                onKeyDown={(e) => { 
                                    if (e.key === 'Enter') {
                                        handleAddRoom();
                                    }
                                }}
                            />
                            {addRoomError && (
                                <p className="text-red-500 text-xs mb-3">{addRoomError}</p>
                            )}
                            <div className="flex gap-2">
                                <button
                                    onClick={handleAddRoom}
                                    className="px-4 py-2 w-full bg-brown text-white rounded-md text-sm hover:bg-opacity-90 transition duration-200"
                                >
                                    Добавить
                                </button>
                            </div>
                            <button
                                onClick={() => {
                                    setIsAddRoomModalOpen(false);
                                    setShowDeleteIcons(false); 
                                    setNewRoomName('');
                                    setAddRoomError('');
                                }}
                                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1"
                                title="Закрыть"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            )}
            
            {/* Добавляем компонент модального окна подтверждения */}
            <ConfirmModal
                isOpen={isConfirmModalOpen}
                message={confirmMessage}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </div>
    );
};

export default RoomsPage;