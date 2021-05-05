import { buildSchema } from 'graphql';

export default buildSchema(`
    
    type Chat {
        uid: String!
        message: String!
    }

    type AuthData { 
        userId: String
        token: String
    }
    type RootQuery {
        hello: String
        getChat: Chat!
    }
    type Post {
        _id: ID!
        title: String
        content: String
        imageUrl: String
        creator: User!
        createdAt: String
        updatedAt: String
    }
    type User {
        token: String
    }
    input userInputData {
        email: String!
        lastName: String!
        firstName: String!
        password: String! 
    }
    type RootMutation {
        createUser(
            email: String!
            lastName: String!
            firstName: String!
            password: String!): User!
        requestLogin(email: String! password: String!): AuthData!
        chat(message: String! uid: String!): Chat!
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `
)