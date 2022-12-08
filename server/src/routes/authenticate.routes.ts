import { Router } from "express";
import { PrismaUsersRepository } from "../repositories/prisma/PrismaUsersRepository";
import { AuthenticateUserUseCase } from "../useCase/AuthenticateUserUseCase/AuthenticateUserUseCase";

export const authenticateRoutes = Router();

authenticateRoutes.get("/github", (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
})

authenticateRoutes.get("/sign-in/callback", (req, res) => {
  const { code } = req.query;

  return res.json(code);
})

authenticateRoutes.post("/authenticate", async (req, res) => {
  const { code } = req.body;

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const authenticateUserUseCase = new AuthenticateUserUseCase(
      prismaUsersRepository
    );

    const response = await authenticateUserUseCase.execute(code);

    return res.status(201).json(response);
  } catch (err) {
    console.log(err);

    return res.status(500).send();
  }
})