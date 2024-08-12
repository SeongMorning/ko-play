"use client";

import { useSelector } from "react-redux";
import MainMenuBtn from "./MainMenuBtn";

export default function MainMenu() {
  const translationWords = useSelector((state) => state.translationWords);

  return (
    <>
      {/* 사진첩 */}
      <MainMenuBtn
        left={"5%"}
        top={"80%"}
        idx={1001}
        imgSrc={"/album2.png"}
        tooltip={translationWords.album}
      />
      {/* 마이페이지 */}
      <MainMenuBtn
        left={"20%"}
        top={"83%"}
        idx={1002}
        imgSrc={"/Mypage2.png"}
        tooltip={translationWords.myPage}
      />
      {/* 코스튬 */}
      <MainMenuBtn
        left={"13%"}
        top={"66%"}
        idx={1003}
        imgSrc={"/avatar2.png"}
        tooltip={translationWords.avatar}
      />
      {/* 로그아웃 */}
      <MainMenuBtn
        left={"87%"}
        top={"80%"}
        idx={-1}  
        imgSrc={"/logout2.png"}
        tooltip={translationWords.logout}
      />
      {/* 테스트 */}
      <MainMenuBtn
        left={"72%"}
        top={"83%"}
        idx={3}
        imgSrc={"settings.png"}
        tooltip={translationWords.avatarTest}
      />
      {/* 튜토리얼 */}
      <MainMenuBtn
        left={"79%"}
        top={"66%"}
        idx={1004}
        imgSrc={"/tutorial2.png"}
        tooltip={translationWords.tutorial}
      />
    </>
  );
}
