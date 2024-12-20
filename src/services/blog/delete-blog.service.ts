import prisma from "../../lib/prisma";

export const deleteBlogService = async (id: number, userId: number) => {
  try {
    const blog = await prisma.blog.findFirst({
      where: { id },
    });

    if (!blog) {
      throw new Error("Blog not found");
    }

    if (blog.userId !== userId) {
      throw new Error("Un authorized");
    }
    await prisma.blog.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return { message: "delete blog success" };
  } catch (error) {
    throw error;
  }
};
