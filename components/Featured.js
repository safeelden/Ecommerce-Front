"use client";

import Link from 'next/link';
import CartIcon from './icons/CartIcon';
import { useContext } from 'react';
import { CartContext } from './CartContext';

export default function Featured({product}){
    const {addProduct} = useContext(CartContext);
    const id = product._id;
    function addFeaturedToCart(){
        addProduct(product._id);
    }
    return(
        <div className="p-7 relative bg-zinc-900 text-white  gap-6 pt-15 grid grid-cols-1 md:grid md:grid-cols-2 md:gap-12">
            <div  className='md:order-2'>
                <img src="https://www.freepnglogos.com/uploads/macbook-png/macbook-cleanmymac-the-best-mac-cleanup-app-for-macos-get-32.png"/>
            </div>
            <div className="md:order-1 flex items-center">
                <div>
                    <h1 className="flex md:text-7xl text-4xl">{product.title}</h1>
                    <p className="text-gray-300 font-sans mt-5">
                        {product.description}
                    </p>
                    <div className="flex flex-row gap-3 mt-6">
                        <Link href={{pathname: "/product/"+product._id,
                                    query: {id},}}
                className="btn-outline">Read more</Link >
                        <button onClick={addFeaturedToCart} className="btn-primary-lg flex flex-row gap-1">
                            <CartIcon/>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}