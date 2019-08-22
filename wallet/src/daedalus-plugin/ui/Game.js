import React, { Component } from 'react';

const STAKE_AMOUNT = '1000000000000000000';

const StakeAmount = ({ amount }) => (
  <div className="BalanceRow_balanceRow__2DRQd">
    <div className="BalanceRow_assetName__1Zw3e">Staked</div>
    <div className="BalanceRow_assetBalance__3STUO">{amount}</div>
  </div>
)

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'start',
      numClues: 0,
      clueStatus: {},
      staked: '0',
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
    const web3 = plugin.getWeb3();
    const staked = await plugin.getContract().methods.remainingStake(account).call();
    this.setState({ clueStatus, status, staked: web3.utils.fromWei(staked.toString(), 'ether') });
  }

  getSignatures(account) {
    const web3 = this.props.plugin.getWeb3();
    const accounts = this.props.plugin.getStoredClues();

    const clues = [];
    const rs = [];
    const ss = [];
    const vs = [];
    Object.values(accounts).forEach(pk => {
      const clueAccount = web3.eth.accounts.privateKeyToAccount(pk);
      const { r, s, v } = clueAccount.sign(web3.utils.keccak256(account), pk);
      clues.push(clueAccount.address);
      rs.push(r);
      ss.push(s);
      vs.push(v);
    });

    return { clues, rs, ss, vs };
  }

  async donate() {
    const { plugin, accounts } = this.props;
    const contract = plugin.getContract();

    this.setState({ status: 'sending' });
    const { clues, rs, ss, vs } = this.getSignatures(accounts[0]);
    const remaining = await contract.methods.remainingStake(accounts[0]).call();
    await contract.methods.findCluesAndDonate(clues, vs, rs, ss, remaining).send({ from: accounts[0] });
    this.setState({ status: 'complete' });
  }

  async redeem() {
    const { plugin, accounts } = this.props;

    this.setState({ status: 'sending' });
    const { clues, rs, ss, vs } = this.getSignatures(this.props.accounts[0]);
    await plugin.getContract().methods.findCluesAndRedeem(clues, vs, rs, ss).send({ from: accounts[0], gas: 200000 });
    this.setState({ status: 'complete' });
  }

  render() {
    const { accounts, burnerComponents, plugin } = this.props;
    const { status, clueStatus, numClues, staked } = this.state;

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

    if (status === 'sending') {
      return (<div>Sending</div>);
    }

    if (status === 'complete') {
      return (<div>Complete</div>);
    }

    if (status === 'playing') {
      return (
        <div>
          <StakeAmount amount={staked}/>
          {[...Array(numClues).keys()].map(i => (
            <div key={`clue${i + 1}`}>{i + 1}: {clueStatus[i + 1] ? 'Unlocked' : 'Locked'}</div>
          ))}
          <Button onClick={() => this.props.actions.navigateTo('/secret')}>Secret Phrase</Button>
        </div>
      );
    }

    if (status === 'unlocked') {
      return (
        <div>
          <StakeAmount amount={staked}/>
          <div>All clues unlocked</div>
          <Button onClick={() => this.donate()}>Donate</Button>
          <Button onClick={() => this.redeem()}>Redeem</Button>
        </div>
      );
    }

    return `Unknown status ${status}`;
  }
}