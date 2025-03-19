import React, { createContext } from 'react';
import { products } from '../assets/assets';



const ShopContextProvider = (props) => {
    const total = 10;
    const currency = '$';
    const deliveryFee = total * 0.15;
    const value = {
        products, currency, deliveryFee
    };
   
  return (
    <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>
  );

};

export const ShopContext = createContext();
export default ShopContextProvider;
