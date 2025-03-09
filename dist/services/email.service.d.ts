import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
interface AddressObject {
    name: string;
    address: string;
}
/**
 * Create a new email transporter
 * @param {string} host - SMTP host
 * @param {number} port - SMTP port
 * @param {string} user - SMTP user
 * @param {string} pass - SMTP password
 * @returns {nodemailer.Transporter}
 */
export declare const createTransporter: (host: string, port: number, user: string, pass: string) => nodemailer.Transporter;
/**
 * Send a HTML email
 * @param {string} to - The email address to send to
 * @param {string} subject - The subject of the email
 * @param {string} html - The HTML body of the email
 * @param {AddressObject=} from - The email address and name to send from (defaults to the SMTP config)
 */
export declare const sendHTMLEmail: (to: string, subject: string, html: string, optionals?: {
    from?: AddressObject;
    attachments?: Mail.Attachment[];
}) => Promise<nodemailer.SentMessageInfo>;
/**
 * Send a plain text email
 * @param {string} to - The email address to send to
 * @param {string} subject - The subject of the email
 * @param {string} text - The plain text body of the email
 * @param {AddressObject=} from - The email address and name to send from (defaults to the SMTP config)
 */
export declare const sendEmail: (to: string, subject: string, text: string, optionals?: {
    from?: AddressObject;
    attachments?: Mail.Attachment[];
}) => Promise<nodemailer.SentMessageInfo>;
export {};
