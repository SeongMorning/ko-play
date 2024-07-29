// 단어비 게임 페이지.
import GameIcons from "../GameIcons";
import YellowRoundBtn from "@/app/component/buttons/YellowRoundBtn";

export default function Game1() {
  return (
    <>
      <YellowRoundBtn text="뒤로가기" />
      <GameIcons />
      {/* <YellowRoundBtn
        score="10"
        question="10"
        style={{ right: "1vw" }}
      /> */}
    </>
  );
}
