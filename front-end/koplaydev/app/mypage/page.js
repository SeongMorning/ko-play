import MainBg from "../component/background/MainBg";
import BackScoreBtn from "../component/buttons/BackScoreBtn";
import MyPageInfo from "./component/MyPageInfo";

export default function mypage() {
  return (
    <>
      <BackScoreBtn text="뒤로가기" top="2vh"left="2vw"/>
      <MainBg/>
      <MyPageInfo />
    </>
  );
}
