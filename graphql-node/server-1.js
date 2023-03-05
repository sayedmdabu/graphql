const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Person {
    name: String
    email: [String]
  }

  type Developer {
    profile: Person,
    experience: Int
  }

  type Query {
    sayed: Developer,
    isDeveloper: Boolean
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  isDeveloper: () => 1,
  age: () => 2.12,
  name: () => {
    return 'Md Abu Sayed';
  },
  email: () => {
    return 'sayed@gmail.com';
  },

  sayed: () => {
    return {profile: {
      name: "sayed", email: ["sayed@gmail.com"]
    }, experience: 4}
  }
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