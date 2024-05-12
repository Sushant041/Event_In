'use Server'

import { CreateUserParams, UpdateUserParams } from "@/types"
import { handleError } from "../utils"
import { connectToMongo } from "../database"
import User from "../database/models/userModel"
import Event from "../database/models/eventModel"
import { revalidatePath } from "next/cache"
import Order from "../database/models/orderModel"



export  const createUser = async (user: CreateUserParams) =>{
    try {
        await connectToMongo();

        const newUser = await User.create(user);

        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        handleError(error)
    }
}

export const deleteUser = async (clerkId: string) =>{

    try {
        await connectToMongo();

        const userToDelete = await User.findOne({clerkId});

        if(!userToDelete){
            throw new Error("User not Found");
        }

        await Promise.all([
            Event.updateMany(
                {_id: {$in: userToDelete.events} },
                {$pull: { organizer: userToDelete._id} }
            ),
            
            Order.updateMany({ _id: {$in: userToDelete.oredrs } }, {
                $unset: { buyer: 1} }),
        ])

        const deleteUser = await User.findByIdAndDelete(clerkId)
        revalidatePath('/')

        return deleteUser ? JSON.parse(JSON.stringify(deleteUser)) : null
    } catch (error) {
        handleError(error)
    }

}

export const updateUser = async(clerkId: string, user: UpdateUserParams) => {
     
    try {
        await connectToMongo();

        const UpdatedUser = await User.findByIdAndUpdate({clerkId}, user, {new: true} )
        
    } catch (error) {
        handleError(error)
    }
}