import axios from "axios";

export const getUser = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_TEACH_MINT_URL}users`);
        return response.data
    } catch (error) {
        throw error;
    }
}

export const getUserPostDetails = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_TEACH_MINT_URL}posts`);
        return response.data
    } catch (error) {
        throw error;
    }
}

export const getCountries = async () => {
    try {
        const response = await axios.get( "http://worldtimeapi.org/api/timezone");
        return response.data
    } catch (error) {
        throw error;
    }
}
