import axios from "axios";

export const api = axios.create({
    baseURL: "https://www.thecocktaildb.com/api",
    timeout: 10000000,
});