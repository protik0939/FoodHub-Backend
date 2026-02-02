import { Order } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";



const createOrder = async (data: Order) => {
    console.log("ei function hit korse!!!");
    console.log(data);
    const result = await prisma.order.create({
        data,
    })
    return result;
}

const getOrdersByProviderId = async (providerId: string) => {
    const result = await prisma.order.findMany({
        where: {
            meal: {
                providerId,
            },
        },
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                    userProfile: {
                        select: {
                            contactNo: true,
                            address: true,
                        },
                    },
                },
            },
            meal: {
                select: {
                    name: true,
                    price: true,
                    imageUrl: true,
                },
            },
        },
        orderBy: {
            id: 'desc',
        },
    });
    return result;
}

const getOrdersByUserId = async (userId: string) => {
    const result = await prisma.order.findMany({
        where: {
            userId,
        },
        include: {
            meal: {
                select: {
                    name: true,
                    price: true,
                    imageUrl: true,
                    provider: {
                        select: {
                            user: {
                                select: {
                                    name: true,
                                    image: true,
                                },
                            },
                        },
                    },
                },
            },
        },
        orderBy: {
            id: 'desc',
        },
    });
    return result;
}

export const orderService = {
    createOrder,
    getOrdersByProviderId,
    getOrdersByUserId,
}