import "./App.css";
import React from "react";
import web3 from "./web3";
import lottery from './lottery';

class App extends React.Component {
  state = {
    manager: '',
    players: [],
    balance: ''
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }
  render() {
    return (
     <div>
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {this.state.manager}.
          There are currently {this.state.players.length} people enter competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!   
       </p>
      <hr />

      <form>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input 
            onChange={event => this.state}
          />
        </div>
      </form>
     </div>
    );
  }
}
export default App;
