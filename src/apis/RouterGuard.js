import { useContext, useEffect } from "react"
import { AuthContext } from "./context/AuthTokenContext";
import {useNavigate} from 'react-router-dom'; 

const RouterGuard = ({element: Element}) => {

    const { token } = useContext(AuthContext);

    const navigate = useNavigate();
    
    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    if (!token) {
        return null;
    }

    return <Element />;
}
export default RouterGuard;