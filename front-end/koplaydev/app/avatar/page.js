import AlbumFameBg from "../component/background/AlbumFameBg";
import BackScoreBtn from "../component/buttons/BackScoreBtn";
import Cabinet from "./component/Cabinet";

export default function Avatar() {
  return (
    <>
      <BackScoreBtn text="뒤로가기" left="1vw" top="2vh" />
      <Cabinet />
      <AlbumFameBg />
    </>
  );
}
