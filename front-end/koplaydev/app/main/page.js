import MainBg from "../component/background/MainBg";
import FameBtn from "./component/FameBtn";
import MainIcons from "./component/MainIcons";
import MainMenu from "./component/MainMenu";
import MainModal from "./component/MainModal";
import Profile from "./component/Profile";

export default function Test() {
  return (
    <>
      <MainModal/>
      <FameBtn />
      <MainMenu/>
      <MainBg />
      <MainIcons />
      <Profile />
    </>
  );
}
