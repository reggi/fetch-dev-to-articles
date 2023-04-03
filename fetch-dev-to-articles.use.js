import {fetchDevToArticles} from './fetch-de-to-articles.js'

const username = 'reggi'
const folder = './articles'
const rateLimit = '1000'

await fetchDevToArticles(username, folder, rateLimit)
