import { Document, model, Schema, Model } from "mongoose";


export interface IChat extends Document {
    uid: string
    message: string;

};

const ChatSchema = new Schema<IChat, Model<IChat>>({
    uid: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },

});

export default model<IChat>('Chat', ChatSchema);
