import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "./Correct.module.scss";
import LevelJellyBtn from "@/app/main/component/LevelJellyBtn";
import { useState } from "react";
import { Chart } from "chart.js/auto";

export default function Progress(props) {
  const statisticData = useSelector((state) => state.parentChaildStatistic);
  const graph = useRef(null);
  const graphLevel = useSelector((state) => state.graphLevel);
  const levelList = useSelector((state) => state.level);
  const [statistic, setStatistic] = useState([
    [[], [], [], [], []],
    [[], [], [], [], []],
    [[], [], [], [], []],
  ]);

  const calcDate = (beforeDay) => {
    const today = new Date();
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - beforeDay);
    const month = pastDate.getMonth() + 1;
    const day = pastDate.getDate();

    return `${month}/${day}`;
  };

  useEffect(() => {
    const fetchstudentStatistics = async () => {
      function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      }

      const getPastDate = (daysAgo) => {
        const today = new Date();
        const pastDate = new Date(today);
        pastDate.setDate(today.getDate() - daysAgo);
        return formatDate(pastDate);
      };

      for (let k = 0; k < 3; k++) {
        for (let i = 0; i < 5; i++) {
          for (let j = 0; j < 7; j++) {
            let list = statisticData[0].filter(
              (data) => data.date === getPastDate(j) && data.level === i + 1
            );
            if (k === 0) {
              list = list.filter((data) => data.gamePurpose === "말하기");
            } else if (k === 1) {
              list = list.filter((data) => data.gamePurpose === "읽기");
            } else {
              list = list.filter((data) => data.gamePurpose === "듣기");
            }
            if (list.length > 0) {
              statistic[k][i][j] = Math.floor(
                (list[0].correctAnswer / list[0].totalQuestion) * 100
              );
            } else {
              statistic[k][i][j] = 0;
            }
          }
        }
      }
    };
    fetchstudentStatistics();
  }, []);

  useEffect(() => {
    if (graph.current !== null) {
      const ctx = graph.current;
      const labels = [
        calcDate(6),
        calcDate(5),
        calcDate(4),
        calcDate(3),
        calcDate(2),
        calcDate(1),
        calcDate(0),
      ];
      const data = {
        labels: labels,
        datasets: [
          {
            label: "말하기",
            data: statistic[0][graphLevel - 1],
            fill: false,
            borderColor: "#bde0fe",
            tension: 0.1,
            hoverBorderWidth: 3,
          },
          {
            label: "읽기",
            data: statistic[1][graphLevel - 1],
            fill: false,
            borderColor: "#ffc8dd",
            tension: 0.1,
            hoverBorderWidth: 3,
          },
          {
            label: "듣기",
            data: statistic[2][graphLevel - 1],
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
  }, [graphLevel, statistic]);

  return (
    <div className={styles.CorrectMain}>
      <div className={styles.levelBtn}>
        {[1, 2, 3, 4, 5].map((data, index) => (
          <LevelJellyBtn
            key={index}
            level={data}
            bg={"#FFCC17"}
            shadow={"#C99D00"}
            color={"white"}
            width={"15"}
            height={"60"}
          />
        ))}
      </div>
      <div className={styles.graph}>
        <canvas ref={graph} />
      </div>
    </div>
  );
}
