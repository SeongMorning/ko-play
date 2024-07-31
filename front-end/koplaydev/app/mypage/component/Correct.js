"use client";

import { useEffect, useRef } from "react";
import styles from "./Correct.module.scss";
import { Chart } from "chart.js/auto";

export default function Correct() {
  const graph = useRef(null);
  // 단계별 분야별 정답률 다 받아야되네요 한번에

  useEffect(() => {
    if (graph.current !== null) {
      const ctx = graph.current;

      const labels = ["7/24", "7/25", "7/26", "7/27", "7/28", "7/29", "7/30"];

      const data = {
        labels: labels,
        datasets: [
          {
            label: "말하기",
            data: [80, 40, 30, 50, 60, 20, 50],
            fill: false,
            borderColor: "#F3ADCA",
            tension: 0.1,
            hoverBorderWidth: 5,
          },
          {
            label: "듣기",
            data: [50, 20, 70, 10, 90, 50, 30],
            fill: false,
            borderColor: "#FF4800",
            tension: 0.1,
            hoverBorderWidth: 5,
          },
          {
            label: "읽기",
            data: [50, 60, 50, 67, 35, 68, 99],
            fill: false,
            borderColor: "#0068FF",
            tension: 0.1,
            hoverBorderWidth: 5,
          },
        ],
      };
      const myLineChart = new Chart(ctx, {
        type: "line",
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              grid: {},
              ticks: {
                font: {
                  size: 30,
                },
                color: "black",
              },
            },
            x: {
              ticks: {
                font: {
                  size: 30,
                },
                color: "black",
              },
            },
          },
          elements: {
            point: {
              backgroundColor: "white",
            },
            line: {
              borderWidth: 5,
            },
          },
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 20,
                },
              },
            },
          },
        },
      });

      return function cleanup() {
        myLineChart.destroy();
      };
    }
  });

  return (
    <div className={styles.CorrectMain}>
      <div className={styles.graph}>
        <canvas ref={graph} />
      </div>
    </div>
  );
}
