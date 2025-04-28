interface EmailConfig {
    user: string;
    password: string;
    host: string;
    port: number;
    tls: boolean;
}
export declare const checkEmails: (config: EmailConfig) => Promise<void>;
export {};
