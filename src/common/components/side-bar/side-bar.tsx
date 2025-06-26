import { useMySelector } from "../../../hooks/my-selector";

const SideBar : React.FC = ( ) => {

    const state = useMySelector((state) => state)

    const userAvatar = useMySelector((state) => state.profile.avatar)
    

    return (
        <div>
            <span>avatar</span>
            <div>
                {userAvatar.state === "pending" && <span>loading ...</span>} 
                {userAvatar.state === 'success' &&
                    userAvatar.avatarBase64 && <img src={userAvatar.avatarBase64} alt="user avatar"/>}
                {userAvatar.state === 'error' && <span>error</span>}
            </div>
        </div>
    );
}

export default SideBar;