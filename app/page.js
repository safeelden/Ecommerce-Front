import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";


export default async function Home() {
  const FeaturedProduct = await getFeaturedProduct();
  const newProducts = await getNewProducts();
  return (
    <div>
        <Header/>
        <Featured product = {FeaturedProduct}/>
        <NewProducts products = {newProducts}/>
    </div>
  );
}

export async function getFeaturedProduct() {
  await mongooseConnect();
  const featuredProductId = "65fc899cc9337f6c0e8f5cf9"
  const FeaturedProduct = await Product.findById(featuredProductId);
  return JSON.parse(JSON.stringify(FeaturedProduct));
}
export async function getNewProducts() {
  await mongooseConnect();
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
  return JSON.parse(JSON.stringify(newProducts));
}