"use server"

import { CheckoutOrderParams } from "@/types"
import { redirect } from "next/navigation";
import Stripe from "stripe";

export const checkOutOrder = async (newOrder : CheckoutOrderParams ) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const price = newOrder.isFree ? 0 : Number(newOrder.price) * 100;
   try {
    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: newOrder.eventTitle,
              },
              unit_amount: price,
            },
            quantity: 1,
          },
        ],
        metadata: {
            eventId: newOrder.eventId,
            buyerId: newOrder.buyerId,
        },
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
      });

      redirect(session.url!);
   } catch (error) {
     throw error;
   }
}