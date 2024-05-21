import ProductBox from "./ProductBox";

export default function NewProducts({products}){
    return(
        <div className="center">
                <div className="text-4xl font-sans mb-5">New Arrivals</div>
                <div className="productsShow">
                    {products?.length > 0 && products.map(product => (
                        <ProductBox key={product._id} product={product}/>
                    ))}
                </div>
        </div>
    );
}