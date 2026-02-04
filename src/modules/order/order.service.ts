import { Order, OrderStatus } from "../../../generated/prisma/client";
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
                provider: {
                    userId: providerId,
                },
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
            reviews: true,
        },
        orderBy: {
            id: 'desc',
        },
    });
    return result;
}

const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    const result = await prisma.order.update({
        where: {
            id: orderId,
        },
        data: {
            status,
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
    });
    return result;
}

const cancelOrder = async (orderId: string, userId: string) => {
    const order = await prisma.order.findUnique({
        where: {
            id: orderId,
        },
    });

    if (!order) {
        throw new Error("Order not found");
    }

    if (order.userId !== userId) {
        throw new Error("Unauthorized to cancel this order");
    }

    if (order.status !== OrderStatus.PREPARING) {
        throw new Error("Order can only be cancelled when in PREPARING status");
    }

    const result = await prisma.order.update({
        where: {
            id: orderId,
        },
        data: {
            status: OrderStatus.CANCELLED,
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
            reviews: true,
        },
    });
    return result;
}

export const orderService = {
    createOrder,
    getOrdersByProviderId,
    getOrdersByUserId,
    updateOrderStatus,
    cancelOrder,
}