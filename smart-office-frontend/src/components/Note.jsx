const Note = ({level}) => {
    return (
        <div className="grid col-span-10 grid-cols-10 gap-4 p-2 items-center border-b border-gray-200">
            <div className="text-sm col-span-3 font-medium">21.01.2025</div>
            <div className={`${level == 'low' ? 'text-green-700' : level == 'medium' ? 'text-amber-500' : 'text-red-700'} text-sm col-span-3 font-medium`}>{level}</div>
            <div className="text-sm col-span-3 font-medium">Термометр - FJ14O</div>
            <div className="text-sm col-span-1 font-medium">33°</div>
        </div>
    );
}

export default Note;