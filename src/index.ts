import 'reflect-metadata'
import express from 'express';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { createConnection, ConnectionOptions, useContainer } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

// entities
import { TowerOrder } from './schema/tower-order/entity';
import { TowerOrderItem } from './schema/tower-order-item/entity';

// resolvers
import { TowerOrderResolver } from './schema/tower-order/resolver';


import graphql from './server/graphql';
import rest from './server/rest';



(async () => {

  useContainer(Container);

  const connectionOptions: ConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'connector_db',
    synchronize: true,
    logging: false,
    entities: [TowerOrder, TowerOrderItem],
    namingStrategy: new SnakeNamingStrategy()
  };

  try {
    await createConnection(connectionOptions);
  } catch (e) {
    console.error(`Connection error: ${e.message}`);
  }



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
