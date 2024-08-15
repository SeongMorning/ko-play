"use client";

import styles from "./BtnContainer.module.scss";
import BlueBtn from "./BlueBtn";
import { useSelector } from "react-redux";
export default function BtnContainer(props) {
  const translationWords = useSelector((state) => state.translationWords);

  return (
    <>
      <BlueBtn
        isAvatar={props.isAvatar}
        setIsAvatar={props.setIsAvatar}
        width="20vw"
        height="13vh"
        top="70vh"
        left="55vw"
        radius="2vw"
        text={translationWords.nude}
      />
      {/* <BlueBtn
        isAvatar={props.isAvatar}
        setIsAvatar={props.setIsAvatar}
        width="10vw"
        height="17vh"
        top="70vh"
        left="66vw"
        radius="2vw"
        text={translationWords.apply}
      /> */}
    </>
  );
}
