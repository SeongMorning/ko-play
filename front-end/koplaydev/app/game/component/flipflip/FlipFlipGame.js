"use client";

import { useSelector } from "react-redux";
import GameStartBtn from "../GameStartBtn";
import FlipFlipGameStart from "./FlipFlipGameStart";
import FlipFlipGameEnd from "./FlipFlipGameEnd";

export default function FlipFlipGame() {
  // 선택한 레벨
  const chooseLevel = 1;
  // 현재 추천 레벨
  const recommendLevel = 1;

  const loading = useSelector((state) => state.loading);
  if (loading === -1) {
    return <GameStartBtn />;
  } else if (loading === 0) {
    return <FlipFlipGameStart Level={chooseLevel} Recommend={recommendLevel} />;
  } else if (loading === 1) {
    return <FlipFlipGameEnd />;
  } else {
    return "뭔가 잘못됐습니다";
  }
}
