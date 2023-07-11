import { useSelector} from "react-redux/es/hooks/useSelector";
import { Navigate } from "react-router-dom";
import { selectCheckedUser, selectLoggedInUser } from "../authSlice";
import { selectUserInfo } from "../../user/userSlice";

function ProtectedAdmin ({children}) {
    const user = useSelector(selectLoggedInUser)
    const userInfo = useSelector(selectUserInfo)
    const checkedUser = useSelector(selectCheckedUser)
   if(!user){
        return <Navigate to='/login'></Navigate>
    }
    if(userInfo.role!=='admin'){
        return <Navigate to='/'></Navigate>
    }
    return children;
}

export default ProtectedAdmin;