import { Review } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createReview = async (data: Review) => {
    const order = await prisma.order.findUnique({
        where: { id: data.orderId },
        include: { reviews: true }
    });

    if (!order) {
        throw new Error("Order not found");
    }

    if (order.status !== "DELIVERED") {
        throw new Error("Error!");
    }

    if (order.reviews.length > 0) {
        throw new Error("Error!");
    }

    const result = await prisma.review.create({
        data,
        include: {
            order: {
                include: {
                    meal: {
                        include: {
                            category: true,
                            provider: true
                        }
                    },
                    user: {
                        select: {
                            name: true,
                            email: true,
                            image: true
                        }
                    }
                }
            }
        }
    });
    return result;
}

const getReviewsByMealId = async (mealId: string) => {
    const reviews = await prisma.review.findMany({
        where: {
            order: {
                mealId: mealId
            }
        },
        include: {
            order: {
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true,
                            image: true
                        }
                    }
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return reviews;
}

const getReviewsByProviderId = async (providerId: string) => {
    const reviews = await prisma.review.findMany({
        where: {
            order: {
                meal: {
                    providerId: providerId
                }
            }
        },
        include: {
            order: {
                include: {
                    meal: {
                        select: {
                            name: true,
                            imageUrl: true
                        }
                    },
                    user: {
                        select: {
                            name: true,
                            email: true,
                            image: true
                        }
                    }
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return reviews;
}

const getAllReviews = async () => {
    const reviews = await prisma.review.findMany({
        include: {
            order: {
                include: {
                    meal: {
                        include: {
                            category: true,
                            provider: true
                        }
                    },
                    user: {
                        select: {
                            name: true,
                            email: true,
                            image: true
                        }
                    }
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return reviews;
}

const getReviewStats = async (mealId: string) => {
    const reviews = await prisma.review.findMany({
        where: {
            order: {
                mealId: mealId
            }
        }
    });

    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0 
        ? reviews.reduce((sum, review) => sum + review.reviewPoint, 0) / totalReviews 
        : 0;

    return {
        totalReviews,
        averageRating: Math.round(averageRating * 10) / 10
    };
}

export const reviewService = {
    createReview,
    getReviewsByMealId,
    getReviewsByProviderId,
    getAllReviews,
    getReviewStats
}