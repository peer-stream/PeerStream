const request = require('request');

const authorization = async (address, signature) => {
    const headers = {
        'content-type': 'application/json'
    };

    const dataString = `{"address": "${address}", "signature": "${signature}"}`;

    const options = {
        url: 'https://ethamsterdam.herokuapp.com/auth/token',
        method: 'POST',
        headers: headers,
        body: dataString
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            return response;
        }
    }

    return request(options, callback);
}

export default authorization;