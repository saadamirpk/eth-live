import { ApexOptions } from "apexcharts";
import React, { Component, useEffect, useState } from "react";
import Chart from "react-apexcharts";

function CandleStickChart(props: any) {
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      type: "candlestick",
    },
    title: {
      text: "USDT - ETH CandleStick Chart",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        formatter: function (value) {
          return "$" + value;
        },
      },
    },
  });

  const [series, setSeries] = useState<ApexAxisChartSeries>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await fetch(
      "https://poloniex.com/public?command=returnChartData&currencyPair=USDT_ETH&start=1608336000&end=9999999999&period=86400"
    );
    const dataPoints = await response.json();

    const fulldataArr = dataPoints.map((point: any) => {
      const dateMsStr = point.date.toString() + "000";
      return {
        x: new Date(Number.parseInt(dateMsStr)),
        y: [point.open, point.high, point.low, point.close],
      };
    });

    //const quarterDataArr = extractData(dataPoints);

    setSeries([
      {
        data: [...fulldataArr],
      },
    ]);
  };

  function extractData(dataPoints: any[]) {
    let arr: any[] = [];
    const totalData = dataPoints.length;
    const startPoint = Math.round((totalData / 4) * 3);
    for (let i = startPoint; i < totalData; i++) {
      arr.push({
        x: new Date(dataPoints[i].date),
        y: [
          dataPoints[i].open,
          dataPoints[i].high,
          dataPoints[i].low,
          dataPoints[i].close,
        ],
      });
    }
    return arr;
  }

  return (
    <div className="row">
      <div className="mixed-chart">
        <Chart options={options} series={series} type="candlestick" />
      </div>
    </div>
  );
}

export default CandleStickChart;
