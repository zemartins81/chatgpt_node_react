import axios from "axios";

const URL = 'http://localhost:5555/api/prompt';

export const makeRequest = async (message) => {
    // Aqui está a correção, "return" antes de "axios.post"
    return await axios.post(URL, message)
        .then(response => {
            const {data} = response.data
            return data;
        })
        .catch(error => {
            console.log(error)
            throw error;
        })
}