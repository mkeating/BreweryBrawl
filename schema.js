import { gql } from 'apollo-server-express'
import breweryModel from './models'

export const typeDefs = gql`
  type Brewery {
    brewery_id: ID!
    brewery_name: String!
    brewery_label: String
    location: [Location]
  }

  type Location {
    brewery_city: String
    brewery_state: String
    lat: Float
    lng: Float
  }

  type Query {
    brewery: [Brewery]
  }
`


export const resolvers = {
  Query: {
    brewery() {
      return breweryModel.list()
    }
  }
}
