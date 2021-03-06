import React, { Component } from 'react';
import './App.css';
import Navbar from './shared/Navbar';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './components/Home.js';

/**
 * Imports for freedom-for-data
 */
import Freedom from 'freedom-for-data';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      freedom: ''
    }
  }

  async componentDidMount() {
    if (window.ethereum) {

      try {
        // Request account access
        await window.ethereum.enable();
        console.log("Account access enabled");

        //Set provider 
        window.web3Provider = window.ethereum;
        window.web3.setProvider(window.web3Provider);
        console.log("Provider set to ethereum");

        /**
         * Load first account. Now we can initialize all our stuff.
         */
        const fakeFreedom = [
            {
              firstname: "feng",
              lastname: "chen"
            },
            {
              firstname: "pat",
              lastname: "toner"
            }
          ]

        this.setState({
          freedom: fakeFreedom
        })

        await window.web3.eth.getAccounts(async function (error, accounts) {

          if (error) {
            console.log(error);
          }

          var account = accounts[0];

          /** 
           * Get record contract service
           */
          var freedom = await Freedom(
            account,
            window.web3Provider,
            { host: 'localhost', port: '5001' }
          );
          window.freedom = freedom;
          console.log('freedom-for-data-configured');

        });


      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }

    }


  }

  render() {
    return (
      <Router>
        <div>
          <Navbar></Navbar>
          <Route path="/" exact component={() => <Home freedom={this.state.freedom} />} />
        </div>
      </Router>
    );
  }
}

export default App;
