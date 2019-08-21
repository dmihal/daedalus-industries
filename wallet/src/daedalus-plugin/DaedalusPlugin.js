import puzzleABI from './abi/Puzzle.json';
import DiscoverCluePage from './ui/DiscoverCluePage';
import AccountStatus from './ui/AccountStatus';
import Game from './ui/Game';
import Bridge from './Bridge';

export default class DaedalusPlugin {
  constructor({ assetId, contractAddress, network }) {
    this.assetId = assetId;
    this.contractAddress = contractAddress;
    this.network = network;

    this.contract = null;
  }

  initializePlugin(pluginContext) {
    this._pluginContext = pluginContext;

    pluginContext.addPage('/discover/:pk', DiscoverCluePage);
    pluginContext.addElement('home-top', AccountStatus);
    pluginContext.addElement('home-middle', Game);

    this.bridge = new Bridge();
  }

  getContract() {
    if (!this.contract) {
      const web3 = this._pluginContext.getWeb3(this.network);
      this.contract = new web3.eth.Contract(puzzleABI, this.contractAddress);
    }
    return this.contract;
  }

  getWeb3() {
    return this._pluginContext.getWeb3(this.network);
  }

  storeClue(index, privateKey) {
    const clues = JSON.parse(localStorage.getItem('storedClues') || '{}');
    clues[index] = privateKey;
    localStorage.setItem('storedClues', JSON.stringify(clues));
  }

  getStoredClue(index) {
    const clues = JSON.parse(localStorage.getItem('storedClues') || '{}');
    return clues[index];
  }
}
