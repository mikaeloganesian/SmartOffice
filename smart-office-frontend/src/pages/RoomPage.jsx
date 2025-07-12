import React, { useState } from 'react';
import { Link, useParams, useSearchParams } from "react-router-dom";

import Tag from "../components/Tag";
import Device from '../components/Device';

import testImage from '../assets/test-images/temp.jpg'

const RoomPage = () => {
    const { roomId } = useParams();
    const [searchParams] = useSearchParams();
    const imagePath = searchParams.get('imagePath');

    const [isFullScreen, setIsFullScreen] = useState(false);

    if (!imagePath) {
        return (
            <div className="mt-12 p-5 mx-20 text-red-600">
                <h2>Ошибка: Адрес изображения не найден для комнаты ID: {roomId}.</h2>
            </div>
        );
    }

    return (
        <div className="mt-12 p-5 mx-20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                <div
                    className="shadow-xl col-span-1 relative h-96 rounded-4xl bg-gray-200 bg-cover bg-center cursor-pointer hover:scale-102 transition-transform duration-300 ease-in-out"
                    style={{ backgroundImage: `url(${imagePath})` }}
                    onClick={() => setIsFullScreen(true)}
                >
                </div>

                <div className="flex col-span-3 flex-col gap-5">
                    <div className="shadow bg-white rounded-2xl p-4 h-15 flex items-center justify-around">
                            <Tag style='text-green-600' content={"● All Online"} />
                            <Tag content={"Офис номер 2"} />
                            <Tag content={"Последний замер 21.09 13:45"} />
                            <Link to={"/"}><Tag style={"text-gray-400 hover:scale-105"} content={"← Назад"} /></Link>
                    </div>

                    <div className="grid grid-cols-3 gap-5">
                        <Device size='m' value="24.2°" name="Термометр - B142" imagePath={testImage} status="● Online" />
                        <Device size='m' value="752 мрс" name="Тонометр - h43KSA" imagePath={"https://cdn.dribbble.com/userupload/7759886/file/original-b65f49e2ce45203a828f23fc0066c0b1.png?format=webp&resize=400x300&vertical=center"} status="● Online" />
                        <Device size='m' value="24.2°" name="Температура - Xi12" imagePath={testImage} status="● Online" />

                    </div>
                </div>

            </div>

            {isFullScreen && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50 cursor-zoom-out"
                    onClick={() => setIsFullScreen(false)}
                >
                    <img
                        src={imagePath}
                        alt={`Комната ${roomId}`}
                        className="w-[80vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                    />
                </div>
            )}
        </div>
    );
};

export default RoomPage;