const Device = ( {value, name, imagePath, status, size="xxl"} ) => {
    return (
        <div className={`shadow ${size == "xl" ? "col-span-2" : size == "xxl" ? "col-span-3" : ""} relative h-60 rounded-4xl bg-white bg-center group`}
            style={{backgroundImage: `url(${imagePath})`, backgroundSize: size=="xl" ? 'auto 100%' : size == "xxl" ? "auto 100%" : "auto 100%", backgroundRepeat: 'no-repeat'}}
        >
            <div className="inline-flex items-center gap-2 absolute rounded-4xl top-4 left-4 px-6 py-2 bg-gray-100 shadow-md text-brown opacity-0 group-hover:opacity-100 transition-opacity duration-300">{status}</div>
            <div className="absolute flex justify-center items-center rounded-4xl top-4 right-4 px-2 py-2 bg-gray-100 shadow-md text-brown opacity-0 group-hover:opacity-100 transition-opacity duration-300">{value}</div>
            <div className="absolute rounded-4xl bottom-4 left-4 px-8 py-2 bg-brown shadow-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">{name}</div>
        </div>
    )
}

export default Device