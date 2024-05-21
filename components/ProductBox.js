"use client";

import Link from 'next/link';
import { useContext } from 'react';
import { CartContext } from './CartContext';

export default function ProductBox({product}){
    const {addProduct} = useContext(CartContext);
    const id = product._id;
    return(
        <>
        <div>
            <Link href={{pathname: "/product/"+product._id,query: {id},}}
                className="product-box">
                <img className=" " src={product.images?.[0]} alt=""/>
            </Link>
            <div>
                <Link href={{pathname: "/product/"+product._id,query: {id},}}
                 className=" font-bold text-0.5xl mt-2">{product.title}</Link>
                <div className="flex md:items-center md:justify-between mt-1 flex-col gap-1 md:flex-row">
                    <div className="md:text-xl font-bold text-sm text-right">${product.price}</div>
                    <button onClick={() => addProduct(product._id)} className="btn-primary-outline">Add To Cart</button>
                </div>
            </div>
        </div>
        </>
    );
}

