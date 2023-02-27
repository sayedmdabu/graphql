const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const usersData = require('./users.json');

const app = express();
// Construct a schema, using GraphQL schema language

let fakeDb = [
  {id:1, name:"Office", rent: "$25"},
  {id:2, name:"co-working", rent: "$10"},
];

const schema = buildSchema(`
  type Person {
    name: String,
    email: String,
    id: Int
  }

  type Query {
    users: [Person],
    user(id: Int): Person
    getMsg: String
    getSpace(id:ID!) : Space!
    
  }

  type Space {
    name: String
    rent: String
  }

  input SpaceInput {
    name: String
    rent: String
  }


  type Mutation {
    addMsg(msg: String): String
    createSpace(input: SpaceInput): Space!
    updateSpace(id:ID!, input:SpaceInput):Space!
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  users: () => usersData,
  user:({id}) => usersData.find((user) => user.id === id),
  addMsg: ({msg}) => (fakeDb.message = msg),
  getMsg: () => fakeDb.message,
  createSpace: ({input}) => (fakeDb[fakeDb.length] = {id:fakeDb.length, name:input.name, rent:input.rent}),
  getSpace: ({id}) => fakeDb.find(space => space.id == id),

  updateSpace: ({id, input}) =>{
    const index = id-1;
    fakeDb[index] = {id, name:input.name, rent:input.rent}
    return fakeDb[index]
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

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API server at http://localhost:4000/graphql');