import { useWeb3 } from '../utils/web3ModalContext';
import { useEffect, useState } from 'react';
import getStreams from '../utils/streams';
import { Link } from 'react-router-dom';
const StreamList = (props) => {
  const [data, setData] = useState([]);

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


  /**
   * created_at: "2022-04-24T04:24:14.034Z"
    description: "asgsg"
    id: "r4sg-GCzhkC0s5lTOxx1T"
    livepeer_id: "f4c59fff-63a0-43c6-a47d-f6e050cf2985"
    livepeer_playback_id: "f4c5d7ijxm8txrz6"
    owner_id: "ZGf8G4b42ObAbKnY6I2n2"
    playback_url: "https://livepeercdn.com/hls/f4c5d7ijxm8txrz6/index.m3u8"
    rtmp_ingest_url: "rtmp://rtmp.livepeer.com/live"
    srt_ingest_url: "srt://rtmp.livepeer.com:2935?streamid=undefined"
    title: "asdsaf"
    updated_at: "2022-04-24T04:24:14.034Z"
   */
  return (
      <div>
        {data.map((d)=> (
        <div>
          <Link className='link' to={`/watch/${d.livepeer_playback_id}`}>
            <h1>{d.title}</h1>
            <p>{d.description}</p>
          </Link>
        </div>
        ))}
      </div>)
}

export default StreamList;

