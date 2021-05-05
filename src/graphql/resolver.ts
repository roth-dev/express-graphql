require('dotenv').config();
import bcrypt from 'bcryptjs';
import validator from 'validator';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user';
import Chat, { IChat } from '../models/chat'
import { socket } from '../../socket';
export type ErrorInput = {
    message: string
    code?: number
    status?: string
    data?: any
}
export default {
    createUser: async function ({ email, password, firstName, lastName }: IUser, req: any) {
        const errors: ErrorInput[] = [];
        if (!validator.isEmail(email!)) {
            errors.push({ message: "E-mail is invalid!" })
        }
        if (validator.isEmpty(password!) || !validator.isLength(password!, { min: 6 })) {
            errors.push({ message: "password to short!" })
        }
        if (errors.length > 0) {
            const error = new Error(errors[0]['message']) as ErrorInput;
            error.data = errors;
            error.code = 422;
            throw error;

        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            const error = new Error("User exists already!");
            throw error
        };
        const hashpw = await bcrypt.hash(password!, 12);
        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashpw
        }
        const token = await jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET!);
        await new User(userData).save();
        return { token }
    },
    requestLogin: async function ({ email, password }: IUser) {
        const user = await User.findOne({ email: email })
        if (!user) {
            const error: ErrorInput = new Error("user not found.")
            error.code = 401;
            throw error
        }
        const isEqual = await bcrypt.compare(password!, user.password);

        if (!isEqual) {
            const error: ErrorInput = new Error("Password is incorrect.")
            error.code = 401;
            throw error
        }
        const token = jwt.sign({
            userId: user._id.toString(),
            email: user.email
        }, process.env.ACCESS_TOKEN_SECRET!)
        return { token, userId: user._id.toString() }
    },
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