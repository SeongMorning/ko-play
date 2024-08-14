"use client"

import styles from "./BtnContainer.module.scss";
import BlueBtn from "./BlueBtn";
import { useSelector } from "react-redux";
export default function BtnContainer() {
  const translationWords = useSelector((state) => state.translationWords);

  return (
    <>
      <BlueBtn
        width="10vw"
        height="17vh"
        top="70vh"
        left="55vw"
        radius="2vw"
        text={translationWords.nude}
      />
      <BlueBtn
        width="10vw"
        height="17vh"
        top="70vh"
        left="66vw"
        radius="2vw"
        text={translationWords.apply}
      />
    </>
  );
}
