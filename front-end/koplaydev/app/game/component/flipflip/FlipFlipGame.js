"use client";

import { useSelector } from "react-redux";
import GameStartBtn from "../GameStartBtn";
import FlipFlipGameStart from "./FlipFlipGameStart";
import FlipFlipGameEnd from "./FlipFlipGameEnd";

export default function FlipFlipGame() {
  const loading = useSelector((state) => state.loading);
  if (loading === -1) {
    return <GameStartBtn />;
  } else if (loading === 0) {
    return <FlipFlipGameStart />;
  } else if (loading === 1) {
    return <FlipFlipGameEnd />;
  } else {
    return "뭔가 잘못됐습니다";
  }
}
