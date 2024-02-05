import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { MAIL_HOST, MAIL_PORT } from '@infrastructure/constants';
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';

interface IEmailService {
  sendEmail(email: string, subject: string, text: string): Promise<void>;
}

@Injectable()
export class EmailService implements IEmailService {

  private transporter: nodemailer.Transporter<SentMessageInfo>;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      port: MAIL_PORT,
    });
  }

  sendEmail(email: string, subject: string, text: string): Promise<void> {
    const messageStatus = this.transporter.sendMail({
      from: 'Opticash - Project Olympus <olympus@opticash.io>',
      to: email,
      subject,
      text,
    });
    return !messageStatus ? Promise.reject() : Promise.resolve();
  }
}
