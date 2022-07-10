import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-waffle";
import "dotenv/config";

const network = process.env.NETWORK
const main = process.env.PRIVATE_KEY as unknown as string

const config: HardhatUserConfig = {
  solidity: "0.8.0",
  networks: {
    kovan: {
      url: network,
      accounts: [main],
      gas: 'auto',
    //   gasLimit: 3_000_000,
    // // gasPrice: 20,
    // // nonce: 85,
    }
  }
};

export default config;
