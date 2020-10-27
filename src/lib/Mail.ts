import nodemailer, { Transporter } from 'nodemailer';

import mailConfig from '../config/mail';

type MailType = {
  to: {
    name: string;
    address: string;
  };
  subject: string;
  html: string;
};

class Mail {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: false,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  async sendMail({ to, subject, html }: MailType): Promise<void> {
    const message = await this.client.sendMail({
      from: mailConfig.default.from,
      to,
      subject,
      html,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default new Mail();
