import express from 'express'

const port = process.env.PORT || 3000;
const app: express.Application = express();


app.listen(port, function () {
  console.log(`Public API Gateway listening on port ${port}!`);
});