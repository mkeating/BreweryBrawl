const { buildSchema } = require('graphql');

const schema = buildSchema(`

  type Location {
    city: String!
    state: String!
    lat: Float
    lng: Float
  }

  type Brewery {
    id: ID!
    name: String!
    country
  }
`)
