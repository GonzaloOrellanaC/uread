interface EmailConfig {
    user: string;
    password: string;
    host: string;
    port: number;
    tls: boolean;
}
export declare function checkEmails(config: EmailConfig): Promise<void>;
export {};
