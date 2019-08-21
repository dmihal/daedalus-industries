import React, { Component } from 'react';

const STAKE_AMOUNT = '1000000000000000000';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'start',
      numClues: 0,
      clueStatus: {},
    }
  }

  componentDidUpdate() {
    this.updateGame();
  }
  componentDidMount() {
    this.updateGame();
  }

  async updateGame() {
    let { status, numClues } = this.state;
    const { accounts, plugin } = this.props;
    const contract = plugin.getContract();

    if (numClues === 0) {
      numClues = (await contract.methods.numClues().call()).toNumber();
      this.setState({ numClues });
    }

    if (accounts.length === 0) {
      return;
    }

    if (status === 'start') {
      const staked = await contract.methods.remainingStake(accounts[0]).call();
      if (staked.toString() === '0') {
        this.setState({ status: 'unstaked' });
        return;
      }

      this.updateGameStatus();
    }
  }

  async stake() {
    const { assets, plugin, accounts } = this.props;
    const [asset] = assets.filter(asset => asset.id === plugin.assetId);
    this.setState({ status: 'approving' });
    await asset.approve(accounts[0], plugin.getContract().address, STAKE_AMOUNT);
    this.setState({ status: 'staking' });
    await plugin.getContract().methods.stake(STAKE_AMOUNT).send({ from: accounts[0] });
    this.updateGameStatus();
  }

  async updateGameStatus() {
    const { plugin, accounts } = this.props;
    const [account] = accounts;
    const clueStatus = {};
    let unlockedAll = true;
    for (let i = 1; i <= this.state.numClues; i++) {
      if (plugin.getStoredClue(i)
        || await plugin.getContract().methods.foundClue(account, i).call()) {
        clueStatus[i] = true;
      } else {
        unlockedAll = false;
      }
    }
    const status = unlockedAll ? 'unlocked' : 'playing';
    this.setState({ clueStatus, status });
  }

  render() {
    const { accounts, burnerComponents, plugin } = this.props;
    const { status, clueStatus, numClues } = this.state;

    if (accounts.length === 0) {
      return null;
    }

    const { Button, AccountBalance } = burnerComponents;

    if (status === 'unstaked') {
      return (
        <div>
          <div>You must stake 20 Dai to start</div>
          <AccountBalance
            asset={plugin.assetId}
            account={accounts[0]}
            render={(err, balance) => (
              balance < 20 ? (
                <div>Add 20 Dai to unlock staking</div>
              ) : (
                <Button onClick={() => this.stake()}>Stake 20 Dai</Button>
              )
            )}
          />
        </div>
      );
    }

    if (status === 'start') {
      return 'Loading...';
    }

    if (status === 'approving') {
      return (<div>Approving...</div>);
    }
    if (status === 'staking') {
      return (<div>Staking...</div>);
    }

    if (status === 'playing') {
      return (
        <div>
          {[...Array(numClues).keys()].map(i => (
            <div key={`clue${i + 1}`}>{i + 1}: {clueStatus[i + 1] ? 'Unlocked' : 'Locked'}</div>
          ))}
        </div>
      );
    }

    if (status === 'unlocked') {
      return (
        <div>
          <div>All clues unlocked</div>
          <Button>Scan</Button>
        </div>
      );
    }

    return `Unknown status ${status}`;
  }
}