import { useParams, useSearchParams } from "react-router-dom";

const RoomPage = () => {
    const { roomId } = useParams();
    const [searchParams] = useSearchParams(); // Получаем объект с параметрами запроса
    const imagePath = searchParams.get('imagePath');
    return (
        <div className="grid mt-12 grid-cols-4 gap-5 p-5 mx-20">
            <div className="shadow-xl relative w-60 h-60 rounded-4xl bg-gray-200 bg-cover hover:scale-102"
                        style={{backgroundImage: `url(${imagePath})`}}
                    >
                        {console.log(roomId)}
            </div>
        </div>
    )
}

export default RoomPage