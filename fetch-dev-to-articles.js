import fetch from 'node-fetch'
import fs from 'fs/promises'
import path from 'path'

const articles = (username, page) => `https://dev.to/api/articles?username=${username}&page=${page}`
const article = (id) => `https://dev.to/api/articles/${id}`

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchDevToArticles(username, folder, rateLimit = 1000) {
  try {
    await fs.mkdir(folder, { recursive: true });
  } catch (e) {}

  const getAllArticles = async (page = 1, incoming = []) => {
    const firstPage = articles(username, page);
    const request = await fetch(firstPage);
    const data = await request.json();

    if (data.length === 30) {
      return getAllArticles(page + 1, [...incoming, ...data])
    }
    return [...incoming, ...data]
  };

  const stashArticle = async (id) => {
    const request = await fetch(article(id));
    const data = await request.json();
    await fs.writeFile(path.join(folder, `/${id}.json`), JSON.stringify(data, null, 2));
  };

  const results = await getAllArticles();
  console.log(`found ${results.length} articles`)
  const savedArticles = (await fs.readdir(folder)).map(v => v.replace('.json', ''))
  const next = results.filter(r => !savedArticles.includes(r.id + ""))

  for (const result of next) {
    await stashArticle(result.id);
    console.log(`downloaded article id ${result.id}`)
    await delay(rateLimit);
  }
}