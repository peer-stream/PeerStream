/**
 * stream creation
 */
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
        console.log(token);
        const data = await createStream(title, description, token);
        setTitle('');
        setDescription('');
        setData(data);
        console.log(data.livepeer_id);
        console.log(data.livepeer_stream_key);
        console.log(data.rtmp_ingest_url);
        console.log(data.srt_ingest_url);
        console.log(data.playback_url);
        setAvailable(true);
    }

    useEffect(() => {
        if(web3.account == null){
          connectToWallet();
        }
        connectToWallet();
    },[]);
    // {"owner_id":"ZGf8G4b42ObAbKnY6I2n2","title":"asdsaf","description":"asgsg","livepeer_id":"f4c59fff-63a0-43c6-a47d-f6e050cf2985","livepeer_stream_key":"f4c5-n5yn-cqzj-hib6","livepeer_playback_id":"f4c5d7ijxm8txrz6","created_at":"2022-04-24T04:24:14.034Z","updated_at":"2022-04-24T04:24:14.034Z","id":"r4sg-GCzhkC0s5lTOxx1T","rtmp_ingest_url":"rtmp://rtmp.livepeer.com/live","srt_ingest_url":"srt://rtmp.livepeer.com:2935?streamid=f4c5-n5yn-cqzj-hib6","playback_url":"https://livepeercdn.com/hls/f4c5d7ijxm8txrz6/index.m3u8"}
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