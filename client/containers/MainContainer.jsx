import React, { useState, useEffect, Component } from 'react';
import '../stylesheets/styles.css';
import Navigation from '../components/Navigation.jsx';
import MonthlyIncomeCard from '../components/MonthlyIncomeCard.jsx';
import MonthlyExpenseCard from '../components/MonthlyExpenseCard.jsx';
import CashFlowCard from '../components/CashFlowCard.jsx';
import ForecastCard from '../components/ForecastCard.jsx';
import AssetsCard from '../components/AssetsCard.jsx';
import BudgetCard from '../components/BudgetCard.jsx';
import BalanceCard from '../components/BalanceCard.jsx';
import TrendChartCard from '../components/TrendChartCard.jsx';
import TransactionsCard from '../components/TransactionsCard.jsx';

class MainContainer extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     transactions: [],
  //     balance: [],
  //   };
  // }

  // componentDidMount() {
  //   // make call to our endpoint and populate
  //   fetch('/api')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // spread out our state and update our transactions array
  //       this.setState({
  //         ...this.state,
  //         transactions: data.transactions,
  //         balance: data.balance,
  //       });
  //       //console.log('ALL TRANSACTIONS ', this.state.transactions);
  //       // console.log('ALL BALANCES ', this.state.balance);
  //     });
  // }
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      balance: [],
      sumArray: [],
      monthlyIncome: 5000,
    };
  }

  componentDidMount() {
    // make call to our endpoint and populate
    fetch('/api')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          ...this.state,
          transactions: data.transactions,
          balance: data.balance,
        });

        // spread out our state and update our transactions array
        const balancesArray = this.state.transactions.reduce(
          (acc, el) => {
            console.log('el:', el);
            if (el.account_id === 'bZPxWjNA5Wf4oJE95B1KTlajybobDVu3Gap6P') {
              acc[0] += Number(el.amount);
              return acc;
            }
            if (el.account_id === 'mv35n9oz4nuqLwonrkbRtGrA4ZlZ5ViA7xZQ8') {
              acc[1] += Number(el.amount);
              return acc;
            }
          },
          [0, 0]
        );

        console.log('balancesArray', balancesArray);
        this.setState({
          ...this.state,
          sumArray: balancesArray,
        });

        //console.log('ALL TRANSACTIONS ', this.state.transactions);
        // console.log('ALL BALANCES ', this.state.balance);
      });
  }

  render() {
    // console.log('CURRENT STATE OF MAIN CONTAINER ', this.state.balance);
    return (
      <>
        <div className='mainContainer'>
          <Navigation />
          <MonthlyIncomeCard monthlyIncome={this.state.monthlyIncome} />
          <MonthlyExpenseCard savings={this.state.sumArray} />
          <CashFlowCard
            savings={this.state.sumArray}
            monthlyIncome={this.state.monthlyIncome}
          />
          <ForecastCard />
          <AssetsCard />
          <BudgetCard />
          <BalanceCard balanceArray={this.state.balance} />
          <TrendChartCard />
          <TransactionsCard transactions={this.state.transactions} />
        </div>
      </>
    );
  }
}
export default MainContainer;
