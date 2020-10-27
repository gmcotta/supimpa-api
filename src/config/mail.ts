export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
  default: {
    from: {
      name: 'Equipe Supimpa',
      address: 'staff@supimpa.com',
    },
  },
};
