import axios from 'axios';


export const getStreams = async() => {
    let resp;
    let url = "https://ethamsterdam.herokuapp.com/streams/";
    axios.get(url).then(tresp => {
        console.log(tresp);
      
  tresp = resp;
  });

  return resp;
}
   



