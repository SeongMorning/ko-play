"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CorrectAnswerRate.module.scss";
import { Chart } from "chart.js/auto";
import LevelJellyBtn from "@/app/main/component/LevelJellyBtn";
import { useDispatch } from "react-redux";
import parentChildStatisticsAxios from "@/app/axios/parentChildStatisticsAxios";

// Action Types
const SET_GRAPH_LEVEL = "SET_GRAPH_LEVEL";

// Action Creators
const setGraphLevel = (level) => ({
  type: SET_GRAPH_LEVEL,
  payload: level,
});

export default function CorrectAnswerRate({ childId }) {
  const graphPersonal = useRef(null);
  const chartPersonalInstance = useRef(null); // 차트 인스턴스를 저장할 ref
  const dispatch = useDispatch();
  
  const [selectedLevel, setSelectedLevel] = useState(1); // 초기 선택 레벨
  const [chartDataPersonal, setChartDataPersonal] = useState({
    labels: [],
    datasets: [],
  });

  console.log(selectedLevel);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        console.log("Fetching statistics...");
        const response = await parentChildStatisticsAxios(childId, selectedLevel);
        console.log("API Response:", response);

        if (!Array.isArray(response) || response.length < 3) {
          throw new Error("Unexpected data structure from API. Expected an array with at least 3 elements.");
        }

        const personalData = response[0]; // 데이터 배열 선택
        console.log("Personal Data:", personalData);

        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        // '단어비', '플립플립', '스무고개'로 필터링
        const purposeMapping = {
          '말하기': '단어비',
          '읽기': '플립플립',
          '듣기': '스무고개'
        };

        const levelData = personalData.filter(item => item.level === selectedLevel);
        console.log("Filtered Level Data:", levelData);
  
        const weeklyDataPersonal = levelData.filter(item => new Date(item.date) >= oneWeekAgo);
        console.log("Weekly Data Personal:", weeklyDataPersonal);

        const gamePurposeAveragesPersonal = Object.keys(purposeMapping).map(purpose => {
          const mappedPurpose = purposeMapping[purpose];
          const purposeData = weeklyDataPersonal.filter(item => item.gamePurpose === purpose);
          console.log(`Purpose Data for ${purpose}:`, purposeData);

          const totalCorrect = purposeData.reduce((sum, item) => sum + item.correctAnswer, 0);
          const totalQuestions = purposeData.reduce((sum, item) => sum + item.totalQuestion, 0);
          console.log(`Total Correct for ${purpose}:`, totalCorrect);
          console.log(`Total Questions for ${purpose}:`, totalQuestions);

          return totalQuestions ? (totalCorrect / totalQuestions) * 100 : 0;
        });

        console.log("Game Purpose Averages Personal:", gamePurposeAveragesPersonal);

        setChartDataPersonal({
          labels: Object.values(purposeMapping),
          datasets: [
            {
              label: `정답률 (레벨 ${selectedLevel})`,
              data: gamePurposeAveragesPersonal,
              fill: false,
              borderColor: "#4CAF50",
              backgroundColor: "#4CAF50",
              tension: 0.1,
              hoverBorderWidth: 3,
            }
          ],
        });

      } catch (error) {
        console.error("Error fetching data:", error.message);
        console.error("Error details:", error);
      }
    };

    fetchStatistics();
  }, [selectedLevel, childId]);

  useEffect(() => {
    if (graphPersonal.current) {
      console.log("Updating chart...");
  
      if (chartPersonalInstance.current) {
        console.log("Destroying existing chart instance...");
        chartPersonalInstance.current.destroy();
      }
      
      const ctxPersonal = graphPersonal.current.getContext('2d');
      chartPersonalInstance.current = new Chart(ctxPersonal, {
        type: "line",
        data: chartDataPersonal,
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
              radius: 3,
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
  
      console.log("Chart instance created with data:", chartDataPersonal);
    }
  }, [chartDataPersonal]);
  

  const handleLevelClick = (level) => {
    console.log(`Level ${level} clicked`);
    setSelectedLevel(level);
    dispatch(setGraphLevel(level));
      console.log("selectedLevle", selectedLevel);
      console.log("setGraphLevel", setGraphLevel);

    };

  return (
    <div className={styles.Main}>
      <div className={styles.graphContainer}>
        <div className={styles.graphSection}>
          <canvas ref={graphPersonal} />
        </div>
      </div>
      <div className={styles.levelBtn}>
        {[1, 2, 3, 4, 5].map((data, index) => (
          <LevelJellyBtn
            key={index}
            level={data}
            bg={"#FFCC17"}
            shadow={"#C99D00"}
            color={"white"}
            width={"16"}
            height={"50"}
            onClick={() => handleLevelClick(data)}
          />
        ))}
      </div>
    </div>
  );
}
