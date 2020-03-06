import React from "react";
import "./App.css";
import styled from "styled-components";
import calculator from "./calculator";

const Container = styled.div`
  background-color: #282c34;
  height: 100%;
  color: white;
`;

const CurrentBalanceContainer = styled.div``;
const InterestRate = styled.div``;
const DepositsContainer = styled.div``;
const Deposit = styled.div``;

function App() {
  const [balance, setBalance] = React.useState(calculator.balance);
  return (
    <Container>
      <CurrentBalanceContainer>
        Current Balance: {balance}
      </CurrentBalanceContainer>
      <InterestRate>{`${calculator.weeklyRate}%`}</InterestRate>
      <DepositsContainer>
        {calculator.deposits.map((d, i) => (
          <Deposit key={i}>{`Amount: ${
            d.amount
          }, Date: ${d.date.toLocaleDateString("en-US")}`}</Deposit>
        ))}
      </DepositsContainer>
    </Container>
  );
}

export default App;
