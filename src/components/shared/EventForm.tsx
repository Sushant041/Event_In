"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { eventFormSchema } from "@/lib/validator"
import { eventDefaultValues } from "@/constants"
import Dropdown from "./Dropdown"
import { Textarea } from "../ui/textarea"
import { FileUploader } from "./FileUploader"
import { useState } from "react"
import Image from "next/image"
import limg from "@/public/assets/icons/location-grey.svg"
import Cimg from "@/public/assets/icons/calendar.svg"
import Dimg from "@/public/assets/icons/dollar.svg"
import Uimg from "@/public/assets/icons/link.svg"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "@/components/ui/checkbox"
import { createEvent, updateEvent } from "@/lib/actions/eventAction"
import { useUploadThing } from "@/lib/uploadthing"
import { useRouter } from "next/navigation"
import { IEvent } from "@/lib/database/models/eventModel"


const EventForm = ({ userId, type, event }: { userId: string; type: "Create" | "Update", event?: IEvent }) => {
    
    const eventId = event?._id;
    const [files, setFiles] = useState<File[]>([]);
    const [startDate, setStartDate] = useState(new Date());

    const { startUpload } = useUploadThing('imageUploader');
    const router = useRouter();

    const initialValues = event && type === "Update" ? 
    {
        ...event, startDate: new Date(event.startDate), endDate: new Date(event.endDate) 
    }
         : eventDefaultValues;

    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: initialValues
    })

    async function onSubmit(values: z.infer<typeof eventFormSchema>) {
        let uploadedImageUrl = values.imageUrl;

        if (files.length > 0) {
            const uploadedImages = await startUpload(files)

            if (!uploadedImages) {
                return
            }

            uploadedImageUrl = uploadedImages[0].url
        }

        if (type === 'Create') {
            try {
                const newEvent = await createEvent({
                    event: { ...values, imageUrl: uploadedImageUrl },
                    userId,
                    path: '/profile'
                })

                if (newEvent) {
                    form.reset();
                    router.push(`/events/${newEvent._id}`)
                }
            } catch (error) {
                console.log(error);
            }
        }

        if (type === 'Update') {
            if (!eventId) {
                router.back()
                return;
            }

            try {
                const updatedEvent = await updateEvent({
                    userId,
                    event: { ...values, imageUrl: uploadedImageUrl, _id: eventId },
                    path: `/events/${eventId}`
                })

                if (updatedEvent) {
                    form.reset();
                    router.push(`/events/${updatedEvent._id}`)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 md:flex-row">

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input placeholder="Event title" {...field} className="input-field" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Dropdown onChangeHandler={field.onChange} value={field.value} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl className="h-72">
                                <Textarea placeholder="Description" {...field} className="textarea rounded-lg" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />


                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl className="h-42">
                                <FileUploader onFieldChange={field.onChange} imageUrl={field.value} setFiles={setFiles} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <div className="flex-center h-[54px] overflow-hidden bg-gray-50 hover:border-black border-2 rounded-lg pl-3 py-2">
                                    <Image src={limg} width={25} alt="location" />
                                    <Input placeholder="Event location" {...field} className="input-field border-none" />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <div className="flex-center h-[54px] overflow-hidden bg-gray-50 hover:border-black border-2 rounded-lg pl-3 py-2">
                                    <Image src={Cimg} width={25} alt="Calendar" className="filter-gray" />
                                    <p className="ml-3 whitespace-nowrap text-gray-600">Start Date</p>
                                    <DatePicker selected={field.value} onChange={(date: Date) => field.onChange(date)} showTimeSelect timeInputLabel="Time:" dateFormat="MM/dd/yyyy h:mm aa" wrapperClassName="datePicker" />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <div className="flex-center h-[54px] overflow-hidden bg-gray-50 hover:border-black border-2 rounded-lg pl-3 py-2">
                                    <Image src={Cimg} width={25} alt="Calendar" className="filter-gray" />
                                    <p className="ml-3 whitespace-nowrap text-gray-600">End Date</p>
                                    <DatePicker selected={field.value} onChange={(date: Date) => field.onChange(date)} showTimeSelect timeInputLabel="Time:" dateFormat="MM/dd/yyyy h:mm aa" wrapperClassName="datePicker" />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <div className="flex-center h-[54px] w-full overflow-hidden rounded-lg bg-grey-50 border-2 hover:border-black pl-3 py-2">
                                    <Image
                                        src={Dimg}
                                        alt="dollar"
                                        width={25}
                                        height={25}
                                        className="filter-grey"
                                    />
                                    <Input type="number" placeholder="price" {...field} className="p-regular-16 border-none bg-grey-50 outline-offset-0 focus:border-0  focus-visible:ring-0 focus-visible:ring-offset-0" />
                                    <FormField
                                        control={form.control}
                                        name="isFree"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="flex items-center">
                                                        <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Free Ticket</label>
                                                        <Checkbox
                                                            onCheckedChange={field.onChange}
                                                            checked={field.value}
                                                            id="isFree" className="mr-2 h-5 w-5 border-2 border-primary-500" />
                                                    </div>

                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <div className="flex-center h-[54px] w-full overflow-hidden bg-gray-50 rounded-lg border-2 hover:border-black pl-3 py-2">
                                    <Image
                                        src={Uimg}
                                        alt="link"
                                        width={24}
                                        height={24}
                                    />

                                    <Input placeholder="URL" {...field} className="input-field border-none" />
                                </div>

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <Button type="submit" disabled={form.formState.isSubmitting} className="h-[50px] text-xl rounded-lg">
                {form.formState.isSubmitting ? (
                    `Submitting...`
                ) :
                    `${type} Event`}
            </Button>
        </form>
    </Form>
)
}

export default EventForm