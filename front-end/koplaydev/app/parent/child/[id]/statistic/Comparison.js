"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Comparison.module.scss";
import { Chart } from "chart.js/auto";
import LevelJellyBtn from "./LevelJellyBtn";
import { useSelector, useDispatch } from "react-redux";
import parentChildStatisticsAxios from "@/app/axios/parentChildStatisticsAxios";

// Action Types
const SET_GRAPH_LEVEL = "SET_GRAPH_LEVEL";

// Action Creators
const setGraphLevel = (level) => ({
  type: SET_GRAPH_LEVEL,
  payload: level,
});

export default function Comparison({ childId }) {
  const graphPersonal = useRef(null);
  const graphOverall = useRef(null);
  const chartPersonalInstance = useRef(null); // 차트 인스턴스를 저장할 ref
  const chartOverallInstance = useRef(null);  // 차트 인스턴스를 저장할 ref
  const dispatch = useDispatch();
  const graphLevel = useSelector((state) => state.graphLevel);

  const [selectedLevel, setSelectedLevel] = useState(1); // 초기 선택 레벨
  const [chartDataPersonal, setChartDataPersonal] = useState({
    labels: [],
    datasets: [],
  });

  const [chartDataOverall, setChartDataOverall] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        // API 호출 및 반환된 데이터 로그 출력
        const response = await parentChildStatisticsAxios(childId, selectedLevel);
        console.log("API Response:", response);

        // 데이터 구조 확인
        if (!Array.isArray(response) || response.length < 3) {
          throw new Error("Unexpected data structure from API. Expected an array with at least 3 elements.");
        }
    
        const [personalData, _, overallData] = response;
    
        console.log("Personal Data:", personalData);
        console.log("Overall Data:", overallData);

        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        // '단어비', '플립플립', '스무고개'로 필터링
        const purposeMapping = {
          '말하기': '단어비',
          '읽기': '플립플립',
          '듣기': '스무고개'
        };

        const weeklyDataPersonal = personalData.filter(item => new Date(item.date) >= oneWeekAgo);
        const gamePurposeAveragesPersonal = Object.keys(purposeMapping).map(purpose => {
          const mappedPurpose = purposeMapping[purpose];
          const purposeData = weeklyDataPersonal.filter(item => item.gamePurpose === purpose);
          const totalCorrect = purposeData.reduce((sum, item) => sum + item.correctAnswer, 0);
          const totalQuestions = purposeData.reduce((sum, item) => sum + item.totalQuestion, 0);
          return totalQuestions ? (totalCorrect / totalQuestions) * 100 : 0;
        });

        setChartDataPersonal({
          labels: Object.values(purposeMapping),
          datasets: [
            {
              label: "개인 정답률",
              data: gamePurposeAveragesPersonal,
              fill: false,
              borderColor: "#4CAF50",
              backgroundColor: "#4CAF50",
              tension: 0.1,
              hoverBorderWidth: 3,
            },
          ],
        });

        const gamePurposeAveragesOverall = Object.keys(purposeMapping).map(purpose => {
          const mappedPurpose = purposeMapping[purpose];
          const purposeData = overallData.filter(item => item.gamePurpose === purpose);
          const totalCorrect = purposeData.reduce((sum, item) => sum + item.correct, 0);
          const totalQuestions = purposeData.reduce((sum, item) => sum + item.total, 0);
          return totalQuestions ? (totalCorrect / totalQuestions) * 100 : 0;
        });

        setChartDataOverall({
          labels: Object.values(purposeMapping),
          datasets: [
            {
              label: "전체 정답률",
              data: gamePurposeAveragesOverall,
              fill: false,
              borderColor: "#FF5733",
              backgroundColor: "#FF5733",
              tension: 0.1,
              hoverBorderWidth: 3,
            },
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
      // 기존 차트 인스턴스가 있으면 파괴
      if (chartPersonalInstance.current) {
        chartPersonalInstance.current.destroy();
      }
      
      const ctxPersonal = graphPersonal.current.getContext('2d');
      chartPersonalInstance.current = new Chart(ctxPersonal, {
        type: "bar",
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
            point: {},
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
    }

    if (graphOverall.current) {
      // 기존 차트 인스턴스가 있으면 파괴
      if (chartOverallInstance.current) {
        chartOverallInstance.current.destroy();
      }
      
      const ctxOverall = graphOverall.current.getContext('2d');
      chartOverallInstance.current = new Chart(ctxOverall, {
        type: "bar",
        data: chartDataOverall,
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
            point: {},
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
    }
  }, [chartDataPersonal, chartDataOverall]);

  const handleLevelClick = (level) => {
    setSelectedLevel(level);
    dispatch(setGraphLevel(level));
  };

  return (
    <div className={styles.Main}>
      <div className={styles.graphContainer}>
        <div className={styles.graphSection}>
          <h2>개인 정답률</h2>
          <canvas ref={graphPersonal} />
        </div>
        <div className={styles.graphSection}>
          <h2>전체 정답률</h2>
          <canvas ref={graphOverall} />
        </div>
      </div>
      {/* <div className={styles.levelBtn}>
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
      </div> */}
    </div>
  );
}
