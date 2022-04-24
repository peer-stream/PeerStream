import axios from 'axios';


export const getComments = async(id) => {
    let resp;
    url = "https://ethamsterdam.herokuapp.com/streams/"+id+"/comments";
    axios.get(url).then(tresp => {
        console.log(tresp);
      
  tresp = resp;
  });

  return resp;
}
   



export const postComment = async(id,message,token) => {
    let resp;
    url = "https://ethamsterdam.herokuapp.com/streams/"+id+"/comments";
    header= "Authorization: Bearer"+token;
    axios({
        method: 'post',
        url: '/login',
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
   