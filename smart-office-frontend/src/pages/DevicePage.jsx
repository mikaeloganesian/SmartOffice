import React, { useState, useMemo } from 'react';
import useDeviceData from '../utils/useDeviceDataHook';
import { Link, useParams } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Tag from "../components/Tag";

import staticDeviceImage from '../assets/device-images/DeviceImage-1.jpeg';
import { trimString } from '../utils/stringUtils';
import { formatLastSeen } from '../utils/dateUtils';

const DevicePage = () => {
    const { deviceId } = useParams();
    const { deviceData, deviceHistory, isLoading, error } = useDeviceData(deviceId);
    
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showAllHistory, setShowAllHistory] = useState(false);
    const deviceImage = staticDeviceImage;

    const { statusContent, statusStyle, latestMeasurementTime } = useMemo(() => {
        if (!deviceData) return {};
        return {
            statusContent: deviceData.last_value === "false" ? "● Offline" : "● Online",
            statusStyle: deviceData.last_value === "false" ? "text-red-600" : "text-green-600",
            latestMeasurementTime: formatLastSeen(deviceData.last_seen_at)
        };
    }, [deviceData]);

    const displayedHistory = showAllHistory ? deviceHistory : deviceHistory.slice(0, 20);

    const chartData = useMemo(() => {
    return deviceHistory
        .slice(-50)
        .map(record => ({
            time: new Date(record.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            value: parseFloat(record.value) || 0,
        }));
}, [deviceHistory]);

    if (isLoading) {
        return <div className="text-center pb-20 mt-20 text-xl">Загрузка данных устройства...</div>;
    }

    if (error) {
        return <div className="text-center mt-20 text-xl text-red-500">Ошибка при загрузке данных: {error.message}</div>;
    }

    if (!deviceData) {
        return <div className="text-center mt-20 text-xl">Данные устройства не найдены.</div>;
    }

    return (
        <div className="mt-12 p-5 mx-20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div
                    className="shadow-xl col-span-1 relative h-96 rounded-4xl bg-gray-200 bg-cover bg-center cursor-pointer hover:scale-102 transition-transform duration-300 ease-in-out"
                    style={{ backgroundImage: `url(${deviceImage})` }}
                    onClick={() => setIsFullScreen(true)}
                >
                </div>

                <div className="graph-div flex col-span-3 flex-col gap-5">
                    <div className="shadow bg-white rounded-2xl p-4 h-15 flex items-center justify-around">
                        <Tag style={statusStyle} content={statusContent} />
                        <Tag content={`Последний замер ${latestMeasurementTime}`} />
                        {deviceData.roomId && (
                            <Link to={`/room/${encodeURIComponent(deviceData.roomId)}`}>
                                <Tag style={"text-gray-400 hover:scale-105"} content={"← Назад к офису"} />
                            </Link>
                        )}
                        <Link to={"/devices"}>
                            <Tag style={"text-gray-400 hover:scale-105"} content={"← Назад к устройствам"} />
                        </Link>
                    </div>

                    <div className="shadow bg-white rounded-2xl p-4 flex flex-col gap-3">
                        <h3 className="text-xl font-medium text-brown mb-2">Характеристики устройства</h3>
                        <p className="text-gray-700"><strong>Имя устройства:</strong> {trimString(deviceData.name || 'Без имени', 40)}</p>
                        <p className="text-gray-700"><strong>Тип:</strong> {deviceData.type || 'Неизвестен'}</p>
                        <p className="text-gray-700"><strong>ID устройства:</strong> {trimString(deviceId, 40)}</p>
                        <p className="text-gray-700"><strong>ID комнаты:</strong> {trimString(deviceData.roomId, 40)}</p>
                        <p className='text-gray-700'><strong>ID оборудования:</strong> {deviceData.hardware_id || 'Неизвестен'}</p>
                        <p className="text-gray-700"><strong>Последнее значение:</strong> {deviceData.last_value === "false" ? "N/A" : deviceData.last_value}</p>
                    </div>

                     {chartData.length > 0 && (
                 <div className="shadow bg-white rounded-2xl p-4 flex flex-col gap-3">
                    <h3 className="text-xl font-medium text-brown mb-2">График последних 50 показаний</h3>
                    <div className='graph-div' style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <LineChart className='graph-div' data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="time" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="value" name="Значение" stroke="#a52a2a" strokeWidth={2} activeDot={{ r: 8 }}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

                    <div className="shadow bg-white rounded-2xl p-4 flex flex-col gap-3">
                        <h3 className="text-xl font-medium text-brown mb-2">История показаний за 24 часа</h3>
                        {deviceHistory.length > 0 ? (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Время</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Значение</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 max-h-96 overflow-y-auto">
                                            {[...displayedHistory].reverse().map((record, index) => (
                                                <tr key={record.timestamp || index}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(record.timestamp).toLocaleString()}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {deviceHistory.length > 20 && (
                                    <button 
                                        onClick={() => setShowAllHistory(!showAllHistory)}
                                        className="text-center text-brown opacity-80 hover:text-brown hover:opacity-100  transition-all duration-300 font-regular mt-2"
                                    >
                                        {showAllHistory ? 'Свернуть список' : 'Открыть список полностью'}
                                    </button>
                                )}
                            </>
                        ) : (
                            <p className="text-gray-500">Нет данных истории за выбранный период.</p>
                        )}
                    </div>
                </div>
            </div>


            {isFullScreen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 cursor-zoom-out"
                    onClick={() => setIsFullScreen(false)}
                >
                    <img
                        src={deviceImage}
                        alt={`Устройство ${deviceData.name || 'Неизвестное устройство'}`}
                        className="w-[80vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                    />
                </div>
            )}
        </div>
    );
};

export default DevicePage;