import AlbumFameBg from "../component/background/AlbumFameBg";
import MainBg from "../component/background/MainBg";
import BackScoreBtn from "../component/buttons/BackScoreBtn";
import Podium from "./component/Podium";

export default function fame(props) {
  const exp = 100;
  const users = {
    user1: {
      name: "김싸피",
      image: "/korea-3.png",
      plays: 300,
    },
    user2: {
      name: "박싸피",
      image: "/vietnam-3.png",
      plays: 200,
    },
    user3: {
      name: "최싸피",
      image: "/china-3.png",
      plays: 100,
    },
  };
  return (
    <>
      <BackScoreBtn text="뒤로가기" left="1vw" top="1vh" />
      <Podium left="25vw" top="40vh" users={users} />
      {/* <Podium left="25vw" top="50vh" users={users} /> */}
      <AlbumFameBg />
      <MainBg />
    </>
  );
}
