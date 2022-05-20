import React from "react";
import logo from "./logo.svg";
import "./App.css";
import CandleStickChart from "./Components/CandleStickChart";
import Ticker from "./Components/Ticker";

function App() {
  return (
    <div>
      <Ticker />
      <div id="chart">
        <CandleStickChart />
      </div>
    </div>
  );
}

export default App;
