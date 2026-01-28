import { ProviderProfile } from "../../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";

const createProvider = async (data: ProviderProfile) => {
    const result = await prisma.providerProfile.create({
        data,
    })
    return result;
}

export const providerService = {
    createProvider,
}