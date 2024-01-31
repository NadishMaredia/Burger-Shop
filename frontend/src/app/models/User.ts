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