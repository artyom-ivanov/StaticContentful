'use strict'

const contentful = require('contentful')

const SPACE_ID = 'b0ywbzkibjx3'
const ACCESS_TOKEN = 'b02c179dcd36809d27de8bc4b095f81eb25f20abf4d4563ed7d574f8b704f5e8'

const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN
})

// Получаем данные из contentful
function getArticles(){
  return client.getEntries({
      content_type: 'article'
    })
  .then((response) => response.items)
  .catch((error) => {
    console.error(error)
  })
}

// Генерируем статику на основании данных и ejs - шаблона
function generateStatic(){
  var ejs = require('ejs'),
      fs = require('fs'),
      file_name = 'index',
      ejs_template = __dirname + '/ejs/index.ejs',
      ejs_file = fs.readFileSync(ejs_template, 'utf8');

  getArticles().then((response) => {
    ejs.renderFile(ejs_template, {'data': response}, function(err, result){
      if (err) throw err;
      fs.writeFile( __dirname + '/public/' + file_name + '.html', result,(err) => {
        if (err) throw err;
          console.log('Build complete: /public/'+file_name+'.html');
          return;
      });
    });
  }).catch((error) => {
    console.error(error)
  });
}

generateStatic();