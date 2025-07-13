import Note from "../components/Note";
const JournalPage = () => {
    return (
        
        <div className="bg-white rounded-2xl shadow grid mt-12 grid-cols-10 gap-5 p-5 mx-20 pb-20">
            <div className="grid mb-2 col-span-10 grid-cols-10 gap-4 p-2 items-center border-b border-gray-200">
                <div className="text-sm col-span-3 font-bold">Дата</div>
                <div className="text-sm col-span-3 font-bold">Уровень</div>
                <div className="text-sm col-span-3 font-bold">Имя</div>
                <div className="text-sm col-span-1 font-bold">Значение</div>
            </div>
            <Note level={"low"} />
            <Note level={"medium"} />
            <Note level={"low"} />
            <Note level={"high"} />
        </div>
    );
}

export default JournalPage