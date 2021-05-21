import { inject, injectable } from "tsyringe";
import nodemailer, { Transporter } from "nodemailer";

import handlebars from "handlebars";
import fs from "fs";

import IMailProvider from "./IMailProvider";

injectable();
export default class MailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });
        this.client = transporter;
      })
      .catch((err) => console.log(err));
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templetaHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: "RentX <noreplay@rentx.com.br",
      html: templetaHTML,
      subject: subject,
    });

    console.log({
      message_id: message.messageId,
      link: nodemailer.getTestMessageUrl(message),
    });
  }
}