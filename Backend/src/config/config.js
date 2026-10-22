import dotenv from "dotenv"
dotenv.config();
if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment ");
}
if (!process.env.CLIENT_ID) {
    throw new Error("CLIENT_ID is not defined in environment ");
}
if (!process.env.CLIENT_SECRET) {
    throw new Error("CLIENT_SECRET is not defined in environment ");
}
export const config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET

}