import request from 'request';

const createStream = async (title, description) => {
    const headers = {
        'content-type': 'application/json'
    };

    const dataString = `{"title": "${title}", "description": "${description}"}`;

    const options = {
        url: 'https://ethamsterdam.herokuapp.com/streams/',
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

export default createStream;