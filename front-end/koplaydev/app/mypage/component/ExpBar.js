"use client";

import { useEffect, useRef } from "react";
import styles from "./ExpBar.module.scss";
import { Chart } from "chart.js/auto";
import { useSelector } from "react-redux";

export default function ExpBar(props) {
  const graph = useRef(null);
  // 단계별 분야별 정답률 다 받아야되네요 한번에
  console.log(props.expDB)
  const calcDate = (beforeDay)=>{
    const today = new Date();
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - beforeDay);
    const month = pastDate.getMonth()+1;
    const day = pastDate.getDate();

    return `${month}/${day}`;
  }

  useEffect(() => {
    if (graph.current !== null) {
      const exp = props.expDB.map((data)=> data.accumExp)
      console.log(exp)
      const ctx = graph.current;
      const labels = [...exp].map((data)=> Math.trunc(data / 100) + 1);
      const data = {
        labels: labels,
        datasets: [
          {
            label: "경험치",
            data: [...exp].map((data)=> data % 100),
            fill: false,
            borderColor: "black",
            tension: 0.1,
            hoverBorderWidth: 3,
          },
        ],
      };
      const myLineChart = new Chart(ctx, {
        type: "bar",
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              grid: {},
              ticks: {
                font: {
                  size: 10,
                },
                color: "black",
              },
            },
            x: {
              ticks: {
                font: {
                  size: 20,
                },
                color: "black",
              },
            },
          },
          elements: {
            bar: {
              backgroundColor : "#c8b6ff"
            },
          },
          plugins: {
            legend: {
              position : "bottom",

              labels: {
                boxWidth : 10,
                boxHeight : 10,
                font: {
                  size: 20,
                },
              },
            },
          },
          layout : {
            autoPadding : false,
          }
        },
      });

      return function cleanup() {
        myLineChart.destroy();
      };
    }
  },[]);

  return (
    <div className={styles.CorrectMain}>
      <div className={styles.graph}>
        <canvas ref={graph} />
      </div>
    </div>
  );
}
