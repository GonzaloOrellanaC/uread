import { completUrl } from '@configs/dbConfig'
import config from '@/configs'

const env: string = config.env.environment
let url: string;

if (env === 'production') {
    url = completUrl
}else{
    url = completUrl // `mongodb://${host}:${port}/${database}`
}

export const dbConnection = {
    url: url,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
}
