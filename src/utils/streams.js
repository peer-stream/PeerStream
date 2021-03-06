import axios from 'axios';


const getStreams = async(token) => {
    const response = await axios.get('https://ethamsterdam.herokuapp.com/streams/', {
      headers: {
          'Authorization': 'Bearer '+ token,
          'Content-Type': 'application/json'
      }
    });
    return response.data;
  }

export default getStreams;