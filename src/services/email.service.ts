import smtp from '@/configs/smtp'
import nodemailer from 'nodemailer'
import { isEmpty } from '@/utils/util'
import Mail from 'nodemailer/lib/mailer'

interface AddressObject {
    name: string
    address: string
}

/**
 * Create a new email transporter
 * @param {string} host - SMTP host
 * @param {number} port - SMTP port
 * @param {string} user - SMTP user
 * @param {string} pass - SMTP password
 * @returns {nodemailer.Transporter}
 */
export const createTransporter = (host: string, port: number, user: string, pass: string): nodemailer.Transporter => {
    if (isEmpty(host) || isEmpty(port) || isEmpty(user) || isEmpty(pass)) {
        throw new Error('SMTP credentials are required')
    }
    return nodemailer.createTransport({ 
        host,
        port,
        secure: true,
        tls: {
            rejectUnauthorized: false
        },
        auth: { user, pass } })
}

/**
 * Send a HTML email
 * @param {string} to - The email address to send to
 * @param {string} subject - The subject of the email
 * @param {string} html - The HTML body of the email
 * @param {AddressObject=} from - The email address and name to send from (defaults to the SMTP config)
 */
export const sendHTMLEmail = async (
    to: string,
    subject: string,
    html: string,
    optionals?: {
        from?: AddressObject
        attachments?: Mail.Attachment[]
    }
): Promise<nodemailer.SentMessageInfo> => {
    const user = subject.includes('Bienvenid@') ? smtp.user_bienvenida : smtp.user
    const password = subject.includes('Bienvenid@') ? smtp.pass_bienvenida : smtp.pass
    const transporter = createTransporter(smtp.host, smtp.port, user, password)
    console.log(transporter)
    return await transporter.sendMail({
        from: optionals?.from || { name: subject.includes('Bienvenid@') ? smtp.from_bienvenida : smtp.from_name, address: subject.includes('Bienvenid@') ? smtp.user_bienvenida : smtp.from_email },
        to,
        subject,
        html,
        attachments: optionals?.attachments
    })
}

export const sendPagoValidadoEmail = async (
    to: string,
    subject: string,
    html: string,
    optionals?: {
        from?: AddressObject
        attachments?: Mail.Attachment[]
    }
): Promise<nodemailer.SentMessageInfo> => {
    const user = smtp.user_pago_valido
    const password = smtp.pass_pago_valido
    const transporter = createTransporter(smtp.host, smtp.port, user, password)
    return await transporter.sendMail({
        from: optionals?.from || { name: 'Uread', address: user },
        to,
        subject,
        html,
        attachments: optionals?.attachments
    })
}

/**
 * Send a plain text email
 * @param {string} to - The email address to send to
 * @param {string} subject - The subject of the email
 * @param {string} text - The plain text body of the email
 * @param {AddressObject=} from - The email address and name to send from (defaults to the SMTP config)
 */
export const sendEmail = async (
    to: string,
    subject: string,
    text: string,
    optionals?: {
        from?: AddressObject
        attachments?: Mail.Attachment[]
    }
): Promise<nodemailer.SentMessageInfo> => {
    const transporter = createTransporter(smtp.host, smtp.port, smtp.user, smtp.pass)
    console.log(transporter)
    return await transporter.sendMail({
        from: optionals?.from || { name: smtp.from_name, address: smtp.from_email },
        to,
        subject,
        text,
        attachments: optionals?.attachments
    })
}
