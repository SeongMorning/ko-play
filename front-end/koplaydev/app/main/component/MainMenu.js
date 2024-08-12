import MainMenuBtn from "./MainMenuBtn";

export default function MainMenu() {
  return (
    <>
      {/* 사진첩 */}
      <MainMenuBtn
        left={"5%"}
        top={"80%"}
        idx={1001}
        imgSrc={"/album2.png"}
        tooltip={"사진첩"}
      />
      {/* 마이페이지 */}
      <MainMenuBtn
        left={"20%"}
        top={"83%"}
        idx={1002}
        imgSrc={"/Mypage2.png"}
        tooltip={"마이페이지"}
      />
      {/* 코스튬 */}
      <MainMenuBtn
        left={"13%"}
        top={"66%"}
        idx={1003}
        imgSrc={"/avatar2.png"}
        tooltip={"코스튬"}
      />
      {/* 로그아웃 */}
      <MainMenuBtn
        left={"87%"}
        top={"80%"}
        idx={-1}
        imgSrc={"/logout2.png"}
        tooltip={"로그아웃"}
      />
      {/* 테스트 */}
      <MainMenuBtn
        left={"72%"}
        top={"83%"}
        idx={3}
        imgSrc={"settings.png"}
        tooltip={"테스트"}
      />
      {/* 튜토리얼 */}
      <MainMenuBtn
        left={"79%"}
        top={"66%"}
        idx={1004}
        imgSrc={"/tutorial2.png"}
        tooltip={"튜토리얼"}
      />
    </>
  );
}
