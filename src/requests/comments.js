import axios from 'axios';


export const getComments = async(id) => {
    let resp;
    const url = "https://ethamsterdam.herokuapp.com/streams/"+id+"/comments";
    axios.get(url).then(tresp => {
        console.log(tresp);
      
  tresp = resp;
  });

  return resp;
}
   
export const postComment = async(id,message,token) => {
    let resp;
    const url = "https://ethamsterdam.herokuapp.com/streams/"+id+"/comments";
    const header= "Authorization: Bearer"+token;
    axios({
        method: 'post',
        url,
        data: {
            body: message
        
        },
        headers: {header},
      }).then(tresp => {
        console.log(tresp);
      
  tresp = resp;
  });

  return resp;
}
   