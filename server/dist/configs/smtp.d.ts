declare const host: string | undefined;
declare const port: number | undefined;
declare const user: string | undefined;
declare const pass: string | undefined;
declare const from_name: string;
declare const from_email: string;
declare const smtpConfig: {
    host: string;
    port: number;
    user: string;
    pass: string;
    from_name: string;
    from_email: string;
};
export { host, port, user, pass, from_name, from_email };
export default smtpConfig;
