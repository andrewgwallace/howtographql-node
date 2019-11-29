const { GraphQLServer } = require('graphql-yoga')

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]
// Simple integer variable to generate unique IDs for newly created Link elements.
let idCount = links.length 

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description, 
                url: args.url,
            }
            links.push(link)
            return link
        }
    },
    // Link resolver not needed as the server infers what they look like (from within typeDefs)
    // Link: {
    //     id: (parent) => parent.id,
    //     description: (parent) => parent.description,
    //     url: (parent) => parent.url,
    // }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql', // Type definitions
    resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))