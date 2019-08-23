import React, { Component } from 'react';
import abi from './abi.json';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  async componentDidMount() {
    const { default: Web3 } = await import('web3');
    const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/92fbee4173ae48d391596537cf308109'));
    const contract = new web3.eth.Contract(abi, '0x8f7a0ba4a56bd8cc1655ae99bb147e76d0eb3d35');
    contract.events.allEvents().on('data', event => this.setState(state => ({ events: [event, ...state.events] })));
  }

  render() {
    return (
      <div>
        <h3>Events</h3>
        <div>
          {this.state.events.map(event => (
            <pre style={{ border: 'solid 1px gray' }} key={event.transactionHash}>
              {JSON.stringify(event, null, 2)}
            </pre>
          ))}
        </div>
      </div>
    );
  }
}

export default Events;
