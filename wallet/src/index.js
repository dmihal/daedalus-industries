import React from 'react';
import ReactDOM from 'react-dom';
import BurnerCore from '@burner-wallet/core';
// import { dai, eth } from '@burner-wallet/assets';
import { ERC20Asset, NativeAsset } from '@burner-wallet/assets';
import { InjectedSigner, LocalSigner } from '@burner-wallet/core/signers';
// import { InfuraGateway, InjectedGateway, XDaiGateway, } from '@burner-wallet/core/gateways';
import { HTTPGateway } from '@burner-wallet/core/gateways';
import Exchange from '@burner-wallet/exchange';
import { uniswapDai } from '@burner-wallet/exchange/pairs';
import BurnerUI from '@burner-wallet/ui';
import DaedalusPlugin from './daedalus-plugin';


const core = new BurnerCore({
  signers: [new InjectedSigner(), new LocalSigner()],
  gateways: [
    new HTTPGateway('http://localhost:8545', '5777'),
    // new InjectedGateway(),
    // new InfuraGateway(process.env.REACT_APP_INFURA_KEY),
    // new XDaiGateway(),
  ],
});

// const exchange = new Exchange({
//   pairs: [uniswapDai],
// });

const BurnerWallet = () =>
  <BurnerUI
    title="Daedalus Industries"
    core={core}
    assets={[
      new NativeAsset({ id: 'geth', name: 'gETH', network: '5777' }),
      new ERC20Asset({ id: 'tdai', name: 'tDai', network: '5777', address: '0x5986e6ACdD4Ca053d782adEDaC2008A0A6635411' }),
    ]}
    // assets={[dai, eth]}
    plugins={[
      // exchange,
      new DaedalusPlugin({ assetId: 'tdai', contractAddress: '0x16E1CfF1A7066B908d4649ADd97aA6FfF4E0fDB5', network: '5777' }),
    ]}
  />

ReactDOM.render(<BurnerWallet />, document.getElementById('root'));
