const request = require('request');

const createNonce = async (address) => {
    const headers = {
        'content-type': 'application/json'
    };

    const dataString = `{"address": "${address}"}`;

    const options = {
        url: 'https://ethamsterdam.herokuapp.com/auth/nonce',
        method: 'POST',
        headers: headers,
        body: dataString
    };

    async function callback(error, response, body) {
        console.log(JSON.parse(body))
        if (!error && response.statusCode === 200) {
            return await JSON.parse(body);
        }
    }

    return request(options, callback);
}

export default createNonce;