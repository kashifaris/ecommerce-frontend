import { useSelector} from "react-redux/es/hooks/useSelector";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../authSlice";

function Protected ({children}) {
    const user = useSelector(selectLoggedInUser)
    console.log("indise protected User",user)
    if(!user){
        return <Navigate to='/login'></Navigate>
    }
    return children;
}

export default Protected;