import React from 'react';
import ReactDOM from 'react-dom';
import BurnerCore from '@burner-wallet/core';
// import { dai, eth } from '@burner-wallet/assets';
import { ERC20Asset, NativeAsset } from '@burner-wallet/assets';
import { InjectedSigner, LocalSigner } from '@burner-wallet/core/signers';
import { InfuraGateway, InjectedGateway, XDaiGateway, } from '@burner-wallet/core/gateways';
// import { HTTPGateway } from '@burner-wallet/core/gateways';
import Exchange from '@burner-wallet/exchange';
import { uniswapDai } from '@burner-wallet/exchange/pairs';
import BurnerUI from '@burner-wallet/ui';
import DaedalusPlugin from './daedalus-plugin';


const core = new BurnerCore({
  signers: [new InjectedSigner(), new LocalSigner()],
  gateways: [
    // new HTTPGateway('http://localhost:8545', '5777'),
    new InjectedGateway(),
    new InfuraGateway(process.env.REACT_APP_INFURA_KEY),
    // new XDaiGateway(),
  ],
  assets: [
    new NativeAsset({ id: 'keth', name: 'kETH', network: '42' }),
    new ERC20Asset({ id: 'kdai', name: 'kDai', network: '42', address: '0xc4375b7de8af5a38a93548eb8453a498222c4ff2' }),
  ],
});

// const exchange = new Exchange({
//   pairs: [uniswapDai],
// });


const theme = {
  background: '#282325',
  titleFont: '"workSans", sans-serif',
  paperBackground: '#282325',
  accentColor: '#E84441',
  homeButtonColor: '#BBBBBB',
};

const BurnerWallet = () =>
  <BurnerUI
    title="daedalus industries"
    core={core}
    // assets={[
      // new NativeAsset({ id: 'geth', name: 'gETH', network: '5777' }),
      // new ERC20Asset({ id: 'tdai', name: 'tDai', network: '5777', address: '0x5986e6ACdD4Ca053d782adEDaC2008A0A6635411' }),
    // ]}
    // assets={[dai, eth]}
    plugins={[
      // exchange,
      new DaedalusPlugin({ assetId: 'kdai', contractAddress: '0x6f31E366f5A009F29C3e2d37b2268979624a6C66', network: '42' }),
      // new DaedalusPlugin({ assetId: 'tdai', contractAddress: '0x0ACf5Ab7B4a80DEe293cC8DdE06b29C5798e2A72', network: '5777' }),
    ]}
    theme={theme}
  />

ReactDOM.render(<BurnerWallet />, document.getElementById('root'));
