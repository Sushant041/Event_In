"use server";

import { CreateCategoryParams } from "@/types";
import { handleError } from "../utils";
import { connectToMongo } from "../database";
import Category from "../database/models/category";

export const createCategory = async ({ categoryName }: CreateCategoryParams ) => {
    try {
        await connectToMongo();

        const newCategory = await Category.create({name : categoryName});

        return JSON.parse(JSON.stringify(newCategory));
    } catch (error) {
        handleError(error);
    }
}

export const getAllCategories = async () => {
    try {
        await connectToMongo();

        const Categories = await Category.find();

        return JSON.parse(JSON.stringify(Categories));
    } catch (error) {
        handleError(error);
    }
}