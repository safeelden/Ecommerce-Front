import Header from "@/components/Header";
import SingleProduct from "@/components/SingleProduct";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";


export default async function ProductPage({searchParams}){
    const {id} = searchParams;
    const product = await GetProduct(id);
    return(
        <>
            <SingleProduct product={product}/>
        </>
    );
}

export async function GetProduct(id){
    await mongooseConnect();
    const product = await Product.findById(id);
    return JSON.parse(JSON.stringify(product));
}