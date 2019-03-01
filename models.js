import axios from 'axios'

class Brewery {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3000' // json-server endpoint
    })
  }

  list() {
    return this.api.get('/breweries').then(res => res.data)
  }
}

export default new Brewery()
