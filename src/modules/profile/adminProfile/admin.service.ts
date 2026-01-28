import { AdminProfile } from "../../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";


const createAdmin = async (data: AdminProfile) => {
    const result = await prisma.adminProfile.create({
        data,
    })
    return result;
}

export const adminService = {
    createAdmin
}