#!/usr/bin/env node

const args = process.argv.slice(2);
const [username, folder] = args;

if (!username || !folder) {
  console.error('Please provide args (npx fetch-dev-to-articles [username] [folder])');
  process.exit(1);
}

await fetchDevToArticles(username, folder);