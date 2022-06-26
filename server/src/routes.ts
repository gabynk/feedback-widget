import { Router } from "express";
import { HandlebarsGenerateAdapter } from "./adapters/GenerateTemplate/HandlebarsAdapter/HandlebarsGenerateAdapter";
import { NodemailerMailAdapter } from "./adapters/MailAdapter/nodemailer/NodemailerMailAdapter";

import { PrismaFeedbacksRepository } from "./repositories/prisma/PrismaFeedbacksRepository";
import { SubmitFeedbackUseCase } from "./useCase/SubmitFeedbackUseCase";

export const routes = Router();

routes.post('/feedbacks', async (req, res) => {
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