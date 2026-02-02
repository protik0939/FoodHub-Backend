import { Category } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


const createCategory = async (data: Category) => {
    const result = await prisma.category.create({
        data,
    })
    return result;
}

const getAllCategories = async (searchTerm?: string) => {
    const result = await prisma.category.findMany({
        where: searchTerm ? {
            name: {
                contains: searchTerm,
                mode: 'insensitive'
            }
        } : {},
        select: {
            id: true,
            name: true,
            description: true
        }
    });
    return result;
}

export const categoryService = {
    createCategory,
    getAllCategories,
};