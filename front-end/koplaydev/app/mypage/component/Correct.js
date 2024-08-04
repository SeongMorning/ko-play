"use client";

import { useEffect, useRef } from "react";
import styles from "./Correct.module.scss";
import { Chart } from "chart.js/auto";
import LevelJellyBtn from "@/app/main/component/LevelJellyBtn";
import { useSelector } from "react-redux";

export default function Correct() {
  const graph = useRef(null);
  const levelList = useSelector((state) => state.level)
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
            borderColor: "#bde0fe",
            tension: 0.1,
            hoverBorderWidth: 5,
          },
          {
            label: "듣기",
            data: [50, 20, 70, 10, 90, 50, 30],
            fill: false,
            borderColor: "#ffc8dd",
            tension: 0.1,
            hoverBorderWidth: 5,
          },
          {
            label: "읽기",
            data: [50, 60, 50, 67, 35, 68, 99],
            fill: false,
            borderColor: "#cdb4db",
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
              // backgroundColor: "white",
            },
            line: {
              borderWidth: 15,
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
      <div className={styles.levelBtn}>
        {[1,2,3,4,5].map((data, index)=>
          <LevelJellyBtn
            level={data}
            bg={"#FFCC17"}
            shadow={"#C99D00"}
            color={"white"}
            width={"15"}
            height={"60"}
          />
        )}
      </div>
    </div>
  );
}
