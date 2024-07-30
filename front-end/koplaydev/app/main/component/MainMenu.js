import { useDispatch } from "react-redux";
import MainMenuBtn from "./MainMenuBtn";

export default function MainMenu() {
  return (
    <>
      <MainMenuBtn left ={"5%"} top ={"80%"} imgSrc={"/back.png"} idx={1000}/>
      <MainMenuBtn left ={"20%"} top ={"83%"} idx={100}/>
      <MainMenuBtn left ={"13%"} top ={"66%"}/>
      <MainMenuBtn left ={"87%"} top ={"80%"} imgSrc={"/back.png"}/>
      <MainMenuBtn left ={"72%"} top ={"83%"}/>
      <MainMenuBtn left ={"79%"} top ={"66%"}/>
    </>
  );
}
