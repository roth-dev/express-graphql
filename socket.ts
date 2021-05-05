import { Server, ServerOptions } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export type HttpServer = Partial<ServerOptions> | undefined

type IO = Server<DefaultEventsMap, DefaultEventsMap>

let io: IO;

export const socket = {
    init: (httpServer: HttpServer) => {
        io = new Server(httpServer);
        return io;
    },
    getIO: () => {
        if (!io) {
            throw new Error('Socket.io not initialized!');
        }
        return io;
    }
};
