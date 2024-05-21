import { mongooseConnect } from '@/lib/mongoose';
import { Order } from '@/models/Order';
const stripe = require('stripe')(process.env.STRIPE_SK);
import { NextResponse } from "next/server";

export async function POST(req) {
    await mongooseConnect();
    const sig = await req.headers.get('stripe-signature');
    const body = await req.text()

    try {       
        const event = stripe.webhooks.constructEvent(body, sig, process.env.endpointSecret);

        console.log('Event:', event);

        switch (event.type) {
            case 'checkout.session.completed':
                const data = event.data.object;
                console.log(data);
                const orderId = data.metadata.orderId;
                const paid = data.payment_status === "paid";
                if(orderId && paid) {
                    await Order.findByIdAndUpdate(orderId,{ paid: true})
                }
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Error constructing event:', error.message);
        return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
    }
}

export const config = {
    api: {
        bodyParse: false,
    },
};

//zeal-master-clean-wisely
//acct_1PDZmxKVPiMcouXq