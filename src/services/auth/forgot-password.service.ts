import { User } from "@prisma/client";
import {
  BASE_URL_FE,
  JWT_SECRET,
  JWT_SECRET_FORGOT_PASSWORD,
} from "../../config";
import { sign } from "jsonwebtoken";
import { transporter } from "../../lib/nodemailer";
import { link } from "fs";
import prisma from "../../lib/prisma";

export const forgotPasswordService = async (body: Pick<User, "email">) => {
  try {
    const { email } = body;
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid email address");
    }

    const token = sign({ id: user.id }, JWT_SECRET_FORGOT_PASSWORD!, {
      expiresIn: "15m",
    });

    const link = `${BASE_URL_FE}/reset-password/${token}`;

    transporter.sendMail({
      to: email,
      subject: "You Can Reset Password in Here",
      html: `<a href="${link}" target="_blank">You Can Reset Password in Here</a>`,
    });

    return { message: "Send email success" };
  } catch (error) {
    throw error;
  }
};
