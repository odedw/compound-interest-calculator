import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";
import Calculator from "./calculator";
import Deposit from "./types/Deposit";
import data from "./data.json";
const calculator = new Calculator();

const Container = styled.div`
  background-color: #282c34;
  height: 100%;
  color: white;
`;

const CurrentBalanceContainer = styled.div``;
const InterestRate = styled.div``;
const DepositsContainer = styled.div``;
const DepositView = styled.div``;

function App() {
  const [currentDate, setCurrentDate] = useState(
    new Date(new Date().toDateString())
  );

  const [weeklyRate, setWeeklyRate] = useState(data.weeklyRate);
  const [deposits, setDeposits] = useState(
    data.deposits.map(d => new Deposit(d.date, d.amount))
  );
  const [balance, setBalance] = useState(
    calculator.calculateBalance(currentDate, deposits, weeklyRate)
  );

  return (
    <Container>
      <CurrentBalanceContainer>
        Current Balance: {balance}
      </CurrentBalanceContainer>
      <InterestRate>{`${weeklyRate}%`}</InterestRate>
      <DepositsContainer>
        {deposits.map((d, i) => (
          <DepositView key={i}>{`Amount: ${
            d.amount
          }, Date: ${d.date.toLocaleDateString("en-US")}`}</DepositView>
        ))}
      </DepositsContainer>
    </Container>
  );
}

export default App;
