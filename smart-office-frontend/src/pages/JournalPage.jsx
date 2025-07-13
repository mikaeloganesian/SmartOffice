import React, { useState, useMemo } from "react";
import useAllSensorData from "../utils/useAllSensorsDataHook"; // Убедитесь, что этот хук возвращает данные в нужном порядке (от новых к старым)

const JournalPage = () => {
    const { allRecords, isLoading, error } = useAllSensorData();

    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("timestamp");
    const [sortOrder, setSortOrder] = useState("desc");
    const [recordsPerPage, setRecordsPerPage] = useState(10);

    const filteredAndSortedRecords = useMemo(() => {
        let currentRecords = [...allRecords];

        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            currentRecords = currentRecords.filter(record =>
                (record.roomName?.toLowerCase().includes(lowerCaseSearchTerm)) ||
                (record.deviceName?.toLowerCase().includes(lowerCaseSearchTerm)) ||
                (record.value?.toString().toLowerCase().includes(lowerCaseSearchTerm)) ||
                (new Date(record.timestamp).toLocaleString().toLowerCase().includes(lowerCaseSearchTerm))
            );
        }

        currentRecords.sort((a, b) => {
            let valA, valB;

            switch (sortBy) {
                case "roomName":
                    valA = a.roomName || '';
                    valB = b.roomName || '';
                    break;
                case "deviceName":
                    valA = a.deviceName || '';
                    valB = b.deviceName || '';
                    break;
                case "value":
                    valA = parseFloat(a.value);
                    valB = parseFloat(b.value);
                    if (a.value === "false" || isNaN(valA)) valA = -Infinity;
                    if (b.value === "false" || isNaN(valB)) valB = -Infinity;
                    break;
                case "timestamp":
                default:
                    valA = new Date(a.timestamp).getTime();
                    valB = new Date(b.timestamp).getTime();
                    break;
            }

            if (typeof valA === 'string' && typeof valB === 'string') {
                return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
            } else {
                return sortOrder === "asc" ? valA - valB : valB - valA;
            }
        });

        return currentRecords.slice(0, recordsPerPage);
    }, [allRecords, searchTerm, sortBy, sortOrder, recordsPerPage]);


    if (isLoading) {
        return <div className="text-center pb-20 mt-20 text-xl">Загрузка всех записей датчиков...</div>;
    }

    if (error) {
        return <div className="text-center mt-20 text-xl text-red-500">Ошибка при загрузке записей: {error.message}</div>;
    }

    return (
        <div className="bg-white rounded-2xl shadow grid mt-12 grid-cols-10 gap-5 p-5 mx-20 pb-20">
            <div className="col-span-10 flex flex-wrap gap-4 p-2 items-center border-b border-gray-200 mb-4">
                <input
                    type="text"
                    placeholder="Поиск по записям..."
                    className="p-2 border border-gray-300 rounded-md flex-grow"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    className="p-2 border text-brown border-gray-300 rounded-md"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="timestamp">Сортировать по Дате</option>
                    <option value="roomName">Сортировать по Комнате</option>
                    <option value="deviceName">Сортировать по Устройству</option>
                    <option value="value">Сортировать по Значению</option>
                </select>

                <select
                    className="text-brown p-2 border border-gray-300 rounded-md"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="desc">По убыванию</option>
                    <option value="asc">По возрастанию</option>
                </select>

                <select
                    className="text-brown p-2 border border-gray-300 rounded-md"
                    value={recordsPerPage}
                    onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                >
                    <option value={10}>Показать 10</option>
                    <option value={50}>Показать 50</option>
                    <option value={100}>Показать 100</option>
                    <option value={allRecords.length}>Показать все</option>
                </select>
            </div>

            <div className="text-brown grid mb-2 col-span-10 grid-cols-10 gap-4 p-2 items-center border-b border-gray-200">
                <div className="text-sm col-span-2 font-bold">Дата и время</div>
                <div className="text-sm col-span-3 font-bold">Комната</div>
                <div className="text-sm col-span-3 font-bold">Устройство</div>
                <div className="text-sm col-span-2 font-bold">Значение</div>
            </div>

            {filteredAndSortedRecords.length > 0 ? (
                filteredAndSortedRecords.map((record, index) => (
                    <React.Fragment key={record.timestamp + record.deviceId + index}>
                        <div className="text-sm col-span-2 text-gray-700">
                            {new Date(record.timestamp).toLocaleString()}
                        </div>
                        <div className="text-sm col-span-3 text-gray-700">
                            {record.roomName || 'N/A'}
                        </div>
                        <div className="text-sm col-span-3 text-gray-700">
                            {record.deviceName || 'N/A'}
                        </div>
                        <div className="text-sm col-span-2 text-gray-700">
                            {record.value === "false" ? "N/A" : record.value}
                        </div>
                    </React.Fragment>
                ))
            ) : (
                <div className="col-span-10 text-center text-lg text-gray-500 py-10">
                    {searchTerm ? "По вашему запросу ничего не найдено." : "Нет записей по датчикам за последние 24 часа."}
                </div>
            )}
        </div>
    );
}

export default JournalPage;