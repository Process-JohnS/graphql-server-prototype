import 'reflect-metadata'
import express from 'express';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { createConnection, ConnectionOptions, useContainer } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

// entities
import { TowerOrder } from './entity/tower-order';
import { TowerOrderItem } from './entity/tower-order-item';

// resolvers
import { TowerOrderResolver } from './resolvers/tower-order';


import graphql from './server/graphql';
import rest from './server/rest';



(async () => {

  useContainer(Container);

  const connectionOptions: ConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '',
    database: 'connector_db',
    synchronize: true,
    logging: false,
    entities: [TowerOrder, TowerOrderItem],
    namingStrategy: new SnakeNamingStrategy()
  };

  await createConnection(connectionOptions);



  const app = express();
  const port = 5000;

  const schema = await buildSchema({
    resolvers: [TowerOrderResolver],
    emitSchemaFile: true,
    validate: false,
    container: Container
  });


  // Set up REST API endpoints
  rest(app);

  // Set up GraphQL middleware
  graphql(app, schema);


  app.listen({ port }, () => {
    console.log(`Server started on port ${port}`);
  });

})();
