/**
 * stream thumbnails?
 * stream titles
 */
 import { useWeb3 } from '../utils/web3ModalContext';
 import { useEffect } from 'react';
const StreamList = (props) => {
    const web3 = useWeb3();


    const connectToWallet = async () => {
      await web3.connect();
      // web3.account -> wallet address
    }



    useEffect(() => {
      if(web3.account == null){
        connectToWallet();

      }
      connectToWallet();


      });


  
    return (
        <div>
        </div>)
}

export default StreamList;