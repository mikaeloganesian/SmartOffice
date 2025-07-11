import Room from "../components/Room";
import { Link } from "react-router-dom";

const RoomsPage = () => {
    const data = {
        1: {status: "3", name: "Офис 1", imagePath: "https://estima.ru/upload/iblock/cb3/jfw0kcksfi5eadipyulv3knderpthbnf.jpg"},
        2: {status: "4", name: "Офис 2", imagePath: "https://cdn2.inmyroom.ru/uploads/photo/file/a8/a8e4/base_a8e4096a-9249-4fbe-870d-b08d03a78f24.jpg"},
        3: {status: "2", name: "Офис 3", imagePath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Ze3zs7DRiq_f7akv5f6dGZ-NiSO3adgYqw&s"},
        4: {status: "3", name: "Офис 4", imagePath: "https://spb.studio-mint.ru/sites/default/files/sites/default/files/imce/2_27.jpg"},
        5: {status: "2", name: "Офис 5", imagePath: "https://interior-design.moscow/wp-content/uploads/2017/05/dizayn-ofisa-v-sovremennom-stile-foto-01-1200x675.jpg"}
    };

    const roomKeys = Object.keys(data);

    return (
        <div className="grid mt-12 grid-cols-4 gap-5 p-5 mx-20">
            {roomKeys.map((key) => {
                return <Link to={`/room/${key}?imagePath=${encodeURIComponent(data[key].imagePath)}`}><Room key={key} count={data[key].status} imagePath={data[key].imagePath} name={data[key].name} /></Link>;
            })}
        </div>
    );
}

export default RoomsPage