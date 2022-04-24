/**
 * donation
 * comment
 * 
 */
 import { useWeb3 } from '../utils/web3ModalContext';
 import { useEffect } from 'react';
 import VREPlayer from 'videojs-react-enhanced';
 import 'video.js/dist/video-js.css';

const Stream = ({ id }) => {

    const playerOptions = {
      controls: true,
      autoplay: "play",
    };
    const videojsOptions = {
      fluid: true,
    };
    const videoResources = {
      sources: [
        {
          src: `https://livepeercdn.com/asset/${id}/video`,
          type: 'video/mp4'
        },
      ],
    }

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
            <VREPlayer
                playerOptions={playerOptions}
                videojsOptions={videojsOptions}
                resources={videoResources}
                onReady={(player) => {
                    player.play();
                }}
                onPlay={(e, _, second) => console.log('Play!')}
                onPause={(e, _, second) => console.log('Pause!')}
                onEnded={(e, _) => {
                }}
            />
        </div>
    )
}

export default Stream;