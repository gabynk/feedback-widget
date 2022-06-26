import Handlebars from "handlebars";
import path from "path";
import fs from "fs";

import { generateNewFeedbackData, HandlebarsAdapter } from "..";

export class HandlebarsGenerateAdapter implements HandlebarsAdapter {
  async generateNewFeedback(data: generateNewFeedbackData) {
    const filePath = path.join(process.cwd(), "src", "templates", "email", "newFeedback.hbs");
    const html = fs.readFileSync(filePath, "utf-8");
    const compiledHandlebars = Handlebars.compile(html)(data);

    return compiledHandlebars
  }
}