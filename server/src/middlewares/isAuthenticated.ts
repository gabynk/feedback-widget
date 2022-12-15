import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing");
  }

  const [, token] = authHeader.split(" ");

  const JWT_SECRET = process.env.JWT_SECRET as string;

  try {
    verify(token, JWT_SECRET);

    next();
  } catch {
    throw new Error("Invalid token!");
  }
}
