export const headerLinks = [
    {
        id: 1,
        name: "Home",
        href: "/",
    },
    
    {
        id: 5,
        name: "Create Event",
        href: "/events/create",
    },
    {
        id: 6,
        name: "My Profile",
        href: "/profile",
    },
]

export const eventDefaultValues = {
    title: "",
    description: "",
    location: "",
    imageUrl: "",
    startDate: new Date(),
    endDate: new Date(),
    categoryId: "",
    price: "",
    isFree: false,
    url: "",
}