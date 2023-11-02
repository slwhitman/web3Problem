import Web3 from "web3";
Web3.providers.HttpProvider.prototype.sendAsync =
  Web3.providers.HttpProvider.prototype.send;

let web3: any;

const getWeb3 = () =>
  new Promise(async (resolve, reject) => {
      // @ts-ignore
      if (window && window.ethereum) {
        // @ts-ignore
        web3 = new Web3(window.ethereum);
        const networkId = await web3.eth.net.getId();
        console.log("chainId", networkId);
        if (Number(networkId) !== Number(5)) {
          console.log("Wrong Network, please connect to Mainnet");
        }
        resolve(web3);
      }

      // @ts-ignore
      else if (window && window.web3) {
        // Use Mist/MetaMask's provider.
        // @ts-ignore
        web3 = window.web3;
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider: any = new Web3.providers.HttpProvider(
          process.env.REACT_APP_INFURA_URL || "https://mainnet.infura.io/v3/3a0c0f8b7bf7435ba9ec3b440eaa403e"
        );
        web3 = new Web3(provider);
        resolve(web3);
      }
  });

export function setWeb3(_web3: any) {
  web3 = _web3;
}

export function getWeb3Var() {
  return web3;
}

export default getWeb3;
