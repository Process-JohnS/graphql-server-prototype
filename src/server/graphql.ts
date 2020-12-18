
import { ApolloServer } from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';
import { Express } from 'express';


/**
 * GraphQL Middleware
 * 
 * @param {Express} app
 * @param {GraphQLSchema} schema
 * 
*/

export default (app: Express, schema: GraphQLSchema) => {

  const graphql = new ApolloServer({
    schema,

    /*
      If true, enables schema introspection by clients.
      https://graphql.org/learn/introspection/
    */
    introspection: true,

    /*
      If true, the server hosts GraphQL Playground from its URL.
      https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/
    */
    playground: true
  });

  graphql.applyMiddleware({ app, path: '/graphql' });
}
