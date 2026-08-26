const UserImage = ({image}) => {
    return (
        <div>
            <img className="rounded-full shadow-[0_0_5px_0_rgba(0,0,0,0.3)]" style={{width: '50px', height: '50px'}}
            src={`http://localhost:5174/assets/${image}`} alt="" />
        </div>
    )
}

export default UserImage;