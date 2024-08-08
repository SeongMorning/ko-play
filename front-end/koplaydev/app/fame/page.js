"use client"
import AlbumFameBg from "../component/background/AlbumFameBg";
import MainBg from "../component/background/MainBg";
import BackScoreBtn from "../component/buttons/BackScoreBtn";
import Podium from "./component/Podium";
import fameAxios from "../axios/fameAxios";
import { useEffect } from "react";
import student from "../axios/studentInfo";


export default async function fame(props) {
  useEffect(() => {
    const fetchUserList = async () => {
      const data = await fameAxios();
      if (data) {
        console.log(data);
        // let speechGame = data.filter((value) => value.gamePurposeIdx === 1);
        // let readGame = data.filter((value) => value.gamePurposeIdx === 2);
        // let listenGame = data.filter((value) => value.gamePurposeIdx === 3);
        // let testGame = data.filter((value) => value.gamePurposeIdx === 4);

        // gameList = [[...speechGame, ...testGame], [...readGame], [...listenGame]];
      }
    };
    fetchUserList();
    const fetchStudentInfo = async () => {
      const data = await student();
      if(data){
        console.log(data);
      }
    }
    fetchStudentInfo();
  }, []);

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
