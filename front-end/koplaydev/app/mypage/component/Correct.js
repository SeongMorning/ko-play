"use client";

import { useEffect, useRef } from "react";
import styles from "./Correct.module.scss";
import { Chart } from "chart.js/auto";
import LevelJellyBtn from "@/app/main/component/LevelJellyBtn";
import { useSelector } from "react-redux";

export default function Correct(props) {
  const graph = useRef(null);
  const levelList = useSelector((state) => state.level)
  const graphLevel = useSelector((state) => state.graphLevel)
  // 단계별 분야별 정답률 다 받아야되네요 한번에
  const userInfo = useSelector((state) => state.studentInfo);
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
      const ctx = graph.current;
      const labels = [calcDate(6), calcDate(5), calcDate(4), calcDate(3), calcDate(2), calcDate(1), calcDate(0)];
      const data = {
        labels: labels,
        datasets: [
          {
            label: "말하기",
            data: props.statistic[0][graphLevel-1],
            fill: false,
            borderColor: "#bde0fe",
            tension: 0.1,
            hoverBorderWidth: 3,
          },
          {
            label: "읽기",
            data: props.statistic[1][graphLevel-1],
            fill: false,
            borderColor: "#ffc8dd",
            tension: 0.1,
            hoverBorderWidth: 3,
          },
          {
            label: "듣기",
            data: props.statistic[2][graphLevel-1],
            fill: false,
            borderColor: "#cdb4db",
            tension: 0.1,
            hoverBorderWidth: 3,
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
            point: {
              backgroundColor: "white",
            },
            line: {
              borderWidth: 10,
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
  },[graphLevel]);

  return (
    <div className={styles.CorrectMain}>
      <div className={styles.levelBtn}>
        {[1,2,3,4,5].map((data, index)=>
          <LevelJellyBtn
            key={index}
            level={data}
            bg={"#FFCC17"}
            shadow={"#C99D00"}
            color={"white"}
            width={"15"}
            height={"60"}
          />
        )}
      </div>
      <div className={styles.graph}>
        <canvas ref={graph} />
      </div>
    </div>
  );
}
