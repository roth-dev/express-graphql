import User from '../models/user';
export declare type ErrorInput = {
    message: string;
};
interface User {
    email?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
}
export declare type UserInput = {
    userInput: User;
};
declare const _default: {
    createUser: ({ userInput }: UserInput, req: any) => Promise<{
        token: string;
    }>;
    requestLogin: ({ email, password }: User) => Promise<{
        token: string;
        userId: any;
    }>;
};
export default _default;
