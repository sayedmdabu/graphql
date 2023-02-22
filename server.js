const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    name: String
    email: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  name: () => {
    return 'Md Abu Sayed';
  },
  email: () => {
    return 'sayed@gmail.com';
  },
};

// fetch('/graphql', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     },
//     body: JSON.stringify({query: "{ name,email }"})
//   });




const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API server at http://localhost:4000/graphql');