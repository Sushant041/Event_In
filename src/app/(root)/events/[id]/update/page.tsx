import EventForm from '@/components/shared/EventForm'
import { getEventById } from '@/lib/actions/eventAction';
import { auth } from '@clerk/nextjs'
import React from 'react'

const UpdateEvent = async ({params: { id } }: { params:{
  id: string
} } ) => {

    const event = await getEventById(id);
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
  return (
    <>
      <section className="bg-slate-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className='wrapper h3-bold text-center sm:text-left'>Update Event</h3>
    </section>

    <div className="wrapper my-8">
        <EventForm userId={userId} type="Update" event={event} />
    </div>
    </>
  )
}

export default UpdateEvent