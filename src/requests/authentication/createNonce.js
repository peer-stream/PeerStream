const axios = require('axios')

const createNonce = async (address) => {
    const nonce = await axios
    .post('https://ethamsterdam.herokuapp.com/auth/nonce', {
    address
    })
    return nonce.data.message_to_sign;
}

export default createNonce;