"use client";

import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function CartPage() {
    const {cartProducts, addProduct, removeProduct, clearCart} = useContext(CartContext);
    const [products, setProducts] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [isSuccess, SetIsSuccess] = useState(false);


    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post("/api/cart", { ids: cartProducts })
                .then(Response => {
                    setProducts(Response.data);
                })
        }
        else{
            setProducts([]);
        }
    }, [cartProducts]);
    
    function moreOfThisProduct(id){
        addProduct(id);
    }
    function lessOfThisProduct(id){
        removeProduct(id)
    }
    let total = 0;
    for(const productId of cartProducts){
        const price = products.find(p => p._id === productId)?.price || 0 ;
        total += price;
    }
    async function goToPayment(){
        const Response = await axios.post("/api/checkout", 
        {name, email, city, postalCode, country, streetAddress, cartProducts});
        if(Response.data.url) {
            window.location = Response.data.url
        }
    }
    useEffect(() => {
        if(window.location.href.includes("success")){
            clearCart();
            SetIsSuccess(true);
        }
    }, [])
    if(isSuccess) {
        return(
            <>
            <Header/>
            <div className="center">
                <div className="box">
                    <div className="box-font">Thank You For Your Order</div>
                    <div>We Will Email You When Your Order Will Be Sent</div>
                </div>
            </div>
            </>
        )
    }

    return(
        <>
            <Header/>
            <div className="center">
                <div className="md:grid md:grid-cols-3 grid grid-cols-1 gap-10">
                    <div className="box p-9">
                        <div className="box-font">Cart</div>
                        {!cartProducts?.length && (
                            <div>Your Cart is Empty</div>
                        )}
                        {products?.length > 0 && (
                            <table className="basic">
                                <thead>
                                    <tr className="">
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th className="pl-4">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                    <tr key={product._id}>
                                            <td className="mt-2 pl-3">
                                                <td className="productImgBox ">
                                                    <img className=""
                                                    src={product.images?.[0]}/>
                                                </td>
                                                <td>{product.title}</td>
                                            </td>
                                            <td>
                                                <button className="btn-quantity" onClick={() => removeProduct(product._id)}>-</button>
                                                <span className="md:my-0 md:mx-2">{cartProducts.filter(id => id === product._id).length}</span>
                                                <button className="btn-quantity"  onClick={() => moreOfThisProduct(product._id)}>+</button>
                                            </td>
                                        <td className="pl-4">${cartProducts.filter(id => id === product._id).length * product.price}</td>
                                    </tr>
                                    ))}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td className="pl-4">${total}</td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
                    </div>
                        {!!cartProducts?.length && (
                            <div className="form-box">
                                <h2 className="box-font py-8">Order information</h2>
                                    <input className="styledInput" 
                                            type="text" 
                                            placeholder="Name" 
                                            defaultValue={name}
                                            name="name" 
                                            onChange={ev => setName(ev.target.value)}/>
                                    <input className="styledInput" 
                                            type="text" placeholder="Email"                                 
                                            defaultValue={email}
                                            name="email" 
                                            onChange={ev => setEmail(ev.target.value)}/>
                                    <div className="flex gap-1">
                                        <input className="styledInput" 
                                                type="text" placeholder="City"                                 
                                                defaultValue={city}
                                                name="city" 
                                                onChange={ev => setCity(ev.target.value)}/>
                                        <input className="styledInput" 
                                                type="text" placeholder="Postal Code"                                 
                                                defaultValue={postalCode}
                                                name="postalCode" 
                                                onChange={ev => setPostalCode(ev.target.value)}/>
                                    </div>
                                    <input className="styledInput" 
                                            type="text" placeholder="Street Address"                                 
                                            defaultValue={streetAddress}
                                            name="StreetAddress"
                                            onChange={ev => setStreetAddress(ev.target.value)}/>
                                    <input className="styledInput" 
                                            type="text" 
                                            placeholder="Country"                                 
                                            defaultValue={country}
                                            name="country"
                                            onChange={ev => setCountry(ev.target.value)}/>
                                    <input defaultValue={cartProducts}
                                            name="products"
                                            type="hidden"/>
                                    <button onClick={goToPayment} className="btn-pay">continue to payment</button>
                            </div>
                        )}
                </div>
            </div>
        </>
    );
}