"use client"
import { IEvent } from '@/lib/database/models/eventModel'
import React from 'react'
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs"
import { Button } from '../ui/button'
import Link from 'next/link'
import Checkout from './Checkout'

const CheckoutButton = ({event} : {event : IEvent } ) => {
    const { user } = useUser();
    const userId = user?.publicMetadata.userId as string
    const isEventClosed = new Date(event.startDate) > new Date() || new Date(event.endDate) < new Date();
    
  return (
    <div className='flex item-center gap-3'>
        {
            isEventClosed ? (
                <p className='px-2 text-red-400 font-bold'>
                 Sorry, tickets are not currently available
                </p>
            ) : (
                <>
                <SignedOut>
                    <Button asChild className='button rounder-lg size-lg'>
                        <Link href={"/sign-in"}>
                            Get Tickets
                        </Link>
                    </Button>
                </SignedOut>

                <SignedIn>
                    <Checkout event={event} userId={userId} />
                </SignedIn>
                </>
            )
        }
    </div>
  )
}

export default CheckoutButton