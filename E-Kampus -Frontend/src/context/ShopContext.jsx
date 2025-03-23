import React, { createContext, useState } from 'react';
import { products } from '../assets/assets';



const ShopContextProvider = (props) => {
    const total = 10;
    const currency = '$';
    const deliveryFee = total * 0.15;
    const[search, setSearch] = useState('', false);
    const [showSearch, setShowSearch] = useState(false);

    const value = {
        products, currency, deliveryFee,
        search, setSearch, showSearch, setShowSearch
    };
   
  return (
    <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>
  );

};

export const ShopContext = createContext();
export default ShopContextProvider;
