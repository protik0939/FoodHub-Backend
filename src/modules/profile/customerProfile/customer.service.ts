import { UserProfile } from "../../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";


const createCustomer = async (data: UserProfile) => {
    const result = await prisma.userProfile.create({
        data,
    })
    return result;
}

export const customerService = {
    createCustomer
}