
const Device = ( {value, name, imagePath, status} ) => {
    return (
        <div className="shadow-xl relative h-60 rounded-4xl bg-gray-200 bg-cover bg-center"
            style={{backgroundImage: `url(${imagePath})`}}
        >
            <div className="inline-flex items-center gap-2 absolute rounded-4xl top-4 left-4 px-4 py-1 bg-gray-100 shadow-md text-brown">{status}</div>
            <div className="absolute flex justify-center items-center rounded-4xl top-4 right-4 px-3 py-1 bg-gray-100 shadow-md text-brown">{value}</div>
            <div className="absolute rounded-4xl bottom-4 left-4 px-4 py-1 bg-gray-100 shadow-md text-brown">{name}</div>
        </div>
    )
}

export default Device