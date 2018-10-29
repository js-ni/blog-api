const express = require('express');
const cors = require('cors');
const mediumJSONFeed = require('medium-json-feed');
const moment = require('moment');
var debug = require('debug')('js:ni:blog:api')

// moment locale spanish default
moment.locale('es');

const app = express();
const PORT = process.env.PORT || 3000;
const USERNAME = process.env.USERNAME || 'javascript-nicaragua';

// only allow CORS on community domain
const corsOptions = {
  origin: 'https://ni.js.org/',
  optionsSuccessStatus: 200,
};

// enable CORS
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  mediumJSONFeed(USERNAME, (data) => {
    const posts = [];
    data.response.forEach((post) => {
      const postObject = {
        title: post.title,
        subtitle: post.content.subtitle,
        url: `https://medium.com/${USERNAME}/${post.id}`,
        createdAt: moment(post.createdAt).fromNow(),
      };
      posts.push(postObject);
    });
    res.json(posts);
  });
});

app.listen(PORT, () => debug(`Aapp listening on port ${PORT}!`));
