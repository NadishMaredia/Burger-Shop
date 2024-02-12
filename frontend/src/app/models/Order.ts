import { Cart } from "./Cart";

export interface Order {
    _id?: String;
    userId: String | null;
    cart: Cart[];
    status: String;
    paymentStatus: String;
    createdDate: String;
    totalAmount: String;
}