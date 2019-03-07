import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { resolvers, typeDefs } from './schema'
const cors = require('cors');


const PORT = process.env.PORT || 3500
const app = express()
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true
})

server.applyMiddleware({ app })

app.get('/', (req, res) => {
  res.send({ hello: 'there!' })
})

app.get('/brawl', (req, res) => {
  res.render('index', { breweries: null, error: null });
})

app.listen(PORT, () =>
  console.log(`Listening at http://localhost:${PORT}/graphql`)
)
