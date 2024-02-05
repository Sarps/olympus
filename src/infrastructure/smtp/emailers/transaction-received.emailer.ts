import { EmailService } from '@infrastructure/smtp/email.service';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@domain/models/entities/user.entity';
import { TransactionEntity } from '@domain/models/entities/transaction.entity';

interface ITransactionReceivedEmailer {
  notify(email: string, transaction: TransactionEntity): Promise<void>;
}

@Injectable()
export class TransactionReceivedEmailer implements ITransactionReceivedEmailer {
  constructor(private emailService: EmailService) {}

  async notify(email: string, transaction: TransactionEntity): Promise<void> {
    const sender = transaction.sender;
    const recipient = transaction.recipient;
    await this.emailService.sendEmail(
      email,
      `🎉 Hooray! You've Received Money from ${sender.name}!`,
      `
Hi 👋,

Great news! 🌟 You've just received a payment, and we couldn't wait to tell you about it.
Thanks to ${sender.name}, a shiny amount has made its way to your account. Here are the sparkling details:

Amount: ${recipient.amount.currency} ${recipient.amount.amount}
Received On: ${new Date().toDateString()}
For: ${recipient.narration}
This isn't just any transaction; it's a reason to celebrate! 🎈 We hope it makes your day a little brighter.

Something Doesn't Look Right?
No worries! If this took you by surprise or something seems off, just hit us up at support@opticash.io. We're here to make sure everything runs smoothly.

Thank you for being an essential part of the Project Olympus family. Here's to many more reasons to celebrate together! 🥳

Warmest regards and smiles,

The Project Olympus Team
      `,
    );
  }
}
