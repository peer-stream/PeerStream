const axios = require('axios');

const authorization = async (address, signature) => {
    const auth = await axios
    .post('https://ethamsterdam.herokuapp.com/auth/token', {
        address, 
        signature
    })
    console.log(auth.data);
    return auth.data.token;
}

export default authorization;