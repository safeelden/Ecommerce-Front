"use client";

import Link from 'next/link';
import { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import BarsIcon from './icons/BarsIcon';
import { useMediaQuery } from 'react-responsive';


export default function Header(){
    const [mobileNavActive, setMobileNavActive] = useState(true);
    const {cartProducts} = useContext(CartContext);
    const isSmallScreen = useMediaQuery({ maxWidth: 768 });

    return(
        <header>
            <div className='bg-zinc-900 text-white flex p-7 justify-between'>
                <Link className='relative z-3 text-2xl' href={'/'}>Ecommerce</Link>
                <nav className={`flex ${isSmallScreen ? 'flex-col mt-12 gap-4 h-screen mr-auto' : 'md:flex md:ml-auto md:gap-5'} ${mobileNavActive ? 'hidden' : ''} bg-zinc-900`}>
                    <Link className='link' href={'/'}>Home</Link>
                    <Link className='link' href={'/products'}>All products</Link>
                    <Link className='link' href={'/categories'}>Categories</Link>
                    <Link className='link' href={'/account'}>Account</Link>
                    <Link className='link' href={'/cart'}>cart ({cartProducts.length})</Link>
                </nav>
                <button className='z-3 mb-auto md:hidden' onClick={() => setMobileNavActive(prev => !prev)}>
                    <BarsIcon/>
                </button>
            </div>
        </header>
    );
}