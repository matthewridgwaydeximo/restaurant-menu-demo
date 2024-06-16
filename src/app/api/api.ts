import axios from "axios";

const BASE_URL =
    "https://restaurant-menu-demo-30064-default-rtdb.asia-southeast1.firebasedatabase.app/";

export const api = async (method: string, path: string, params: {} = {}) => {
    const url = `${BASE_URL}${path}`;

    const options = {
        method: method,
        url: url,
        headers: {
            "Content-Type": "application/json",
        },
        data: params,
    };

    try {
        const response = await axios(options);
        return response.data;
    } catch (error: any) {
        throw new Error(`HTTP error! status: ${error.response.status}`);
    }
};
