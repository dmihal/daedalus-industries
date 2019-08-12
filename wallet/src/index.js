import React from 'react';
import ReactDOM from 'react-dom';
import BurnerCore from '@burner-wallet/core';
import { xdai, dai, eth } from '@burner-wallet/assets';
import { InjectedSigner, LocalSigner } from '@burner-wallet/core/signers';
import { InfuraGateway, InjectedGateway, XDaiGateway, } from '@burner-wallet/core/gateways';
import Exchange from '@burner-wallet/exchange';
import { xdaiBridge, uniswapDai } from '@burner-wallet/exchange/pairs';
import BurnerUI from '@burner-wallet/ui';
import DaedalusPlugin from './daedalus-plugin';


const core = new BurnerCore({
  signers: [new InjectedSigner(), new LocalSigner()],
  gateways: [
    new InjectedGateway(),
    new InfuraGateway(process.env.REACT_APP_INFURA_KEY),
    new XDaiGateway(),
  ],
});

const exchange = new Exchange({
  pairs: [xdaiBridge, uniswapDai],
});

const BurnerWallet = () =>
  <BurnerUI
    title="Daedalus Industries"
    core={core}
    assets={[xdai, dai, eth]}
    plugins={[exchange, new DaedalusPlugin()]}
  />

ReactDOM.render(<BurnerWallet />, document.getElementById('root'));
