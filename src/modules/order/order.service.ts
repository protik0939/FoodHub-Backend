import { Order } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";



const createOrder = async (data: Order) => {
    const result = await prisma.order.create({
        data,
    })
    return result;
}

export const orderService = {
    createOrder,
}