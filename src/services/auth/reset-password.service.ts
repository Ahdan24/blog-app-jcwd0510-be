import { hashPassword } from "../../lib/argon"
import { prisma } from "../../lib/prisma"

export const resetPasswordService = async(
    userId: number,
    password: string
) => {
    try {
        
        const user = await prisma.user.findFirst({
            where: {id:userId},
        })

        if(!user) {
            throw new Error('User not found')
        }

        const hashedPassword = await hashPassword(password)

        await prisma.user.update ({
            where: {id:userId},
            data: {password: hashedPassword}
        })
        return {message: "reset password Success"}
        
    } catch (error) {
      throw error  
    }
}