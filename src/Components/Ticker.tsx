import React, { useEffect, useState } from "react";

export default function Ticker() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.
      setError(false);
      fetchData();
    }, 500);
    return () => clearInterval(intervalId); //This is important
  }, []);

  useEffect(() => {
    if (data !== null && data !== undefined) {
      setLoading(false);
    }
  }, [data]);

  function randomColor() {
    const m = Math.floor(Math.random() * 10);
    if (m > 5) {
      return "green";
    } else {
      return "red";
    }
  }

  async function fetchData() {
    try {
      const response = await fetch(
        "https://poloniex.com/public?command=returnTicker",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      const json = await response.json();
      setData(json);
      console.log("Updated");
    } catch (err) {
      console.log("Error@" + err);
      setError(true);
      setData(null);
    }
  }

  function roundto4(num: string): string {
    return parseFloat(num).toFixed(4);
  }

  return (
    <div className="card">
      <div className="cardContainer"></div>
      <div className="right">
        {loading ? (
          <h6>Fetching...</h6>
        ) : (
          <>
            <h6>High 24h</h6>
            <h2 className={randomColor()}>
              ${roundto4(data.USDT_ETH.high24hr)}
            </h2>
            <h6>Low 24h</h6>
            <h2 className={randomColor()}>
              ${roundto4(data.USDT_ETH.low24hr)}
            </h2>
          </>
        )}
      </div>
      <div className="left">
        <span className="title">
          {error ? "Something Went Wrong" : "Etheruem Live Stats"}
        </span>
        <p className={"live-icon " + (error ? "r" : "g")}></p>
        {loading ? (
          <h1>Fetching...</h1>
        ) : (
          <>
            <h1>${roundto4(data.USDT_ETH.last)}</h1>
            <h4 className={randomColor()}>
              {roundto4(data.USDT_ETH.percentChange)}%
            </h4>
          </>
        )}
      </div>
    </div>
  );
}
