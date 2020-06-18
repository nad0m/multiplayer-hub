const gqlTag = require("graphql-tag")

const schema = gqlTag`
  type Message {
    content: String!
  }

  type Query {
    greeting: Message!
  }
`
module.exports = schema