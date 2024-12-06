import { prisma } from "../lib/prisma";

export const getSampleService = async () => {
  try {
    const sample = await prisma.sample.findMany();
    return sample;
  } catch (error) {
    throw error;
  }
};
