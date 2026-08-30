const UserImage = ({image}) => {
    return (
        <div>
            <img className="rounded-full shadow-[0_0_5px_0_rgba(0,0,0,0.3)]" style={{width: '50px', height: '50px'}}
            src={`${import.meta.env.VITE_API_URL}/assets/${image}`} alt="" />
        </div>
    )
}

export default UserImage;