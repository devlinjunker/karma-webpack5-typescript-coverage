const express = require('express');
const proxy = require('express-http-proxy');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 1234;
const staticDir = path.normalize(process.env.BUILD_DIR || './dist');

const app = express();

// Fail if can't find static dir
if (!fs.existsSync(staticDir)) {
  throw new Error(`Build directory "${staticDir}" doesn't exist.`);
}

// Send static file
app.use(express.static(staticDir));

app.use('/api', proxy('localhost:2020'));

// Send index file for all other requests
app.get('/*', (req, res, next) => {
  // Do not serve HTML files
  // ALL Angular HTML is preloaded on the page, if it's asking for a template via AJAX something is wrong
  // In some cases this would crash the browser because we would serve index.html and it would create an infinite loop
  if (req.url.indexOf('.html') !== -1) {
    return next();
  }

  // Do not serve json files if it is not in static.
  // This could be missing settings.json
  if (req.url.indexOf('.json') !== -1 || req.url.indexOf('.swf') !== -1) {
    return next();
  }

  res.sendFile(path.resolve(path.join(staticDir, '/index.html')));
});

app.listen(port);
console.log(`Starting server on port ${port}`);
