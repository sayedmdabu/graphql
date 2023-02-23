const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const usersData = require('./users.json');

const app = express();
// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Person {
    name: String,
    email: String
  }

  type Query {
    users: [Person],
    user(id: Int): Person
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  users: () => usersData,
  user:({id}) => usersData.find((user) => user.id === id),
};

// fetch('/graphql', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     },
//     body: JSON.stringify({query: "{ name,email }"})
//   });

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API server at http://localhost:4000/graphql');