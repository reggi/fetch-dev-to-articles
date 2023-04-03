import fs from 'fs/promises'
const folder = 'articles'

const savedArticles = (await fs.readdir(folder))

await savedArticles.reduce((acq, result) => {
  return acq.then(async () => {
    const file = path.join(folder, `/${result}`)
    const rawFIle = await fs.readFile(file, 'utf8')
    const data = JSON.parse(rawFIle)
    
  })
}, Promise.resolve())