import NavBar from "../features/nav-bar/NavBar";
import { UserOrders } from "../features/user/components/UserOrders";

function UserOrdersPage() {
    return ( <div>
        <NavBar>
            <UserOrders>
                
            </UserOrders>
        </NavBar>
    </div> );
}

export default UserOrdersPage;