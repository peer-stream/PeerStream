/**
 * stream thumbnails?
 * stream titles
 */
 import { useWeb3 } from '../utils/web3ModalContext';
 import { useEffect, useState } from 'react';
import getStreams from '../utils/streams';
const StreamList = (props) => {
  const [data, setData] = useState();

  const web3 = useWeb3();
  const connectToWallet = async () => {
      await web3.connect();
  }
  const getData = async () => {
    const token = localStorage.getItem('access_token');
    const data = await getStreams(token);
    console.log(data);
    setData(data);
  }

  useEffect(() => {
      if(web3.account == null){
        connectToWallet();
      }
      connectToWallet();
      getData();
  },[]);


  
  return (
      <div>
      </div>)
}

export default StreamList;

