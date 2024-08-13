"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CorrectAnswerRate.module.scss";
import { Chart } from "chart.js/auto";
import LevelJellyBtn from "@/app/main/component/LevelJellyBtn";
import { useSelector } from "react-redux";

export default function CorrectAnswerRate({ childId }) {
  const statisticData = useSelector((state) => state.parentChaildStatistic);
  const graphLevel = useSelector((state) => state.graphLevel);

  const graphPersonal = useRef(null);
  const chartPersonalInstance = useRef(null); // 차트 인스턴스를 저장할 ref

  const [selectedLevel, setSelectedLevel] = useState(1); // 초기 선택 레벨
  const [chartDataPersonal, setChartDataPersonal] = useState({
    labels: [],
    datasets: [],
  });

  const [chartDataOther, setChartDataOther] = useState({
    labels: [],
    datasets: [],
  });

  // 레벨별 통계 데이터를 가져와 차트 업데이트
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        // API에서 가져온 데이터 로그
        // console.log("API Response:", statisticData);
        if (!Array.isArray(statisticData) || statisticData.length < 3) {
          throw new Error(
            "Unexpected data structure from API. Expected an array with at least 3 elements."
          );
        }
        const personalData = statisticData[0]; // 데이터 배열 선택
        const otherData = statisticData[2]; // 타인 배열 선택
        // console.log("Personal Data:", personalData);

        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        // '단어비', '플립플립', '스무고개'로 필터링
        const purposeMapping = {
          말하기: "말하기",
          읽기: "읽기",
          듣기: "듣기",
        };

        // console.log("Filtered Level Data:", levelData);

        // 최근 일주일 간의 데이터 필터링
        const weeklyDataPersonal = personalData.filter(
          (item) => new Date(item.date) >= oneWeekAgo
        );
        const weeklyDataOther = otherData.filter(
          (item) => new Date(item.date) >= oneWeekAgo
        );
        // console.log("Weekly Data Personal:", weeklyDataPersonal);

        // 각 게임별 정답률 계산
        const gamePurposeAveragesPersonal = Object.keys(purposeMapping).map(
          (purpose) => {
            const purposeData = weeklyDataPersonal.filter(
              (item) => item.gamePurpose === purpose
            );
            // console.log(`Purpose Data for ${purpose}:`, purposeData);

            const totalCorrect = purposeData.reduce(
              (sum, item) => sum + item.correctAnswer,
              0
            );
            const totalQuestions = purposeData.reduce(
              (sum, item) => sum + item.totalQuestion,
              0
            );
            // console.log(`Total Correct for ${purpose}:`, totalCorrect);
            // console.log(`Total Questions for ${purpose}:`, totalQuestions);

            return totalQuestions ? (totalCorrect / totalQuestions) * 100 : 0;
          }
        );

        const gamePurposeAveragesOther = Object.keys(purposeMapping).map(
          (purpose) => {
            const purposeData = weeklyDataOther.filter(
              (item) => item.gamePurpose === purpose
            );
            // console.log(`Purpose Data for ${purpose}:`, purposeData);

            const totalCorrect = purposeData.reduce(
              (sum, item) => sum + item.correct,
              0
            );
            const totalQuestions = purposeData.reduce(
              (sum, item) => sum + item.total,
              0
            );
            // console.log(`Total Correct for ${purpose}:`, totalCorrect);
            // console.log(`Total Questions for ${purpose}:`, totalQuestions);

            return totalQuestions ? (totalCorrect / totalQuestions) * 100 : 0;
          }
        );

        // console.log("Game Purpose Averages Personal:", gamePurposeAveragesPersonal);

        // 차트 데이터 설정
        setChartDataPersonal({
          labels: Object.values(purposeMapping),
          datasets: [
            {
              label: `우리 아이`,
              data: gamePurposeAveragesPersonal,
              fill: false,
              borderColor: "#4CAF50",
              backgroundColor: "#4CAF50",
              tension: 0.1,
              hoverBorderWidth: 3,
            },
            {
              label: `다른 아이들`,
              data: gamePurposeAveragesOther,
              fill: false,
              borderColor: "red",
              borderDash: [5, 5],
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

  // 차트 렌더링
  useEffect(() => {
    if (graphPersonal.current) {
      // console.log("Updating chart...");

      if (chartPersonalInstance.current) {
        // console.log("Destroying existing chart instance...");
        chartPersonalInstance.current.destroy();
      }

      const ctxPersonal = graphPersonal.current.getContext("2d");
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
      // console.log("Chart instance created with data:", chartDataPersonal);
    }
  }, [chartDataPersonal, chartDataOther]);

  useEffect(() => {
    // console.log(graphLevel)
    setSelectedLevel(graphLevel);
  }, [graphLevel]);

  return (
    <div className={styles.Main}>
      <div className={styles.graphContainer}>
        <canvas ref={graphPersonal} />
      </div>
    </div>
  );
}
