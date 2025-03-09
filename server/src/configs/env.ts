const environment: string = process.env.NODE_ENV
const port: number = parseInt(process.env.PORT)
const locale: string = process.env.DEFAULT_LANGUAGE
const name: string = process.env.NAME
const lastName: string = process.env.LASTNAME
const run: string = process.env.RUN
const email: string = process.env.EMAIL
const password: string = process.env.PASSWORD
const url = process.env.URL || `http://localhost:${port}`
const platformName = process.env.PLATFORM_NAME
const storageApi = {
    accessKeys: process.env.ACCESS_KEYS
}
const deepSeekApiKey = process.env.DEEP_SEEK_API_KEY

const env = { environment, port, locale, name, lastName, run, email, password, url, platformName, storageApi, deepSeekApiKey }

export { environment, port, locale, name, lastName, run, email, password, url, platformName, storageApi, deepSeekApiKey }
export default env
