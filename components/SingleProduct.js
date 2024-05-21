"use client";

import CartIcon from "@/components/icons/CartIcon";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import Header from "./Header";

const inActive = "border border-solid border-transparent p-2 imageButton";
const active = "border border-solid border-blue-800 imageButton";

export default function SingleProduct({product}){
    const [activeImage, setActiveImage] = useState(product.images?.[0])
    const {addProduct} = useContext(CartContext);
    return(
        <>
            <Header/>
            <div className="center">
                <div className="">
                <div className="grid md:grid-cols-7 grid-cols-1 text-center gap-10">
                        <div className="col-span-3">
                            <div className="whiteBox">
                                <div className="flex justify-center">
                                    <img className="max-h-64 max-w-full" src={activeImage}/>
                                </div>
                                <div className="grid md:grid-cols-5 grid-cols-3 imagesButtons">
                                    {product.images.map( image => (
                                        <div className={activeImage === image ? active : inActive}
                                            key={image}
                                            active={image === activeImage}
                                            onClick={() => setActiveImage(image)}>
                                            <img src={image} alt=""/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-4 ">
                            <div className="box-font">{product.title}</div>
                            <div className="mt-10 text-lg font-medium">{product.description}</div>
                            <div className="flex gap-10 pt-12 pl-5 items-center">
                                <div className="text-3xl font-semibold">
                                    ${product.price}
                                </div>
                                <div>
                                    <button
                                    onClick={() => addProduct(product._id)}
                                    className="btn-primary-sm">
                                        <CartIcon/>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                </div>
                </div>
            </div>
        </>
    );
}