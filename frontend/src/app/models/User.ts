export interface User {
    _id: String;
    name: String;
    email: String;
    role: String;
}

export interface LoginRequest {
    email: String;
    password: String;
}

export interface LoginResponse {
    user: User;
    token: String;
}

export interface SignupRequest {
    name: String;
    email: String;
    password: String;
    role: String;
}

export interface SignupResponse {
    message: String;
    user: User;
    token: String;
}

export interface UserSession {
    _id: String;
    name: String;
    token: String;
}