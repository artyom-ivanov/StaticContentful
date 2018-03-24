'use strict'

const contentful = require('contentful')
const chalk = require('chalk')
const Table = require('cli-table2')

const SPACE_ID = 'b0ywbzkibjx3'
const ACCESS_TOKEN = 'b02c179dcd36809d27de8bc4b095f81eb25f20abf4d4563ed7d574f8b704f5e8'

const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN
})

function getArticles(){
  return client.getEntries({
      content_type: 'article'
    })
  .then((response) => response.items)
  .catch((error) => {
    console.log(chalk.red(`\nError occurred while fetching Entries for ${chalk.cyan(contentType.name)}:`))
    console.error(error)
  })
}

function displayArtices(){
  return getArticles()
  .then((entries) => {
    const table = new Table({
      head: ['Id', 'Title', 'Desc']
    })
    entries.forEach((entry) => {
      table.push([entry.sys.id, entry.fields.title, entry.fields.description])
    })
    console.log(table.toString())
  })
}

// Start the boilerplate code
displayArtices()
