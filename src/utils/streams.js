import axios from 'axios';


export const getStreams = async(id) => {
    let resp;
    url = "https://ethamsterdam.herokuapp.com/streams/";
    axios.get(url).then(tresp => {
        console.log(tresp);
      
  tresp = resp;
  });

  return resp;
}
   



