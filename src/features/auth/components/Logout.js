import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync, selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";


function Logout() {
    const user = useSelector(selectLoggedInUser);
    const dispatch= useDispatch();
    useEffect(()=>{
        dispatch(logoutAsync(user))
    })
    return ( <>
    <div>Signing Out...</div>
    {!user && <Navigate to="/login"></Navigate>}
    </> );
}

export default Logout;