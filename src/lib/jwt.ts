import { NextFunction, Request, Response } from "express";
import { TokenExpiredError, verify } from "jsonwebtoken";
import { JWT_SECRET, JWT_SECRETFORGOT_PASSWORD } from "../config";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Authentication failed, token is missing",
    });
  }

  try {
    const payload = verify(token, JWT_SECRET!);
    res.locals.user = payload;
    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res.status(401).json({ message: "Access denied. Token expired." });
    }
    return res.status(401).json({ message: "Access denied. Invalid token." });
  }
};

// If you need to verify a "forgot password" token separately:
export const verifyForgotPasswordToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Authentication failed, token is missing",
    });
  }

  try {
    const payload = verify(token, JWT_SECRETFORGOT_PASSWORD!);
    res.locals.user = payload;
    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res.status(401).json({ message: "Access denied. Token expired." });
    }
    return res.status(401).json({ message: "Access denied. Invalid token." });
  }
};
