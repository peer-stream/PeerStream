/**
 * stream creation
 */
import { useWeb3 } from '../utils/web3ModalContext';
import { useEffect } from 'react';

const StreamCreation = (props) => {
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
            <button>Create</button>
        </div>)
}

export default StreamCreation;