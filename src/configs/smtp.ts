/* eslint-disable camelcase */
const host: string | undefined = process.env.SMTP_HOST
const port: number | undefined = parseInt(process.env.SMTP_PORT)
const user: string | undefined = process.env.SMTP_USER
const pass: string | undefined = process.env.SMTP_PASS
const from_name = process.env.SMTP_FROM_NAME
const from_email = process.env.SMTP_FROM_EMAIL

const user_bienvenida = process.env.SMTP_EMAIL_BIENVENIDA
const from_bienvenida = process.env.SMTP_FROM_BIENVENIDA
const pass_bienvenida = process.env.SMTP_PASS_BIENVENIDA

const smtpConfig = { host, port, user, pass, from_name, from_email, user_bienvenida, from_bienvenida, pass_bienvenida }

export { host, port, user, pass, from_name, from_email, user_bienvenida, from_bienvenida, pass_bienvenida  }
export default smtpConfig
