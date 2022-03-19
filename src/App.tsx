import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";
import Calculator from "./calculator";
import Deposit from "./types/Deposit";
import data from "./data.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addImage from "./assets/add.png";
import deleteImage from "./assets/delete.png";

const calculator = new Calculator();

const Container = styled.div`
  background-color: #e6e6e6;
  height: 100%;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5em;
`;

const CurrentStatusContainer = styled.div`
  display: flex;
  font-size: 2em;
`;
const CurrentDate = styled.div``;
const CurrentDatePicker = styled(DatePicker)`
  font-size: 1em;
  width: 200px;
  text-align: center;
`;
const CurrentBalanceContainer = styled.div`
  margin-left: 1em;
`;
const InterestRate = styled.div`
  margin-top: 0.5em;
`;
const DepositsContainer = styled.div`
  margin-top: 2em;
  font-size: 1.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DepositHeader = styled.h4`
  margin-bottom: 0.5em;
`;
const DepositView = styled.div`
  display: flex;
  align-items: center;
`;
const Image = styled.img`
  width: 24px;
  height: 24px;
`;
const DeleteImage = styled(Image)`
  margin-left: 16px;
`;
const AddImage = styled(Image)`
  margin-top: 1em;
`;

const AddDepositsContainer = styled.div`
  margin-top: 1em;

  display: flex;
  align-items: center;
`;
const AddDepositDatePicker = styled(DatePicker)`
  font-size: 1em;
  width: 160px;
  text-align: center;
`;

const AddDepositInput = styled.input`
  font-size: 1em;
  width: 80px;
  text-align: center;
  margin-left: 1em;
`;

const AddDepositImage = styled(Image)`
  margin-left: 1em;
`;
let currentDatePicker: any, addDepositDatePicker: any;

function App() {
  const [currentDate, setCurrentDate] = useState(
    new Date(new Date().toDateString())
  );

  const [dailyRate] = useState(data.dailyRate);
  const [deposits, setDeposits] = useState(
    data.deposits.map((d: any) => new Deposit(d.date, d.amount))
  );
  const [currentDatePickerVisible, setCurrentDatePickerVisible] =
    useState(false);

  const [addDepositVisible, setAddDepositVisible] = useState(false);
  const [addDepositDate, setAddDepositDate] = useState(
    new Date(new Date().toDateString())
  );
  const [addDepositValue, setAddDepositValue] = useState(5);

  const balance = calculator
    .calculateBalance(currentDate, deposits, dailyRate)
    .toFixed(2);
  console.log(balance);
  return (
    <Container>
      <CurrentStatusContainer>
        {currentDatePickerVisible ? (
          <CurrentDatePicker
            selected={new Date()}
            onChange={(date: any) => {
              setCurrentDate(date);
              setCurrentDatePickerVisible(false);
            }}
            ref={(c) => {
              currentDatePicker = c;
            }}
          />
        ) : (
          <CurrentDate
            onClick={() => {
              setCurrentDatePickerVisible(true);
              setImmediate(() => {
                currentDatePicker.setOpen(true);
              });
            }}
          >
            {currentDate.toLocaleDateString("en-US")}
          </CurrentDate>
        )}
        <CurrentBalanceContainer>${balance}</CurrentBalanceContainer>
      </CurrentStatusContainer>
      <InterestRate>{`Weekly Interest Rate: ${dailyRate}%`}</InterestRate>
      <DepositsContainer>
        <DepositHeader>Deposits</DepositHeader>
        {deposits.map((d, i) => (
          <DepositView key={i}>
            <div>{`${d.date.toLocaleDateString("en-US")}: $${d.amount}`}</div>
            <DeleteImage
              src={deleteImage}
              onClick={() => {
                setDeposits(deposits.filter((_, j) => i !== j));
              }}
            ></DeleteImage>
          </DepositView>
        ))}
        {addDepositVisible && (
          <AddDepositsContainer>
            <AddDepositDatePicker
              onChange={(date: any) => {
                setAddDepositDate(date);
              }}
              selected={addDepositDate}
              ref={(c) => {
                addDepositDatePicker = c;
              }}
            />
            <AddDepositInput
              type="number"
              value={addDepositValue}
              onChange={(event) =>
                setAddDepositValue(parseInt(event.target.value))
              }
            ></AddDepositInput>
            <AddDepositImage
              src={addImage}
              onClick={() => {
                setDeposits([
                  ...deposits,
                  new Deposit(addDepositDate.toISOString(), addDepositValue),
                ]);
                setAddDepositValue(5);
                setAddDepositVisible(false);
              }}
            ></AddDepositImage>
          </AddDepositsContainer>
        )}
        {!addDepositVisible && (
          <AddImage
            src={addImage}
            onClick={() => {
              setAddDepositVisible(true);
              setImmediate(() => addDepositDatePicker.setOpen(true));
            }}
          ></AddImage>
        )}
      </DepositsContainer>
    </Container>
  );
}

export default App;
