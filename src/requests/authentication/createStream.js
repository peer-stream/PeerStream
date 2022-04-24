const axios = require('axios')

const createStream = async (title, description) => {
    const streamData = await axios
    .post('https://ethamsterdam.herokuapp.com/streams/', {
        title,
        description
    })
    return streamData;
}

export default createStream;