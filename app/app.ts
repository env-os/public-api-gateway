import 'reflect-metadata';
import { useContainer, useExpressServer, Action } from 'routing-controllers';
import { Container } from 'typedi';
import { EnvOSController } from './controllers/envos.controller';
import express from "express";
import { auth, initializeApp, credential } from "firebase-admin";
import { isUndefined } from 'util';

useContainer(Container);

const app = express();
const port = process.env.PORT || 3003;
useExpressServer(app, {
  controllers: [EnvOSController],
  authorizationChecker: async(action: Action) => {
    try{
      var idToken = action.request.headers["authorization"].split(" ")[1];
      const decodedToken = await auth().verifyIdToken(idToken)
      .then(function(decodedToken) {
        return decodedToken
      })
      .catch(function(err){
        console.log(err)
      })

      if(isUndefined(decodedToken))
        return false

      return true;
    }
    catch{
      return false;
    }
  }
});

app.listen(port, function () {
  var serviceAccount = require('../ServiceAccountKey.json');
  initializeApp({
    databaseURL: 'https://italy-os.firebaseio.com',
    credential: credential.cert(serviceAccount)
  })
  console.log(`Public API Gateway listening on port ${port}!`);
});