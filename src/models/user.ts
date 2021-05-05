import { Document, model, Schema, Model } from "mongoose";


export interface IUser extends Document {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string
};

export interface ICreateUserInput {
    userInput: {
        email: IUser['email'];
        firstName: IUser['firstName'];
        lastName: IUser['lastName'];
        password: IUser['password'];
    }

}
const UserSchema = new Schema<IUser, Model<IUser>>({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
});


export default model<IUser>('User', UserSchema);
