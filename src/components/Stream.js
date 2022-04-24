/**
 * donation
 * comment
 * 
 */
 import { useWeb3 } from '../utils/web3ModalContext';
 import { useEffect } from 'react';

const Stream = (props) => {
    const web3 = useWeb3();
    const connectToWallet = async () => {
        await web3.connect();
    }

    useEffect(() => {
        if(web3.account == null){
          connectToWallet();
        }
        connectToWallet();
    });

    return (
        <div>
            
        </div>
    )
}

export default Stream;