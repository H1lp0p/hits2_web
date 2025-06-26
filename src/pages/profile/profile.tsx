import { useEffect, useState } from "react";
import { useAxios } from "../../hooks/use-axios"



export const ProfilePage: React.FC = () => {

    const api = useAxios();

    const [data, setData] = useState();

    useEffect(() => {
        
    })

    return (
        <div>
            {/* Avatar column */}
            <div>

            </div>

            {/* Full info column */}

            <div>

            </div>
        </div>
    )
}