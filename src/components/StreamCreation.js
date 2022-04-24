import { useWeb3 } from '../utils/web3ModalContext';
import { useEffect, useState } from 'react';
import createStream from '../requests/createStream';

const StreamCreation = (props) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [data, setData] = useState();
    const [available, setAvailable] = useState(false);

    const web3 = useWeb3();
    const connectToWallet = async () => {
        await web3.connect();
    }
    
    const titleChange = (e) => {
        setTitle(e.target.value);
    }
    const descChange = (e) => {
        setDescription(e.target.value);
    }

    const onClick = async () => {
        const token = localStorage.getItem('access_token');
        const data = await createStream(title, description, token);
        setTitle('');
        setDescription('');
        setData(data);
        setAvailable(true);
    }

    useEffect(() => {
        if(web3.account == null){
          connectToWallet();
        }
        connectToWallet();
    },[]);

    return (
        <div>
            <input onChange={titleChange} type="text" placeholder="Title"/>
            <input onChange={descChange} type="text" placeholder="Description"/>
            <button onClick={onClick} type="submit">Create</button>
            {available ? <div>
                <p>Livepeer ID: {data.livepeer_id}</p>
                <p>Livepeer Stream Key: {data.livepeer_stream_key}</p>
                <p>RMTP Ingest URL: {data.rtmp_ingest_url}</p>
                <p>SRT Ingest URL: {data.srt_ingest_url}</p>
                <p>Playback URL: {data.playback_url}</p>
            </div>: <div></div>}
        </div>)
}

export default StreamCreation;