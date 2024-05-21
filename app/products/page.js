import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function ProductsPage(){
    const products = await GetAllProducts();
    return(
        <>
        <Header/>
            <div className="center">
                <div className="box-font">All Products</div>
                    <div className="productsShow">
                        {products?.length > 0 && products.map(product => (
                                <ProductBox key={product._id} product={product}/>
                            ))}
                    </div>
            </div>
        </>
    );
}

export async function GetAllProducts(){
    await mongooseConnect();
    const products = await Product.find({}, null, {sort: {'_id':-1}});
    return JSON.parse(JSON.stringify(products));
}