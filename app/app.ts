import 'reflect-metadata';
import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { EnvOSController } from './controllers/envos.controller';

useContainer(Container);

const port = process.env.PORT || 3000;
const app = createExpressServer({
    controllers: [
      EnvOSController
    ]
})

app.listen(port, function () {
  console.log(`Public API Gateway listening on port ${port}!`);
});