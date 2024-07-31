import MainMenuBtn from "./MainMenuBtn";

export default function MainMenu() {
  return (
    <>
      {/* 사진첩 */}
      <MainMenuBtn left ={"5%"} top ={"80%"} idx={1001}/>
      {/* 마이페이지 */}
      <MainMenuBtn left ={"20%"} top ={"83%"} idx={1002}/>
      {/* 코스튬 */}
      <MainMenuBtn left ={"13%"} top ={"66%"} idx={1003}/>
      {/* 로그아웃 */}
      <MainMenuBtn left ={"87%"} top ={"80%"} idx={-1}/>
      {/* 테스트 */}
      <MainMenuBtn left ={"72%"} top ={"83%"} idx={3}/>
      {/* 튜토리얼 */}
      <MainMenuBtn left ={"79%"} top ={"66%"} idx={10000}/>
    </>
  );
}
