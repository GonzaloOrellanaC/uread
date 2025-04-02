import env from './env';
import keys from './keys';
import dbConfig from './dbConfig';
import cors from './cors';
import log from './log';
import smtp from './smtp';
declare const config: {
    env: {
        environment: string;
        port: number;
        locale: string;
        name: string;
        lastName: string;
        run: string;
        email: string;
        password: string;
        url: string;
        platformName: string;
        storageApi: {
            accessKeys: string;
        };
        deepSeekApiKey: string;
    };
    dbConfig: {
        host: string;
        database: string;
        port: number;
    };
    keys: {
        secretKey: string;
    };
    log: {
        format: string;
        dir: string;
    };
    cors: {
        origin: boolean;
        credentials: boolean;
    };
    smtp: {
        host: string;
        port: number;
        user: string;
        pass: string;
        from_name: string;
        from_email: string;
        user_bienvenida: string;
        from_bienvenida: string;
        pass_bienvenida: string;
        user_pago_valido: string;
        pass_pago_valido: string;
    };
};
export { env, dbConfig, keys, log, cors, smtp };
export default config;
