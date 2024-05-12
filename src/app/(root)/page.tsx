import Image from "next/image";
import hero from "@/public/assets/images/hero.png"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllEvents } from "@/lib/actions/eventAction";
import { SearchParamProps } from '@/types';
import Collection from "@/components/shared/Collection";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6
  })

  return (
    <div>
      <section className="bg-slate-50 bg-dotted-pattern bg-containe py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              From Concept to Celebration, We&apos;ve Got You Covered.
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Welcome to <strong>Event In</strong> the ultimate solution for event organizers! Whether you&apos;re planning a corporate conference, a charity gala, or a birthday bash, our platform is designed to streamline every aspect of event management. From ticketing to promotion, we&apos;ve got you covered!
            </p>

            <Button asChild size="lg" className="button w-full sm:w-fit">
              <Link href="#">
                Explore Now
              </Link>
            </Button>
          </div>
          <Image src={hero} alt="hero" width={1000} height={1000} className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]" />
        </div>
      </section>

      <section id="events" className=" wrapper my-8flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">
          Trusted by Thousands of Event Organizers
        </h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          search categories
        </div>

        <Collection 
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </div>
  );
}
