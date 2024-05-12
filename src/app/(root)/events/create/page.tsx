import EventForm from '@/components/shared/EventForm'
import { auth } from '@clerk/nextjs'
import React from 'react'

const CreateEvent = () => {

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="bg-slate-50 bg-dotted-pattern bg-cover bg-center pt-4 md:py-8">
        <h3 className='wrapper h3-bold text-center sm:text-left'>Create Event</h3>
    </section>

    <div className="wrapper">
        <EventForm userId={userId} type="Create" />
    </div>
    </>
  )
}

export default CreateEvent