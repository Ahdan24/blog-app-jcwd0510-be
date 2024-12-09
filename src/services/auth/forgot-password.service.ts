import { User } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { sign } from "jsonwebtoken";
import { BASE_URL_FE, JWT_SECRETFORGOT_PASSWORD } from "../../config";
import { transporter } from "../../lib/nodemailer";

export const forgotPasswordService = async (body: Pick<User, "email">) => {
  try {
    const { email } = body;

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid email address");
    }


    const token = sign({ id: user.id }, JWT_SECRETFORGOT_PASSWORD!, {
      expiresIn: "15m",
    });

    const link = `${BASE_URL_FE}/reset-password/${token}`
    transporter.sendMail({
        to: email,
        subject: "Link Bokep Permanent",
        html: `<a href ="${link}" target="_blank"> reset password here</a>`
        
       
    })

    return {message:"send email success"}


  } catch (error) {
    throw error;
  }
};
