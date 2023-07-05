import React from 'react'
import NavBar from '../features/nav-bar/NavBar';
import {AdminProductList} from '../features/admin/components/AdminProductList'
function AdminHomePage() {
    return (  
    <NavBar>
        <AdminProductList>
        </AdminProductList>
    </NavBar>
    );
}

export default AdminHomePage;