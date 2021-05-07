import Chat, { IChat } from '../models/chat'
import { socket } from '../../socket';
import { createUser, requestLogin } from './auth/authResolver'
export type ErrorInput = {
    message: string
    code?: number
    status?: string
    data?: any
}
export default {
    createUser,
    requestLogin,
    chat: async function ({ message, uid }: IChat) {
        const data = {
            uid: uid,
            message: message
        }
        const chat = await new Chat(data).save();
        socket.getIO().emit("chat", { action: 'message', message: chat.message })
        return { message: chat.message }
    },
    getChat: async function () {
        const data = await new Chat();
        console.log(data)
        return { message: data.message }
    }
}