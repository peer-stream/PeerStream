import { videonft } from '@livepeer/video-nft'

// To upload videos from the filesystem
const uploader = new videonft.minter.Uploader();
// To process videos and export to IPFS
const vodApi = new videonft.minter.Api({ auth: { apiKey } });
// To mint the NFT from the IPFS files
const { chainId } = ethereum
const web3 = new videonft.minter.Web3({ ethereum, chainId });