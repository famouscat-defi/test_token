import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-waffle";
import "dotenv/config";

const network = process.env.NETWORK
const main = process.env.PRIVATE_KEY as unknown as string

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    kovan: {
      url: network,
      accounts: [main]
    }
  }
};

export default config;
