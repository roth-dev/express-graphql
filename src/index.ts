require('dotenv')
import { socket } from '../socket'

import express from 'express';
import mongoose from 'mongoose';
import { graphqlHTTP } from 'express-graphql';
import graphqlSchema from './graphql/schema';
import graphqlResolver from './graphql/resolver';
import { auth } from './middleware/auth';
import { errorHandler } from './middleware/error.middleware';
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === "OPTIONS") {
        return res.sendStatus(200)
    }
    next();
});
// middlware
app.use(auth)
app.use(errorHandler);

app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    customFormatErrorFn: (error: any) => {
        if (!error.originalError) {
            return error
        }
        const data = error.originalError.data;
        const message = error.message || "An error occured!";
        const code = error.originalError.code || 500;
        return { message: message, status: code, data: data }
    }
}));

app.use((error: any, req: any, res: any, next: any) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

const port = process.env.PORT;

mongoose
    .connect(
        'mongodb+srv://rothdev:z86Mmvbk8bCzSlGw@cluster0.ovtru.mongodb.net/node-complete?retryWrites=true&w=majority',
        {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
    )
    .then(result => {
        const server: any = app.listen(port);
        const io = socket.init(server);
        io.on("connection", () => {
            console.log('Client connected');
        })
    }).catch((e) => {
        console.log(e)
    })

