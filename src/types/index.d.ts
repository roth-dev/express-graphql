/// <reference types="express-serve-static-core" />
/// <reference types="serve-static" />

declare namespace Express {
    export interface Request {
        isAuth?: boolean;
        userId?: string
    }
}