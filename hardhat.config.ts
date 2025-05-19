import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  paths: {
    sources: "./node_modules", // node_modules 디렉터리를 컴파일 대상으로 지정
  },
};

export default config;
