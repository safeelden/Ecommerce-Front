import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";


export async function POST(req) {
    await mongooseConnect();
    
    const {ids} = await req.json();
    const data = await Product.find({ _id: ids});

    return Response.json(data);
  }
