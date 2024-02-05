import { VerificationNotifierPort } from '@ports/out/notifications/verification-notifier.port';
import { VERIFY_URL } from '@infrastructure/constants';
import { EmailService } from '@infrastructure/smtp/email.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VerificationNotifierEmailer implements VerificationNotifierPort {
  constructor(private emailService: EmailService) {}

  async notify(email: string, otp: string, token: string): Promise<void> {
    await this.emailService.sendEmail(
      email,
      'Welcome to Project Olympus by Opticash! Please Verify Your Account',
      `
Hi 👋,

Welcome to Project Olympus by Opticash! You're almost ready to explore all the exciting features we have in store for you.
To ensure your account's security and complete your registration, we need to verify your account.

Enter the OTP (One Time Password) on the verification page. Your OTP is ${otp} and is valid for 5 minutes or click on the verification link below.
If you're unable to use the OTP, the link below will allow you to verify your email and is valid for 24 hours.

${VERIFY_URL}/${token}

If you did not sign up for an Opticash account, please disregard this message or inform us at support@opticash.io. No further action is required from your side.

Once your email is verified, you'll gain full access to all the services and benefits we offer. 
Should you have any questions or require assistance, our support team is always available.

Thank you for choosing Opticash. We're thrilled to welcome you aboard!

Best Wishes,

The Project Olympus Team
      `,
    );
  }
}
