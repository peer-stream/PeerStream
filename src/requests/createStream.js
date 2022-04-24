const axios = require('axios')

const createStream = async (title, description, token) => {
    const response = await axios
    .post('https://ethamsterdam.herokuapp.com/streams/', JSON.stringify({ title, description }), {
        headers: {
            'Authorization': 'Bearer '+ token,
            'Content-Type': 'application/json'
        }
    });
    return response.data;
}

export default createStream;