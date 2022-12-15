import { Request, Response, Router } from "express";

import { HandlebarsGenerateAdapter } from "../adapters/GenerateTemplate/HandlebarsAdapter/HandlebarsGenerateAdapter";
import { NodemailerMailAdapter } from "../adapters/MailAdapter/nodemailer/NodemailerMailAdapter";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { PrismaFeedbacksRepository } from "../repositories/prisma/PrismaFeedbacksRepository";
import { ListFeedbackUseCase } from "../useCase/ListFeedbackUseCase/ListFeedbackUseCase";
import { SubmitFeedbackUseCase } from "../useCase/SubmitFeedbackUseCase/SubmitFeedbackUseCase";

export const feedbackRoutes = Router();

feedbackRoutes.post('/', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  try {
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();
    const handlebarsGenerateAdapter = new HandlebarsGenerateAdapter();
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
      prismaFeedbacksRepository,
      nodemailerMailAdapter,
      handlebarsGenerateAdapter
    );

    await submitFeedbackUseCase.execute({
      type,
      comment,
      screenshot
    });

    return res.status(201).send();
  } catch (err) {
    console.log(err);

    return res.status(500).send();
  }
})

feedbackRoutes.get('/', isAuthenticated, async (req: Request, res: Response) => {
  const { type, offset, limit } = req.query;

  try {
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const listFeedbackUseCase = new ListFeedbackUseCase(
      prismaFeedbacksRepository,
    );

    const response = await listFeedbackUseCase.execute({ 
      type: type as string, 
      offset: offset as string, 
      limit: limit as string, 
    });

    return res.status(201).send(response);
  } catch (err) {
    console.log(err);

    return res.status(500).send();
  }
})