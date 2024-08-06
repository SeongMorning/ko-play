"use client";

import { useSelector } from "react-redux";
import SmuGameStartBtn from "./SmuGameStartBtn";
import SmuGameStart from "./SmuGameStart";
import SmuGameEnd from "./SmuGameEnd";

export default function WordRainGame() {
  const loading = useSelector((state) => state.loading);
  if (loading === -1) {
    return <SmuGameStartBtn />;
  } else if (loading === 0) {
    return <SmuGameStart />;
  } else if (loading === 1) {
    return <SmuGameEnd />;
  } else {
    return "뭔가 잘못됐습니다";
  }
}
