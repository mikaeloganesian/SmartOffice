import connect from '../assets/connect.png'

const Room = ( {count, name, imagePath} ) => {
    return (
        <div className="shadow-xl relative w-60 h-60 rounded-4xl bg-gray-200 bg-cover hover:scale-102 group" // Добавляем 'group' сюда
            style={{backgroundImage: `url(${imagePath})`}}
        >
            <div className="inline-flex items-center gap-2 absolute rounded-4xl top-4 left-4 px-4 py-1 bg-gray-100 shadow-md text-brown opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <img className='w-4 h-4' src={connect} />{count}
            </div>

            <div className="absolute flex justify-center items-center rounded-4xl top-4 right-4 w-10 h-10 bg-gray-100 shadow-md text-brown hover:bg-brown hover:text-white hover:cursor-pointer opacity-0 group-hover:opacity-100 transition duration-300">
                →
            </div>

            <div className="absolute rounded-4xl bottom-4 left-4 px-4 py-1 bg-brown shadow-md text-white">{name}</div>
        </div>
    )
}

export default Room