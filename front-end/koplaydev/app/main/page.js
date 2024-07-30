import MainBg from "../component/background/MainBg";
import FameBtn from "./FameBtn";
import MainIcons from "./MainIcons";
import MainMenu from "./MainMenu";
import Profile from "./Profile";

export default function Test() {
  return (
    <>
      <FameBtn/>
      {/* <MainMenu/> */}
      <MainBg />
      <MainIcons/>
      <Profile/>
    </>
  );
}