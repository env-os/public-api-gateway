import 'reflect-metadata';
import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { UserController } from './controllers/user.controller';

useContainer(Container);

const port = process.env.PORT || 3000;
const app = createExpressServer({
    controllers: [
      UserController
    ]
})

app.listen(port, function () {
  console.log(`Public API Gateway listening on port ${port}!`);
});