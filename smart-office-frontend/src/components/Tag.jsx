const Tag = ({ content, style={} }) => {
    return (
        <div  className={`bg-gray ${style} text-brown shadow px-4 py-1 rounded-2xl`}>
            { content }
        </div>
    )
}

export default Tag