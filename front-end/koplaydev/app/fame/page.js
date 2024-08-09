import AlbumFameBg from "../component/background/AlbumFameBg";
import MainBg from "../component/background/MainBg";
import BackScoreBtn from "../component/buttons/BackScoreBtn";
import Podium from "./component/Podium";


export default async function fame() {

  return (
    <>
      <BackScoreBtn text="뒤로가기" left="1vw" top="1vh" />
      <Podium left="25vw" top="40vh" />
      {/* <Podium left="25vw" top="50vh" users={users} /> */}
      <AlbumFameBg />
      <MainBg />
    </>
  );
}
