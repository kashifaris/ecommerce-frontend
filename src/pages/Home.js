import React from 'react'
import NavBar from '../features/nav-bar/NavBar';
import { ProductList } from '../features/product-list/components/ProductList';

function Home() {
    return (  
    <NavBar>
        <ProductList>
            
        </ProductList>
    </NavBar>
    );
}

export default Home;