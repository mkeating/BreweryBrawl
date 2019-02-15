import { gql } from 'apollo-server-express'
import userModel from './models'

export const typeDefs = gql`
  type User {
    id: ID
    name: String
    age: Int
    email: String
    friends: [User]
  }

  type Query {
    users: [User]
  }
`


export const resolvers = {
  Query: {
    users() {
      return userModel.list()
    }
  }
}
